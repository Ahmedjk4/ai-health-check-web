// Screens text for health-misinformation warning signs and known myths.
// It never says a claim is TRUE. "none" only means nothing in the rule list matched.
import * as D from './data.js';
import { sources } from './resources.js';

const re = (src, flags = 'is') => new RegExp(src, flags);
const reG = (r) => new RegExp(r.source, r.flags.includes('g') ? r.flags : r.flags + 'g');

const P = Object.fromEntries(Object.entries(D.PATTERNS).map(([k, v]) => [k, re(v)]));
const CORRECTION = re(D.CORRECTION_CUES);
const SIGNALS = D.SIGNALS.map((s) => ({ ...s, rx: reG(re(s.pattern)) }));
const MYTHS = D.MYTHS.map((m) => ({ ...m, groups: m.all_of.map((g) => re(g)) }));
const HARM_A = reG(P.HARM_A);
const HARM_B = reG(P.HARM_B);
const SENT_SPLIT = /(?<=[.!?])\s+|\n+/;
const NEG_NOISE = /\b(?:don'?t|do not|doesn'?t|won'?t)\s+(?:want|let|tell|show)\b/gis;

export const LEVELS = ['none', 'watch', 'warning', 'danger'];
const levelOf = (score) => (score < 15 ? 'none' : score < 35 ? 'watch' : score < 60 ? 'warning' : 'danger');
const atLeast = (l, floor) => (LEVELS.indexOf(l) >= LEVELS.indexOf(floor) ? l : floor);

function sentenceAt(text, index) {
  let a = index;
  while (a > 0 && !/[.!?\n]/.test(text[a - 1])) a--;
  let b = index;
  while (b < text.length && !/[.!?\n]/.test(text[b])) b++;
  return text.slice(a, Math.min(text.length, b + 1));
}
// Hedged or correcting sentences ("may help", "no evidence that...") are not strong claims.
const isHedged = (sentence) => P.HEDGE.test(sentence) || CORRECTION.test(sentence.replace(NEG_NOISE, ''));

function findHarmfulAdvice(text) {
  const out = [];
  for (const m of text.matchAll(HARM_A)) {
    if (P.NEGATOR_BEFORE.test(text.slice(Math.max(0, m.index - 14), m.index))) continue; // "never skip your vaccines"
    out.push(m[0].trim());
  }
  for (const m of text.matchAll(HARM_B)) out.push(m[0].trim());
  return out.slice(0, 3);
}

function asserts(myth, text) {
  const sentences = text.split(SENT_SPLIT).filter((x) => x.trim());
  const same = sentences.filter((x) => myth.groups.every((g) => g.test(x)));
  return (same.length ? same : [text]).some((x) => !CORRECTION.test(x.replace(NEG_NOISE, '')));
}

function matchMyths(text) {
  return MYTHS.filter((m) => m.groups.every((g) => g.test(text))).map((m) => ({
    claim: m.claim, severity: m.severity, verdict: m.verdict, fact: m.fact,
    asserted: asserts(m, text), sources: m.sources.map((id) => sources[id]).filter(Boolean),
  }));
}

const MYTH_SCORE = { critical: 50, high: 35, medium: 25, low: 15 };

export function analyze(input) {
  const text = (input || '').trim();
  if (!text) return null;

  const reasons = [];
  let score = 0;
  let forceWarning = false;
  for (const s of SIGNALS) {
    let hits = [...text.matchAll(s.rx)];
    if (s.hedgeable) hits = hits.filter((m) => !isHedged(sentenceAt(text, m.index)));
    hits = hits.slice(0, s.maxHits);
    if (!hits.length) continue;
    score += s.weight * hits.length;
    reasons.push({ id: s.id, label: s.label, why: s.why, matched: hits[0][0].slice(0, 90) });
    if (s.id === 'replaces_care' || s.id === 'harassment') forceWarning = true;
  }

  const caps = text.match(/\b[A-Z]{4,}\b/g) || [];
  const bangs = (text.match(/!/g) || []).length;
  if (bangs >= 3 || caps.length >= 3) {
    score += 8;
    reasons.push({ id: 'shouting', label: 'Shouting', why: 'Capital letters and exclamation marks are used to provoke a reaction.', matched: '' });
  }

  const harmful = findHarmfulAdvice(text);
  if (harmful.length) {
    score += 45; forceWarning = true;
    reasons.push({ id: 'harmful_advice', label: 'Tells people to stop or avoid care', matched: harmful[0].slice(0, 90),
      why: 'Skipping vaccines, screening, medicine or doctors because of an online claim can cause serious harm.' });
  }

  const myths = matchMyths(text);
  const asserted = myths.filter((m) => m.asserted);
  for (const m of asserted) score += MYTH_SCORE[m.severity];

  if (P.CRED_DOMAINS.test(text)) score = Math.max(0, score - 10);
  const healthRelated = P.HEALTH_TERMS.test(text);
  if (!healthRelated) score = Math.floor(score * 0.5);
  score = Math.min(score, 100);

  let level = levelOf(score);
  if (forceWarning || asserted.length) level = atLeast(level, 'warning');
  if (asserted.some((m) => m.severity === 'critical')) level = 'danger';

  const advice = [];
  if (harmful.length || reasons.some((r) => r.id === 'replaces_care')) advice.push('Do not stop or skip treatment because of this. Ask a doctor or pharmacist first.');
  if (asserted.length) advice.push('Do not pass it on. The sources listed here explain what is actually known.');
  else if (level !== 'none') advice.push('Find the original source and who wrote it before you trust or share this.');

  return { level, score, reasons, myths, advice, healthRelated };
}
