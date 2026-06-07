/**
 * Korean portfolio copy lint — banned calques, line-break hygiene, es-hangul josa.
 * Run: node scripts/lint-korean-copy.mjs
 */
import { readFileSync } from "node:fs";
import { josa } from "es-hangul";
import { STRINGS } from "../js/i18n.js";

const ko = STRINGS.ko;
const failures = [];

const BANNED = [
  {
    pattern: /복도가 기억/,
    reason: "corridor-remember calque",
  },
  { pattern: /지난번 걸음/, reason: "unnatural return copy" },
  { pattern: /보여 드리기 어렵/, reason: "pitch-deck phrasing — lead with what the site is" },
  { pattern: /둘러보시면/, reason: "stacked honorific — use 열면 / 확인할 수 있고" },
  { pattern: /보시던 곳부터/, reason: "unnatural return copy — use 이전 방문 기록" },
  { pattern: /이어 가 주세요/, reason: "awkward 이어가다 imperative" },
  {
    pattern: /을\(를\)/,
    reason: "parenthetical josa — restructure sentence or use es-hangul josa()",
  },
  {
    pattern: /이\(가\)/,
    reason: "parenthetical josa — restructure sentence or use es-hangul josa()",
  },
  { pattern: /정직하게 일하는/, reason: "GPU honest-work calque" },
  { pattern: /가져간 역량/, reason: "awkward idiom — prefer 배워간 기술" },
];

/** Particles that should stay inside **…** to avoid mobile line breaks. */
const ORPHAN_JOSA_PATTERNS = [
  { re: /\*\*[^*]+\*\*\s*([를을이가])(?=\s)/g, label: "$1" },
  { re: /\*\*[^*]+\*\*\s*만(?=\s)/g, label: "만" },
  { re: /\*\*([^*]*[가-힣][^*]*)\*\*로(?=\s)/g, label: "로" },
];

function walk(obj, path = "") {
  if (typeof obj === "string") {
    for (const { pattern, reason } of BANNED) {
      if (pattern.test(obj)) failures.push({ path, reason, sample: obj.slice(0, 80) });
    }
    for (const { re, label } of ORPHAN_JOSA_PATTERNS) {
      for (const m of obj.matchAll(re)) {
        const particle = label.startsWith("$") ? m[1] : label;
        failures.push({
          path,
          reason: `orphan particle "${particle}" after ** — move inside highlight`,
          sample: obj.slice(Math.max(0, m.index - 12), m.index + m[0].length + 12),
        });
      }
    }
    return;
  }
  if (Array.isArray(obj)) {
    obj.forEach((v, i) => walk(v, `${path}[${i}]`));
    return;
  }
  if (obj && typeof obj === "object") {
    for (const [k, v] of Object.entries(obj)) walk(v, path ? `${path}.${k}` : k);
  }
}

walk(ko);

const css = readFileSync(new URL("../css/style.css", import.meta.url), "utf8");
if (!/:lang\(ko\)[\s\S]*word-break:\s*keep-all/.test(css)) {
  failures.push({
    path: "css/style.css",
    reason: "missing :lang(ko) { word-break: keep-all }",
    sample: "",
  });
}
if (!/\.key-concept[\s\S]*word-break:\s*keep-all/.test(css)) {
  failures.push({
    path: "css/style.css",
    reason: "missing .key-concept { word-break: keep-all }",
    sample: "",
  });
}

// es-hangul: questLocked should not need inline particle hacks when title is interpolated
const sampleTitle = "Gesto";
const questSample = ko.nav.questLocked.replace("{order}", "01").replace("{title}", sampleTitle);
if (/을\(를\)|이\(가\)/.test(questSample)) {
  failures.push({
    path: "nav.questLocked",
    reason: "interpolated questLocked still has parenthetical josa",
    sample: questSample,
  });
}

// Demonstrate correct josa for dynamic station titles (documentation for future templates)
const josaCheck = josa(sampleTitle, "을/를");
if (!josaCheck.endsWith("를") && !josaCheck.endsWith("을")) {
  failures.push({
    path: "es-hangul",
    reason: `unexpected josa for ${sampleTitle}`,
    sample: josaCheck,
  });
}

if (failures.length) {
  console.error("KO copy lint FAILED:");
  for (const f of failures) console.error(`  ${f.path}: ${f.reason}\n    ${f.sample}`);
  process.exit(1);
}

console.log("OK Korean copy lint:", {
  returnWelcome: ko.intro.returnWelcome,
  questLockedTemplate: ko.nav.questLocked,
  josaExample: `${sampleTitle}${josa(sampleTitle, "을/를").slice(sampleTitle.length)} 완료`,
});
