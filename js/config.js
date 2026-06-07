/**
 * Locale-agnostic site and project configuration.
 * @module config
 */

/** @typedef {"dl"|"iot"|"ros"|"pai"} ProjectKey */
/** @typedef {"en"|"ko"} Locale */

/**
 * @typedef {Object} ProjectDef
 * @property {ProjectKey} key
 * @property {string} phase HUD phase label (e.g. DL)
 * @property {number} color Three.js hex color
 * @property {string} repo GitHub repository slug
 * @property {string} stationLabel 3D station banner label
 */

/** @type {Readonly<typeof SITE>} */
export const SITE = Object.freeze({
  name: Object.freeze({ en: "Joey Lee", ko: "이정우" }),
  github: Object.freeze({
    username: "joey114132",
    portfolioRepo: "physical-ai-portfolio",
    org: "addinedu-physicalai-1st",
  }),
  contact: Object.freeze({
    display: "+82-10-9989-8403",
    tel: "+8210999898403",
  }),
  links: Object.freeze({
    artPortfolio: "https://joeyjeongwooleeportfolio.netlify.app/",
    live: "https://joeyleeportfolio.netlify.app/",
    shopPinkkiDeck: "https://shoppinkki-presentation.netlify.app/",
    pingdergartenDeck:
      "https://github.com/addinedu-physicalai-1st/physical-ai-repo-2/tree/dev/presentation/final-v3",
  }),
  cohort: "Physical AI · 2025–2026",
  defaultProject: /** @type {ProjectKey} */ ("dl"),
  metaDescription:
    "Walk a 3D lab maze — four Physical AI projects I actually built. Not a PDF resume.",
  storage: Object.freeze({
    lang: "portfolio-lang",
    langManual: "portfolio-lang-manual",
    visits: "portfolio-lab-visits",
  }),
});

/** Keep in sync with `@media` rules in `css/style.css`. */
export const BREAKPOINTS = Object.freeze({
  touch: 768,
  mazeMenu: 719,
  compactHeight: 640,
});

/** @type {readonly ProjectDef[]} */
export const PROJECTS = Object.freeze(
  /** @type {ProjectDef[]} */ ([
    { key: "dl", phase: "DL", color: 0x7c5cff, repo: "deeplearning-repo-4", stationLabel: "GESTO" },
    { key: "iot", phase: "IOT", color: 0x00e5a0, repo: "iot-repo-2", stationLabel: "PARKING" },
    { key: "ros", phase: "ROS", color: 0xff6b4a, repo: "ros-repo-2", stationLabel: "SHOPPINKKI" },
    {
      key: "pai",
      phase: "PAI",
      color: 0xffd166,
      repo: "physical-ai-repo-2",
      stationLabel: "PINGDERGARTEN",
    },
  ]),
);

/**
 * @param {string} repo
 * @param {string} [org]
 * @returns {string}
 */
export function githubRepoUrl(repo, org = SITE.github.org) {
  return `https://github.com/${org}/${repo}`;
}

/**
 * @param {string} [username]
 * @returns {string}
 */
export function githubProfileUrl(username = SITE.github.username) {
  return `https://github.com/${username}`;
}

/**
 * @param {string} key
 * @returns {string}
 */
export function getRepoSlug(key) {
  return PROJECTS.find((p) => p.key === key)?.repo ?? "";
}

/** @type {readonly ProjectKey[]} */
export const PROJECT_KEYS = Object.freeze(PROJECTS.map((p) => p.key));

export const PROJECT_COUNT = PROJECT_KEYS.length;

/** @type {Readonly<Record<ProjectKey, number>>} */
export const PROJECT_COLORS = Object.freeze(
  Object.fromEntries(PROJECTS.map((p) => [p.key, p.color])),
);

/** @type {Readonly<Record<ProjectKey, string>>} */
export const PHASE_SHORT = Object.freeze(Object.fromEntries(PROJECTS.map((p) => [p.key, p.phase])));

/** @type {Readonly<Record<ProjectKey, string>>} */
export const REPO_URLS = Object.freeze(
  Object.fromEntries(PROJECTS.map((p) => [p.key, githubRepoUrl(p.repo)])),
);

/** @type {Readonly<Record<ProjectKey, string>>} */
export const STATION_LABELS = Object.freeze(
  Object.fromEntries(
    PROJECTS.map((p, i) => [
      p.key,
      `STATION ${String(i + 1).padStart(2, "0")} · ${p.stationLabel}`,
    ]),
  ),
);

/** @type {Readonly<Record<string, ProjectKey>>} */
export const GATE_CHAR = Object.freeze(
  Object.fromEntries(PROJECT_KEYS.map((key, i) => [String(i + 1), key])),
);

/**
 * @param {Locale} lang
 * @param {"primary"|"alias"} [style]
 * @returns {string}
 */
export function displayName(lang, style = "primary") {
  if (style === "alias") return lang === "ko" ? SITE.name.en : SITE.name.ko;
  return lang === "ko" ? SITE.name.ko : SITE.name.en;
}

/** @returns {string} */
export function fullName() {
  return `${SITE.name.ko} · ${SITE.name.en}`;
}

/**
 * @param {Record<string, string|number>} [extra]
 * @returns {Record<string, string|number>}
 */
export function siteCopyVars(extra = {}) {
  const last = PROJECT_COUNT;
  return {
    github: SITE.github.username,
    projectCount: last,
    projectLast: last,
    stationFirst: "01",
    stationLast: String(last).padStart(2, "0"),
    nameKo: SITE.name.ko,
    nameEn: SITE.name.en,
    ...extra,
  };
}

/**
 * @param {number} px
 * @returns {MediaQueryList}
 */
export function matchMediaMax(px) {
  return window.matchMedia(`(max-width: ${px}px)`);
}

/** @returns {boolean} */
export function isTouchViewport() {
  return matchMediaMax(BREAKPOINTS.touch).matches || window.innerWidth < BREAKPOINTS.touch;
}
