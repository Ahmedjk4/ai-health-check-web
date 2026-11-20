import test from 'node:test';
import assert from 'node:assert/strict';
import { analyze, LEVELS } from '../public/lib/analyzer.js';

const rank = (t) => LEVELS.indexOf(analyze(t).level);

// Realistic claims that an earlier version let through as "low risk".
const SHOULD_FLAG = [
  ['Vaccines are poison and they cause infertility in young women.', 'warning'],
  ['My friend took the covid vaccine and it rewrote her DNA, now she is sick all the time.', 'warning'],
  ['Turmeric cures type 2 diabetes, there is no need for metformin or any other drug.', 'danger'],
  ["You don't need to vaccinate your kids, measles is not dangerous and natural immunity is better.", 'danger'],
  ['Detox teas flush toxins from your liver and cure fatty liver disease in two weeks.', 'warning'],
  ['Chemotherapy kills more patients than cancer does, hospitals just want your money.', 'danger'],
  ['Sunscreen is full of toxic chemicals and causes skin cancer, never use it.', 'warning'],
  ['Drinking lemon water every morning prevents cancer and boosts your immune system.', 'warning'],
  ['Garlic and ginger kill the virus, you don\'t need any medicine.', 'danger'],
  ["Drinking bleach cures covid, doctors don't want you to know!!!", 'danger'],
  ['Hospitals are inflating COVID deaths to get funding. Do your own research.', 'watch'],
];
for (const [text, min] of SHOULD_FLAG) {
  test(`flags (${min}+): ${text.slice(0, 50)}`, () => assert.ok(rank(text) >= LEVELS.indexOf(min), `got ${analyze(text).level}`));
}

// Careful, hedged or ordinary text must stay clean (no false alarms).
const SHOULD_PASS = [
  'The WHO says handwashing reduces the spread of respiratory infections.',
  'Garlic may help lower blood pressure slightly, according to some small studies, but it is not a replacement for medication.',
  'There is no evidence that vaccines cause autism, according to large studies reviewed by WHO.',
  'Chemotherapy has side effects such as nausea and hair loss, so doctors weigh the benefits and risks for each patient.',
  'The weather in Cairo is lovely today and the football match starts at eight in the evening.',
  'Ask your pharmacist before combining herbal supplements with prescription medicine.',
  'Measles vaccination coverage fell in several countries last year, and cases are rising.',
  'Sunscreen with SPF 30 or higher helps protect against skin cancer when applied properly.',
  'Never skip your vaccines, and do not stop taking prescribed medicine without asking your doctor.',
];
for (const text of SHOULD_PASS) {
  test(`stays clean: ${text.slice(0, 50)}`, () => assert.equal(analyze(text).level, 'none', JSON.stringify(analyze(text).reasons.map((r) => r.id))));
}

test('myth being corrected is not counted as asserted', () => {
  const r = analyze('It is a myth that vaccines cause autism; there is no evidence.');
  assert.ok(!r.myths.some((m) => m.asserted));
});

test('"doctors don\'t want you to know" does not hide an asserted myth', () => {
  const r = analyze("Vaccines cause autism and the doctors don't want you to know it.");
  assert.ok(r.myths.some((m) => m.asserted));
  assert.ok(rank("Vaccines cause autism and the doctors don't want you to know it.") >= 2);
});

test('dangerous myth results include a fact and a source link', () => {
  const m = analyze('Herbal tea cures diabetes so stop taking insulin.').myths.find((x) => x.asserted);
  assert.ok(m.fact && m.sources.length && m.sources[0].url.startsWith('https://'));
});

test('empty text returns null, not a crash', () => assert.equal(analyze('   '), null));

test('"none" never claims the text is true', () => {
  const r = analyze('The weather is lovely today and the match starts at eight.');
  assert.equal(r.level, 'none');
  assert.deepEqual(r.advice, []);
});
