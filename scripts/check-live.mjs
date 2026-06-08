/**
 * Quick live-site smoke: compare Netlify assets to expected markers.
 * Run: node scripts/check-live.mjs
 */
const LIVE = process.env.PORTFOLIO_LIVE_URL ?? "https://joeyleeportfolio.netlify.app";
const markers = [
  { path: "/js/i18n.js", includes: ["GitHub·팀 덱 링크", "탐색 위치와 스테이션"] },
  { path: "/js/app.js", includes: ["hasRestorableProgress", "saveMazeProgress"] },
  { path: "/css/style.css", includes: [".hidden {", "journey-timeline__role"] },
];

let failed = 0;

for (const { path, includes } of markers) {
  const url = `${LIVE.replace(/\/$/, "")}${path}`;
  let text = "";
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(15000) });
    if (!res.ok) {
      console.error(`FAIL ${path}: HTTP ${res.status}`);
      failed++;
      continue;
    }
    text = await res.text();
  } catch (err) {
    console.error(`FAIL ${path}: ${err.message}`);
    failed++;
    continue;
  }
  for (const needle of includes) {
    if (!text.includes(needle)) {
      console.error(`FAIL ${path}: missing "${needle}"`);
      failed++;
    }
  }
  if (includes.every((n) => text.includes(n))) {
    console.log(`OK ${path}`);
  }
}

if (failed) process.exit(1);
console.log("OK live smoke:", LIVE);
