/**
 * Responsive layout lint — quest banner centering rules present in CSS.
 * Run: node scripts/lint-responsive-layout.mjs
 */
import { readFileSync } from "node:fs";

const css = readFileSync(new URL("../css/style.css", import.meta.url), "utf8");
const failures = [];

const REQUIRED = [
  {
    pattern:
      /@media \(min-width: 720px\)[\s\S]*body\.maze-mode \.quest-banner[\s\S]*margin-inline:\s*auto/,
    reason: "desktop maze quest-banner must use margin-inline: auto",
  },
  {
    pattern:
      /@media \(min-width: 720px\)[\s\S]*body\.maze-mode \.top-bar__row[\s\S]*grid-template-columns:\s*1fr auto 1fr/,
    reason: "desktop top-bar row needs 1fr auto 1fr for centered status",
  },
  {
    pattern: /body\.maze-mode \.quest-banner[\s\S]*text-align:\s*center/,
    reason: "quest-banner text-align: center",
  },
];

for (const { pattern, reason } of REQUIRED) {
  if (!pattern.test(css)) failures.push({ reason });
}

if (failures.length) {
  console.error("Layout lint FAILED:");
  for (const f of failures) console.error(`  - ${f.reason}`);
  process.exit(1);
}

console.log("OK responsive layout lint: quest-banner center rules present");
