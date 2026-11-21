const base = process.argv.slice(2).find(arg => /^https?:\/\//.test(arg)) || `http://127.0.0.1:${process.env.PORT || 3000}`;
const healthResponse = await fetch(new URL('/health', base));
if (!healthResponse.ok) throw new Error(`Health check failed: ${healthResponse.status}`);
const health = await healthResponse.json();
if (health.status !== 'ok') throw new Error('Unexpected health response.');
console.log(`Health: ok. Chat configured: ${health.chatAvailable}.`);

if (process.argv.includes('--chat')) {
  const response = await fetch(new URL('/api/chat', base), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Origin: new URL(base).origin },
    body: JSON.stringify({
      messages: [{ role: 'user', content: 'How should I verify a health claim written by an AI? Give practical verification steps.' }],
      acceptsHackClubRules: true,
    }),
    signal: AbortSignal.timeout(60000),
  });
  const review = await response.json();
  if (!response.ok) throw new Error(`Chat failed (${response.status}): ${review.error || 'Unknown error'}`);
  if (!review.assessment || !review.summary || !Array.isArray(review.sources)) throw new Error('Incomplete chat review.');
  console.log(`Chat: ok. Assessment: ${review.assessment}. Suggested references: ${review.sources.length}.`);
}
