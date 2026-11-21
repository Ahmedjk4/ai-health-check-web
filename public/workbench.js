import { analyze } from './lib/analyzer.js';
import { sources, checklist, levelLabels } from './lib/resources.js';

const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];
const make = (tag, className, content) => {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (content !== undefined) node.textContent = content;
  return node;
};
const icon = (name) => {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.classList.add('icon');
  svg.setAttribute('aria-hidden', 'true');
  const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
  use.setAttribute('href', `#i-${name}`);
  svg.append(use);
  return svg;
};
const examples = {
  remedy: 'Turmeric cures type 2 diabetes, there is no need for metformin or any other drug.',
  ai: 'An AI told me that antibiotics can cure viral infections like the flu. Is that reliable?',
  careful: 'There is no evidence that vaccines cause autism, according to large studies reviewed by WHO.',
};
const names = { check: 'Check a claim', chat: 'AI assistant', sources: 'Trusted sources', guide: 'Verification guide' };
let chatAvailable = false;
let history = [];
let busy = false;
let pendingInstall;
let toastTimer;
let checkedText = '';

function toast(message) {
  $('#toast').textContent = message;
  $('#toast').hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { $('#toast').hidden = true; }, 4500);
}
function route() {
  const view = Object.hasOwn(names, location.hash.slice(1)) ? location.hash.slice(1) : 'check';
  $$('.view').forEach(n => { n.hidden = n.id !== `view-${view}`; });
  $$('[data-view]').forEach(n => {
    n.classList.toggle('active', n.dataset.view === view);
    if (n.dataset.view === view) n.setAttribute('aria-current', 'page');
    else n.removeAttribute('aria-current');
  });
  $('#page-name').textContent = names[view];
  document.title = `${names[view]} · Health Check`;
}
function go(view) {
  location.hash = view;
  route();
  window.scrollTo({ top: 0, behavior: 'instant' });
  $('#main').focus({ preventScroll: true });
}
$$('[data-view]').forEach(n => n.addEventListener('click', () => go(n.dataset.view)));
$$('[data-go]').forEach(n => n.addEventListener('click', () => go(n.dataset.go)));
window.addEventListener('hashchange', route);
$('.skip-link').addEventListener('click', e => { e.preventDefault(); $('#main').focus(); });
route();

function sourceLinks(items) {
  const links = make('div', 'source-chips');
  const seen = new Set();
  for (const source of items) {
    if (!source?.url?.startsWith('https://') || seen.has(source.url)) continue;
    seen.add(source.url);
    const link = make('a', '', source.name);
    link.append(icon('external'));
    link.href = source.url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    links.append(link);
  }
  return links;
}
function displayCheck(text) {
  const result = analyze(text);
  if (!result) return;
  const box = $('#check-results');
  box.replaceChildren();
  box.dataset.level = result.level;
  const heading = make('div', 'result-title');
  heading.append(make('h2', '', 'Report'), make('span', 'risk-badge', levelLabels[result.level]));
  box.append(heading, make('p', 'result-intro', result.healthRelated
    ? 'This check screens English text for warning signs. A clear result does not establish accuracy. Quotes, questions, and corrections can also trigger a match.'
    : 'This text may fall outside the English health topics covered by this checker. Results cannot establish whether it is accurate.'));
  for (const myth of result.myths) {
    const item = make('article', 'result-item');
    item.append(make('h3', '', myth.asserted ? 'Related known myth · check the context' : 'Related myth · appears to be corrected in your text'), make('blockquote', '', myth.claim));
    item.append(make('p', '', `${myth.verdict} ${myth.fact}`), sourceLinks(myth.sources));
    box.append(item);
  }
  for (const reason of result.reasons) {
    const item = make('article', 'result-item');
    item.append(make('h3', '', reason.label), make('p', '', reason.why));
    if (reason.matched) item.append(make('blockquote', '', reason.matched));
    box.append(item);
  }
  const next = make('div', 'result-item');
  next.append(make('h3', '', 'Before you act or share'));
  const list = make('ul');
  const advice = [...result.advice, 'Open the original source, check the date, and compare the evidence. Ask a qualified clinician before changing your care.'];
  advice.forEach(s => list.append(make('li', '', s)));
  next.append(list);
  if (!result.myths.length) next.append(sourceLinks([sources.who, sources.medlineplus, sources.cochrane]));
  box.append(next);
  const actions = make('div', 'result-actions');
  actions.append(make('p', '', 'Your text was checked on this device. It was not sent to the AI.'));
  const follow = make('button', 'primary-button', 'Discuss with the assistant');
  follow.append(icon('arrow'));
  follow.type = 'button';
  follow.addEventListener('click', () => {
    $('#chat-input').value = `Help me check this health claim:\n\n${text.slice(0, 5900)}`;
    go('chat');
    $('#chat-input').focus();
  });
  actions.append(follow);
  box.append(actions);
  checkedText = text.trim();
  $('#check-empty').hidden = true;
  box.hidden = false;
  box.focus({ preventScroll: true });
  if (matchMedia('(max-width: 720px)').matches) box.scrollIntoView({ behavior: 'instant', block: 'start' });
}
$('#check-form').addEventListener('submit', e => {
  e.preventDefault();
  if (!$('#claim-input').value.trim()) { $('#claim-input').focus(); return; }
  displayCheck($('#claim-input').value);
});
function updateCount() { $('#char-count').textContent = `${$('#claim-input').value.length.toLocaleString('en')} / 12,000 characters`; }
function resetReport(label = 'Nothing checked yet') {
  $('#check-results').hidden = true;
  $('#check-empty').hidden = false;
  $('#report-state').textContent = label;
}
$('#claim-input').addEventListener('input', () => {
  updateCount();
  if (checkedText && $('#claim-input').value.trim() !== checkedText) resetReport('Text changed. Check again.');
});
$('#claim-input').addEventListener('keydown', e => {
  if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) { e.preventDefault(); $('#check-form').requestSubmit(); }
});
$('#clear-input').addEventListener('click', () => {
  $('#claim-input').value = '';
  checkedText = '';
  resetReport();
  updateCount();
  $('#claim-input').focus();
});
$$('[data-example]').forEach(n => n.addEventListener('click', () => {
  $('#claim-input').value = examples[n.dataset.example];
  updateCount();
  $('#claim-input').focus();
  checkedText = '';
  resetReport('Ready to check');
}));

function showSources() {
  const search = $('#source-search').value.toLowerCase().trim();
  const items = Object.entries(sources).filter(([id, s]) => `${id} ${s.name} ${s.url}`.toLowerCase().includes(search));
  const grid = $('#source-list');
  grid.replaceChildren();
  for (const [, source] of items) {
    const card = make('a', 'source-card');
    card.href = source.url;
    card.target = '_blank';
    card.rel = 'noopener noreferrer';
    const title = make('h2', '', source.name);
    card.append(title, make('p', '', new URL(source.url).hostname), icon('external'));
    grid.append(card);
  }
  if (!items.length) grid.append(make('p', 'small-print', 'No matching sources. Try another topic or organization.'));
}
$('#source-search').addEventListener('input', showSources);
showSources();
checklist.forEach(([title, detail], i) => {
  const item = make('article', 'guide-step');
  const body = make('div');
  body.append(make('h3', '', title), make('p', '', detail));
  item.append(make('span', '', String(i + 1).padStart(2, '0')), body);
  $('#guide-list').append(item);
});

function updateAvailability() {
  const online = navigator.onLine;
  $('#network-status').lastChild.textContent = online ? ' Checks run on your device' : ' Offline checks ready';
  $('#chat-availability').textContent = !online
    ? 'You’re offline. The claim checker still works; the AI assistant needs an internet connection.'
    : chatAvailable
      ? 'AI reviews can miss errors. Check important claims against the original sources.'
      : 'AI isn’t connected yet. The app owner needs to configure Hack Club AI. You can use the claim checker now.';
  $('#send-message').disabled = busy || !online || !chatAvailable;
}
async function loadConfig() {
  try {
    const response = await fetch('/api/config', { cache: 'no-store' });
    if (response.ok) chatAvailable = Boolean((await response.json()).chatAvailable);
  } catch { /* Local checks remain available offline. */ }
  updateAvailability();
}
window.addEventListener('online', loadConfig);
window.addEventListener('offline', updateAvailability);
loadConfig();
$('#new-chat').addEventListener('click', () => {
  if (busy) return;
  history = [];
  $('#chat-log').replaceChildren(make('p', 'small-print', 'A fresh start. What would you like to check?'));
  $('#chat-input').value = '';
  $('#chat-input').focus();
});
$('[data-chat-example]').addEventListener('click', () => {
  $('#chat-input').value = 'An AI told me antibiotics cure the flu. What should I check?';
  $('#chat-input').focus();
});
const assessments = { needs_evidence: 'More evidence needed', potentially_misleading: 'May be misleading', potentially_harmful: 'May be harmful', outside_scope: 'Outside health-check scope' };
function renderReview(review) {
  const message = make('article', 'message assistant');
  message.append(make('div', 'message-label', `AI review · ${assessments[review.assessment] || 'Review'}`), make('p', '', review.summary));
  for (const claim of review.claims) message.append(make('h3', '', claim.claim), make('p', '', claim.explanation));
  if (review.nextSteps.length) {
    message.append(make('h3', '', 'What to check next'));
    const ul = make('ul');
    review.nextSteps.forEach(s => ul.append(make('li', '', s)));
    message.append(ul);
  }
  if (review.sources.length) message.append(make('h3', '', 'Suggested references · not checked live'), sourceLinks(review.sources));
  message.append(make('p', 'small-print', review.caveat));
  return message;
}
$('#chat-input').addEventListener('keydown', e => {
  if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) { e.preventDefault(); $('#chat-form').requestSubmit(); }
});
$('#chat-form').addEventListener('submit', async e => {
  e.preventDefault();
  if (busy) return;
  const input = $('#chat-input').value.trim();
  if (!input) return;
  if (!chatAvailable || !navigator.onLine) { toast('Use the local claim checker until AI chat is available.'); return; }
  busy = true;
  updateAvailability();
  $('#chat-input').readOnly = true;
  $('#new-chat').disabled = true;
  const log = $('#chat-log');
  if (log.querySelector('.chat-welcome')) log.replaceChildren();
  log.append(make('div', 'message user', input));
  const pending = make('div', 'message assistant', 'Looking at the claim and its context…');
  log.append(pending);
  log.scrollTop = log.scrollHeight;
  try {
    const messages = [...history.slice(-8), { role: 'user', content: input }];
    // Keep request history within the server's total character budget.
    while (messages.length > 1 && messages.reduce((n, m) => n + m.content.length, 0) > 22000) messages.splice(0, 2);
    const response = await fetch('/api/chat', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages, acceptsHackClubRules: true }), signal: AbortSignal.timeout(60000),
    });
    const review = await response.json();
    if (!response.ok) throw new Error(review.error || 'The review could not be completed. Try again.');
    pending.replaceWith(renderReview(review));
    const context = [review.summary, ...review.claims.map(c => `${c.claim}: ${c.explanation}`), ...review.nextSteps].join('\n').slice(0, 6000);
    history = [...messages, { role: 'assistant', content: context }];
    $('#chat-input').value = '';
  } catch (error) {
    pending.className = 'message error';
    pending.textContent = error.name === 'TimeoutError' ? 'The AI took too long. Your message is still below so you can try again.' : error.message === 'Failed to fetch' ? 'The connection was interrupted. Check your internet and try again.' : error.message;
  } finally {
    busy = false;
    $('#chat-input').readOnly = false;
    $('#new-chat').disabled = false;
    updateAvailability();
    log.scrollTop = log.scrollHeight;
  }
});

window.addEventListener('beforeinstallprompt', event => {
  event.preventDefault();
  pendingInstall = event;
});
window.addEventListener('appinstalled', () => { pendingInstall = undefined; $('#install-button').replaceChildren(icon('shield'), make('span', '', 'App installed')); toast('Health Check is installed.'); });
$('#install-button').addEventListener('click', async () => {
  if (pendingInstall) {
    await pendingInstall.prompt();
    await pendingInstall.userChoice;
    pendingInstall = undefined;
    return;
  }
  const standalone = matchMedia('(display-mode: standalone)').matches || navigator.standalone;
  $('#install-instructions').textContent = standalone
    ? 'You’re already using the installed app. You can open Health Check from your home screen or app launcher.'
    : /iPad|iPhone|iPod/.test(navigator.userAgent)
      ? 'On iPhone or iPad, open this site in Safari. Tap Share, then Add to Home Screen, and confirm Add. If available, enable Open as Web App.'
      : 'In Chrome or Edge, open the browser menu and choose Install app or Add to Home screen. On a computer, look for the install icon in the address bar. If the option is missing, use a supported browser and an HTTPS address.';
  $('#install-dialog').showModal();
});
if ('serviceWorker' in navigator && window.isSecureContext) {
  navigator.serviceWorker.register('/sw.js').catch(() => toast('Offline setup could not finish. Reload while online to try again.'));
}
