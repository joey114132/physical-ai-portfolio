import {
  SITE,
  PROJECTS,
  BREAKPOINTS,
  PROJECT_COUNT,
  displayName,
  fullName,
  githubProfileUrl,
  getRepoSlug,
  getDeckUrl,
  siteCopyVars,
  matchMediaMax,
  isTouchViewport,
} from "./config.js";
import {
  STRINGS,
  PROJECT_KEYS,
  REPO_URLS,
  PHASE_SHORT,
  detectLanguage,
  setLanguage,
  getProject,
  prioritizeMedia,
  interpolateCopy,
  collectBootAssetUrls,
} from "./i18n.js";
import { MazeScene, getMazeLayout, getMazeStartPosition } from "./maze-scene.js";
import { DetailScene } from "./detail-scene.js";
import { AudioEngine } from "./audio.js";
import { detectPerfTier, applyPerfClass } from "./perf.js";

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Wrap `**core concept**` markers from i18n copy in emphasis spans. */
function formatConceptHtml(text) {
  if (!text) return "";
  return escapeHtml(text).replace(/\*\*([^*]+)\*\*/g, '<mark class="key-concept">$1</mark>');
}

let lang = detectLanguage();
let maze = null;
let detail3d = null;
let mode = "intro";
let introDone = false;
let perfTier = "medium";
let labNotesIndex = 0;
let labNotesTimer = null;
let exitFlowActive = false;
const audio = new AudioEngine();
const LAB_NOTES_MS = 7200;

const els = {
  title: document.getElementById("page-title"),
  heroEyebrow: document.getElementById("hero-eyebrow"),
  heroName: document.getElementById("hero-name"),
  heroSub: document.getElementById("hero-sub"),
  heroRole: document.getElementById("hero-role"),
  heroTagline: document.getElementById("hero-tagline"),
  heroLabNotes: document.getElementById("hero-lab-notes"),
  hint: document.getElementById("nav-hint"),
  questBanner: document.getElementById("quest-banner"),
  questProgress: document.getElementById("quest-progress"),
  topStationNum: document.getElementById("top-station-num"),
  topStationPhase: document.getElementById("top-station-phase"),
  topQuestProgress: document.getElementById("top-quest-progress"),
  langBtn: document.getElementById("lang-btn"),
  langLabel: document.querySelector(".lang-btn__label"),
  timeline: document.getElementById("timeline"),
  gameUi: document.getElementById("orbit-ui"),
  detailView: document.getElementById("detail-view"),
  detailBack: document.getElementById("detail-back"),
  detailBackLabel: document.getElementById("detail-back-label"),
  detailWatermark: document.getElementById("detail-watermark"),
  detailVisualCaption: document.getElementById("detail-visual-caption"),
  detailCanvas: document.getElementById("detail-canvas"),
  detailPhase: document.getElementById("detail-phase"),
  detailTitle: document.getElementById("detail-title"),
  detailSubtitle: document.getElementById("detail-subtitle"),
  detailTeam: document.getElementById("detail-team"),
  detailMetaLine: document.getElementById("detail-meta-line"),
  detailHighlights: document.getElementById("detail-highlights"),
  detailSummary: document.getElementById("detail-summary"),
  detailRoleTitle: document.getElementById("detail-role-title"),
  detailRole: document.getElementById("detail-role"),
  detailContribTitle: document.getElementById("detail-contrib-title"),
  detailContributions: document.getElementById("detail-contributions"),
  detailSkillsTitle: document.getElementById("detail-skills-title"),
  detailSkills: document.getElementById("detail-skills"),
  detailTechTitle: document.getElementById("detail-tech-title"),
  detailTechniques: document.getElementById("detail-techniques"),
  detailObstaclesTitle: document.getElementById("detail-obstacles-title"),
  detailObstacles: document.getElementById("detail-obstacles"),
  detailOutcomesTitle: document.getElementById("detail-outcomes-title"),
  detailOutcomes: document.getElementById("detail-outcomes"),
  detailAidsTitle: document.getElementById("detail-aids-title"),
  detailAids: document.getElementById("detail-aids"),
  detailStackTitle: document.getElementById("detail-stack-title"),
  detailTags: document.getElementById("detail-tags"),
  detailGalleryTitle: document.getElementById("detail-gallery-title"),
  detailGallery: document.getElementById("detail-gallery"),
  detailLinksTitle: document.getElementById("detail-links-title"),
  detailDeck: document.getElementById("detail-deck"),
  detailRepo: document.getElementById("detail-repo"),
  detailContent: document.getElementById("detail-content"),
  detailScrollProgress: document.getElementById("detail-scroll-progress"),
  detailScrollHint: document.getElementById("detail-scroll-hint"),
  footerGithub: document.getElementById("footer-github"),
  hudIndex: document.getElementById("hud-index"),
  hudPhase: document.getElementById("hud-phase"),
  hudRail: document.getElementById("hud-rail"),
  cursorGlow: document.getElementById("cursor-glow"),
  introOverlay: document.getElementById("intro-overlay"),
  introEyebrow: document.getElementById("intro-eyebrow"),
  introTitle: document.getElementById("intro-title"),
  introAlias: document.getElementById("intro-alias"),
  introRole: document.getElementById("intro-role"),
  introLead: document.getElementById("intro-lead"),
  introStations: document.getElementById("intro-stations"),
  introReturn: document.getElementById("intro-return"),
  introEdu: document.getElementById("intro-edu"),
  introStart: document.getElementById("intro-start"),
  introSkip: document.getElementById("intro-skip"),
  introControls: document.getElementById("intro-controls"),
  introLangLabel: document.getElementById("intro-lang-label"),
  introLangEn: document.getElementById("intro-lang-en"),
  introLangKo: document.getElementById("intro-lang-ko"),
  journeyOverlay: document.getElementById("journey-overlay"),
  journeyEyebrow: document.getElementById("journey-eyebrow"),
  journeyTitle: document.getElementById("journey-title"),
  journeySubtitle: document.getElementById("journey-subtitle"),
  journeyBootcamp: document.getElementById("journey-bootcamp"),
  journeyManifesto: document.getElementById("journey-manifesto"),
  journeyMilestonesTitle: document.getElementById("journey-milestones-title"),
  journeyMilestones: document.getElementById("journey-milestones"),
  journeyLearnedTitle: document.getElementById("journey-learned-title"),
  journeyLearned: document.getElementById("journey-learned"),
  journeyPresentTitle: document.getElementById("journey-present-title"),
  journeyPresent: document.getElementById("journey-present"),
  journeyFutureTitle: document.getElementById("journey-future-title"),
  journeyFuture: document.getElementById("journey-future"),
  journeyAboutTitle: document.getElementById("journey-about-title"),
  journeyClose: document.getElementById("journey-close"),
  journeyScroll: document.getElementById("journey-scroll"),
  journeyScrollHint: document.getElementById("journey-scroll-hint"),
  journeySourcesSection: document.getElementById("journey-sources-section"),
  journeySourcesTitle: document.getElementById("journey-sources-title"),
  journeySources: document.getElementById("journey-sources"),
  aboutPhoto: document.getElementById("about-photo"),
  aboutTitle: document.getElementById("about-title"),
  aboutRole: document.getElementById("about-role"),
  aboutBio: document.getElementById("about-bio"),
  aboutStrengths: document.getElementById("about-strengths"),
  aboutPhone: document.getElementById("about-phone"),
  aboutDiplomaBlock: document.getElementById("about-diploma-block"),
  aboutDiplomaIntro: document.getElementById("about-diploma-intro"),
  aboutDiplomaLink: document.getElementById("about-diploma-link"),
  aboutArtBlock: document.getElementById("about-art-block"),
  aboutArtIntro: document.getElementById("about-art-intro"),
  aboutArtLink: document.getElementById("about-art-link"),
  aboutThanks: document.getElementById("about-thanks"),
  aboutGalleryTitle: document.getElementById("about-gallery-title"),
  aboutGallery: document.getElementById("about-gallery"),
  minimapCanvas: document.getElementById("minimap-canvas"),
  soundBtn: document.getElementById("sound-btn"),
  soundGlyph: document.getElementById("sound-glyph"),
  lightbox: document.getElementById("lightbox"),
  lightboxStage: document.getElementById("lightbox-stage"),
  lightboxCaption: document.getElementById("lightbox-caption"),
  mobileControls: document.getElementById("mobile-controls"),
  mobileJoystick: document.getElementById("mobile-joystick"),
  mobileJoystickThumb: document.getElementById("mobile-joystick-thumb"),
  mobileJoystickLabel: document.getElementById("mobile-joystick-label"),
  mobileInteract: document.getElementById("mobile-interact"),
  mobileInteractLabel: document.getElementById("mobile-interact-label"),
  cutscene: document.getElementById("cutscene"),
  cutscenePhase: document.getElementById("cutscene-phase"),
  cutsceneTitle: document.getElementById("cutscene-title"),
  uiMenuBtn: document.getElementById("ui-menu-btn"),
  uiDrawer: document.getElementById("ui-drawer"),
  uiDrawerPanel: document.getElementById("ui-drawer-panel"),
  uiDrawerBackdrop: document.getElementById("ui-drawer-backdrop"),
  uiDrawerClose: document.getElementById("ui-drawer-close"),
  uiDrawerTitle: document.getElementById("ui-drawer-title"),
  uiDrawerMeta: document.getElementById("ui-drawer-meta"),
  brandText: document.getElementById("brand-text"),
  brandLabelFull: document.getElementById("brand-label-full"),
  brandLabelShort: document.getElementById("brand-label-short"),
  brandLabelMicro: document.getElementById("brand-label-micro"),
  bootLoader: document.getElementById("boot-loader"),
  bootLoaderBar: document.getElementById("boot-loader-bar"),
  bootLoaderStatus: document.getElementById("boot-loader-status"),
  topBar: document.querySelector(".top-bar"),
  topBarRow: document.querySelector(".top-bar__row"),
  topBarTools: document.querySelector(".top-bar__tools"),
  topStatus: document.getElementById("top-status"),
  detail3dToggle: document.getElementById("detail-3d-toggle"),
};

let drawerQuickTools = null;

const MAZE_MENU_MQ = matchMediaMax(BREAKPOINTS.mazeMenu);

function usesMazeMenu() {
  return document.body.classList.contains("maze-mode") && MAZE_MENU_MQ.matches;
}

function syncMobileControlsDrawer() {
  const el = els.mobileControls;
  if (!el) return;
  const suppress = document.body.classList.contains("ui-menu-open") && usesMazeMenu() && !el.hidden;
  el.classList.toggle("mobile-controls--suppressed", suppress);
  if (suppress) {
    el.setAttribute("inert", "");
    el.setAttribute("aria-hidden", "true");
  } else if (!el.hidden) {
    el.removeAttribute("inert");
    el.setAttribute("aria-hidden", "false");
  }
}

function setUiMenuOpen(open) {
  if (!usesMazeMenu() && open) return;
  document.body.classList.toggle("ui-menu-open", open);
  els.uiMenuBtn?.setAttribute("aria-expanded", String(open));
  const nav = STRINGS[lang].nav;
  els.uiMenuBtn?.setAttribute("aria-label", open ? nav.menuClose : nav.menuOpen);
  els.uiDrawer?.setAttribute("aria-hidden", String(!open));
  if (els.uiDrawerBackdrop) els.uiDrawerBackdrop.hidden = !open;
  if (mode === "maze") {
    if (open) maze?.setPaused(true);
    else if (introDone) maze?.setPaused(false);
  }
  if (open) {
    resetMobileJoystick();
    els.uiDrawerClose?.focus({ preventScroll: true });
  } else if (document.activeElement?.closest?.(".ui-drawer__panel")) {
    els.uiMenuBtn?.focus({ preventScroll: true });
  }
  syncMobileControlsDrawer();
}

function syncUiMenuMode() {
  if (!usesMazeMenu()) setUiMenuOpen(false);
}

function ensureDrawerQuickTools() {
  if (drawerQuickTools) return drawerQuickTools;
  drawerQuickTools = document.createElement("div");
  drawerQuickTools.className = "ui-drawer__quick-tools";
  return drawerQuickTools;
}

function layoutMazeChrome() {
  const {
    topBar,
    topBarRow,
    topBarTools,
    topStatus,
    questBanner,
    soundBtn,
    langBtn,
    uiMenuBtn,
    uiDrawerMeta,
  } = els;
  if (!topBar || !topBarRow || !topBarTools || !uiDrawerMeta) return;

  const useDrawer = usesMazeMenu();
  document.body.classList.toggle("maze-menu-chrome", useDrawer);

  if (useDrawer) {
    if (topStatus) uiDrawerMeta.append(topStatus);
    if (questBanner) uiDrawerMeta.append(questBanner);
    if (soundBtn && langBtn) {
      const quick = ensureDrawerQuickTools();
      quick.append(soundBtn, langBtn);
      uiDrawerMeta.append(quick);
    }
  } else {
    if (topStatus) topBarRow.insertBefore(topStatus, topBarTools);
    if (questBanner) topBar.appendChild(questBanner);
    if (soundBtn && langBtn && uiMenuBtn) {
      topBarTools.insertBefore(soundBtn, uiMenuBtn);
      topBarTools.insertBefore(langBtn, uiMenuBtn);
      drawerQuickTools?.remove();
    }
  }

  syncUiMenuMode();
  if (mode === "maze") updateQuestBanner();
  syncBrandLabelTier();
}

let cutsceneTimer = null;
let cutsceneOutTimer = null;
let cutsceneGen = 0;

function clearCutsceneTimers() {
  clearTimeout(cutsceneTimer);
  clearTimeout(cutsceneOutTimer);
  cutsceneTimer = null;
  cutsceneOutTimer = null;
}

/** Tear down cutscene, drawer blur, and detail-only body flags when leaving overlays. */
function resetViewOverlays() {
  cutsceneGen += 1;
  clearCutsceneTimers();
  document.body.classList.remove("cutscene-mode", "detail-hide-3d");
  const cs = els.cutscene;
  if (cs) {
    cs.hidden = true;
    cs.classList.remove("cutscene--in", "cutscene--out");
  }
  setUiMenuOpen(false);
}

const scrollKeys = { up: false, down: false };
let scrollLoopId = null;
const SCROLL_SPEED_PX = 900;
const SCROLL_STEP_PX = 88;

function getScrollContainer() {
  if (mode === "detail" && els.detailContent) return els.detailContent;
  if (mode === "journey" && els.journeyScroll) {
    return els.journeyScroll;
  }
  if (mode === "intro" && els.introOverlay && !els.introOverlay.classList.contains("hidden")) {
    return els.introOverlay.querySelector(".overlay__card");
  }
  return null;
}

function stopScrollLoop() {
  scrollKeys.up = false;
  scrollKeys.down = false;
  if (scrollLoopId != null) {
    cancelAnimationFrame(scrollLoopId);
    scrollLoopId = null;
  }
}

function scrollPanelByPixels(delta) {
  const el = getScrollContainer();
  if (!el || (els.lightbox && !els.lightbox.hidden) || !delta) return;
  const max = el.scrollHeight - el.clientHeight;
  if (max <= 0) return;
  el.scrollBy({ top: delta, left: 0, behavior: "instant" });
  updateDetailScrollUi();
}

function scrollPanelByKeyboard(dt) {
  let delta = 0;
  if (scrollKeys.up) delta -= SCROLL_SPEED_PX * dt;
  if (scrollKeys.down) delta += SCROLL_SPEED_PX * dt;
  scrollPanelByPixels(delta);
}

function startScrollLoop() {
  if (scrollLoopId != null) return;
  let last = performance.now();
  const tick = (now) => {
    if (!scrollKeys.up && !scrollKeys.down) {
      scrollLoopId = null;
      return;
    }
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    scrollPanelByKeyboard(dt);
    scrollLoopId = requestAnimationFrame(tick);
  };
  scrollLoopId = requestAnimationFrame(tick);
}

function handlePanelScrollKey(e, down) {
  if (mode !== "detail" && mode !== "intro" && mode !== "journey") return false;
  if (els.lightbox && !els.lightbox.hidden) return false;
  const k = e.key.toLowerCase();
  let handled = false;
  if (k === "w" || k === "arrowup") {
    scrollKeys.up = down;
    handled = true;
  }
  if (k === "s" || k === "arrowdown") {
    scrollKeys.down = down;
    handled = true;
  }
  if (!handled) return false;
  e.preventDefault();
  e.stopPropagation();
  if (down) {
    const dir = scrollKeys.up && !scrollKeys.down ? -1 : scrollKeys.down && !scrollKeys.up ? 1 : 0;
    if (dir) scrollPanelByPixels(dir * SCROLL_STEP_PX);
    startScrollLoop();
  } else if (!scrollKeys.up && !scrollKeys.down) {
    stopScrollLoop();
  }
  return true;
}

// Cinematic transition when entering a project from the maze, then open it.
function enterProject(key) {
  const gen = ++cutsceneGen;
  maze?.setPaused(true);
  stopScrollLoop();
  clearCutsceneTimers();

  const cs = els.cutscene;
  if (!cs) {
    openDetail(key);
    return;
  }
  syncMobileControls();
  document.body.classList.add("cutscene-mode");
  const p = STRINGS[lang].projects[key];
  setProjectTheme(key);
  els.cutscenePhase.textContent = p.phase;
  els.cutsceneTitle.textContent = p.title;
  cs.hidden = false;
  cs.classList.remove("cutscene--out");
  void cs.offsetWidth; // restart animation
  cs.classList.add("cutscene--in");
  audio.arrive();
  cutsceneTimer = setTimeout(() => {
    if (gen !== cutsceneGen) return;
    syncMobileControls();
    openDetail(key);
    cs.classList.remove("cutscene--in");
    cs.classList.add("cutscene--out");
    cutsceneOutTimer = setTimeout(() => {
      if (gen !== cutsceneGen) return;
      cs.hidden = true;
      cs.classList.remove("cutscene--out");
      document.body.classList.remove("cutscene-mode");
    }, 360);
  }, 820);
}

function enterExit() {
  if (exitFlowActive || mode !== "maze") return;
  exitFlowActive = true;
  clearMazeProgress();
  const gen = ++cutsceneGen;
  maze?.setPaused(true);
  stopScrollLoop();
  clearCutsceneTimers();
  setUiMenuOpen(false);
  syncMobileControls();

  const cs = els.cutscene;
  const ex = STRINGS[lang].exit ?? {};
  const openJourney = () => {
    if (gen !== cutsceneGen) return;
    showJourney();
    if (!cs) return;
    cs.classList.remove("cutscene--in");
    cs.classList.add("cutscene--out");
    cutsceneOutTimer = setTimeout(() => {
      if (gen !== cutsceneGen) return;
      cs.hidden = true;
      cs.setAttribute("aria-hidden", "true");
      cs.classList.remove("cutscene--out");
      document.body.classList.remove("cutscene-mode");
    }, 360);
  };

  if (!cs) {
    openJourney();
    return;
  }

  document.body.classList.add("cutscene-mode");
  els.cutscenePhase.textContent = ex.cutscenePhase ?? STRINGS[lang].journey?.eyebrow ?? "EXIT";
  els.cutsceneTitle.textContent = ex.cutsceneTitle ?? STRINGS[lang].journey?.title ?? "";
  cs.hidden = false;
  cs.setAttribute("aria-hidden", "false");
  cs.classList.remove("cutscene--out");
  void cs.offsetWidth;
  cs.classList.add("cutscene--in");
  audio.arrive();
  cutsceneTimer = setTimeout(openJourney, 820);
}

function updateSoundBtn() {
  if (els.soundBtn) els.soundBtn.setAttribute("aria-pressed", audio.muted ? "true" : "false");
}

function setProjectTheme(key) {
  document.body.dataset.project = key ?? "dl";
}

function syncHud(key) {
  const idx = key ? PROJECT_KEYS.indexOf(key) : -1;
  const num = idx >= 0 ? String(idx + 1).padStart(2, "0") : "—";
  const phase = key ? (PHASE_SHORT[key] ?? key.toUpperCase()) : "RUN";
  if (els.hudIndex) els.hudIndex.textContent = num;
  if (els.hudPhase) els.hudPhase.textContent = phase;
  if (els.topStationNum) els.topStationNum.textContent = num;
  if (els.topStationPhase) els.topStationPhase.textContent = phase;
  if (els.hudRail) {
    const pct = idx <= 0 ? 0 : (idx / (PROJECT_KEYS.length - 1)) * 100;
    els.hudRail.style.setProperty("--rail", `${pct}%`);
  }
  if (els.detailWatermark && idx >= 0) {
    els.detailWatermark.textContent = num;
  }
}

function stationOrder(key) {
  const i = PROJECT_KEYS.indexOf(key);
  return i >= 0 ? String(i + 1).padStart(2, "0") : "—";
}

function setQuestBanner(text) {
  if (!els.questBanner) return;
  els.questBanner.innerHTML = formatConceptHtml(text);
}

function questCopy(key, vars = {}) {
  const s = STRINGS[lang].nav;
  const useShort =
    isTouchViewport() &&
    window.innerWidth < BREAKPOINTS.mazeMenu + 1 &&
    !document.body.classList.contains("maze-menu-chrome");
  const shortKey = `${key}Short`;
  const template = (useShort && s[shortKey]) || s[key] || "";
  return interpolateCopy(template, { ...siteCopyVars(), ...vars });
}

function updateQuestBanner() {
  if (!els.questBanner) return;
  const s = STRINGS[lang];
  if (mode !== "maze") return;

  if (maze?.nearExitProximity && maze.visitCount < PROJECT_COUNT) {
    setQuestBanner(questCopy("questExitLocked"));
    els.questBanner.classList.add("quest-banner--active");
    syncMobileInteractState();
    return;
  }
  if (maze?.nearExit) {
    setQuestBanner(s.nav.questExit);
    els.questBanner.classList.add("quest-banner--active");
    syncMobileInteractState();
    return;
  }

  const key = maze?.nearZone;
  if (!key) {
    const next = maze?.getNextGate?.();
    if (next) {
      const p = STRINGS[lang].projects[next];
      setQuestBanner(questCopy("questNext", { order: stationOrder(next), title: p.title }));
      els.questBanner.classList.add("quest-banner--active");
    } else {
      setQuestBanner(questCopy("questIdle"));
      els.questBanner.classList.remove("quest-banner--active");
    }
    syncMobileInteractState();
    return;
  }

  const p = STRINGS[lang].projects[key];
  const order = stationOrder(key);
  if (maze?.canActivateGate?.(key)) {
    setQuestBanner(s.nav.questNear.replace("{order}", order).replace("{title}", p.title));
  } else {
    const next = maze.getNextGate();
    const np = next ? STRINGS[lang].projects[next] : p;
    setQuestBanner(
      s.nav.questLocked
        .replace("{order}", next ? stationOrder(next) : order)
        .replace("{title}", np.title),
    );
  }
  els.questBanner.classList.add("quest-banner--active");
  syncMobileInteractState();
}

function syncMobileInteractState() {
  if (!els.mobileInteract) return;
  const canInteract =
    mode === "maze" &&
    maze &&
    (maze.nearExit || (maze.nearZone && maze.canActivateGate?.(maze.nearZone)));
  els.mobileInteract.classList.toggle("mobile-btn--interact-ready", Boolean(canInteract));
}

function updateProgress() {
  if (!maze) return;
  const n = maze.visitCount ?? 0;
  const progressKey = isTouchViewport() ? "questProgressShort" : "questProgress";
  const progressText = interpolateCopy(
    STRINGS[lang].nav[progressKey] ?? STRINGS[lang].nav.questProgress,
    { ...siteCopyVars(), n },
  );
  if (els.questProgress) els.questProgress.textContent = progressText;
  if (els.topQuestProgress) els.topQuestProgress.textContent = progressText;
  requestDrawMinimap(true);
}

function drawMinimap() {
  const canvas = els.minimapCanvas;
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const { rows, gates, route, gateOrder } = getMazeLayout();
  const cols = rows[0].length;
  const cellW = canvas.width / cols;
  const cellH = canvas.height / rows.length;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#060a12";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let r = 0; r < rows.length; r++) {
    for (let c = 0; c < rows[r].length; c++) {
      const ch = rows[r][c];
      const x = c * cellW;
      const y = r * cellH;
      if (ch === "#") {
        ctx.fillStyle = "#1e2a3a";
        ctx.fillRect(x, y, cellW - 0.5, cellH - 0.5);
      } else {
        ctx.fillStyle = "#0f1828";
        ctx.fillRect(x, y, cellW - 0.5, cellH - 0.5);
      }
    }
  }

  if (route?.length > 1) {
    ctx.strokeStyle = "rgba(45, 255, 179, 0.45)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    route.forEach(([c, r], i) => {
      const x = c * cellW + cellW / 2;
      const y = r * cellH + cellH / 2;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();
  }

  (gateOrder ?? PROJECT_KEYS).forEach((key, i) => {
    const g = gates[key];
    if (!g) return;
    const x = g.c * cellW + cellW / 2;
    const y = g.r * cellH + cellH / 2;
    const done = maze?.visited?.has(key);
    const next = maze?.getNextGate?.() === key;
    ctx.fillStyle = done ? "#6ee7b7" : next ? "#2dffb3" : "#3a4a5a";
    ctx.beginPath();
    ctx.arc(x, y, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#f6f0e8";
    ctx.font = "bold 7px monospace";
    ctx.textAlign = "center";
    ctx.fillText(String(i + 1), x, y + 2.5);
  });

  const start = route?.[0];
  if (start) {
    const [sc, sr] = start;
    ctx.fillStyle = "#e8a849";
    ctx.beginPath();
    ctx.arc(sc * cellW + cellW / 2, sr * cellH + cellH / 2, 2.5, 0, Math.PI * 2);
    ctx.fill();
  }
  const exit = route?.[route.length - 1];
  if (exit) {
    const [ec, er] = exit;
    ctx.fillStyle = maze?.visitCount >= PROJECT_COUNT ? "#ffd166" : "#554422";
    ctx.fillRect(ec * cellW + 1, er * cellH + 1, cellW - 2, cellH - 2);
  }

  if (maze?.player) {
    const { rows: mazeRows, cell } = getMazeLayout();
    const ox = (-mazeRows[0].length * cell) / 2 + cell / 2;
    const oz = (-mazeRows.length * cell) / 2 + cell / 2;
    const px = maze.player.position.x;
    const pz = maze.player.position.z;
    const c = (px - ox) / cell;
    const r = (pz - oz) / cell;
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.arc(c * cellW + cellW / 2, r * cellH + cellH / 2, 2.5, 0, Math.PI * 2);
    ctx.fill();
  }
}

function syncIntroLangPicker() {
  const active = lang;
  for (const btn of [els.introLangEn, els.introLangKo]) {
    if (!btn) continue;
    const on = btn.dataset.lang === active;
    btn.classList.toggle("intro-lang__btn--active", on);
    btn.setAttribute("aria-pressed", on ? "true" : "false");
  }
}

function setIntroLanguage(next) {
  if (next !== "en" && next !== "ko") return;
  if (lang === next) return;
  lang = next;
  setLanguage(lang, true);
  applyLanguage();
}

const PROGRESS_VERSION = 1;
const PROGRESS_MOVE_EPS = 2.5;
let saveProgressTimer = null;

function getLabVisitCount() {
  try {
    return Number.parseInt(localStorage.getItem(SITE.storage.visits) ?? "0", 10) || 0;
  } catch {
    return 0;
  }
}

function bumpLabVisit() {
  try {
    const n = getLabVisitCount() + 1;
    localStorage.setItem(SITE.storage.visits, String(n));
    return n;
  } catch {
    return 0;
  }
}

function loadMazeProgress() {
  try {
    const raw = localStorage.getItem(SITE.storage.progress);
    if (!raw) return null;
    const data = JSON.parse(raw);
    if (!data || data.v !== PROGRESS_VERSION) return null;
    const visited = Array.isArray(data.visited)
      ? data.visited.filter((key) => PROJECT_KEYS.includes(key))
      : [];
    const px = typeof data.px === "number" ? data.px : null;
    const pz = typeof data.pz === "number" ? data.pz : null;
    const facing = typeof data.facing === "number" ? data.facing : null;
    if (!visited.length && px == null && pz == null) return null;
    return { visited, px, pz, facing };
  } catch {
    return null;
  }
}

function hasMovedFromStart(px, pz) {
  if (px == null || pz == null) return false;
  const start = getMazeStartPosition();
  const dx = px - start.x;
  const dz = pz - start.z;
  return dx * dx + dz * dz > PROGRESS_MOVE_EPS * PROGRESS_MOVE_EPS;
}

function hasRestorableProgress() {
  const saved = loadMazeProgress();
  if (!saved) return false;
  return saved.visited.length > 0 || hasMovedFromStart(saved.px, saved.pz);
}

function saveMazeProgress() {
  if (!introDone || !maze?.player) return;
  try {
    const visited = [...(maze.visited ?? [])].filter((key) => PROJECT_KEYS.includes(key));
    const px = maze.player.position.x;
    const pz = maze.player.position.z;
    if (!visited.length && !hasMovedFromStart(px, pz)) {
      localStorage.removeItem(SITE.storage.progress);
      return;
    }
    localStorage.setItem(
      SITE.storage.progress,
      JSON.stringify({
        v: PROGRESS_VERSION,
        visited,
        px,
        pz,
        facing: maze.facing,
        savedAt: Date.now(),
      }),
    );
  } catch {
    /* ignore quota / private mode */
  }
}

function scheduleSaveMazeProgress() {
  if (saveProgressTimer != null) return;
  saveProgressTimer = window.setTimeout(() => {
    saveProgressTimer = null;
    saveMazeProgress();
  }, 280);
}

function clearMazeProgress() {
  try {
    localStorage.removeItem(SITE.storage.progress);
  } catch {
    /* ignore */
  }
}

function applyShareMeta(s) {
  const title = s.meta?.ogTitle ?? document.title;
  const desc = s.meta?.ogDescription ?? SITE.metaDescription;
  const url = SITE.links.live ?? "";
  const image = url ? `${url.replace(/\/$/, "")}/assets/og-lab.svg` : "/assets/og-lab.svg";
  const set = (id, value) => {
    const el = document.getElementById(id);
    if (el) el.setAttribute("content", value);
  };
  set("meta-og-title", title);
  set("meta-og-desc", desc);
  set("meta-og-url", url);
  set("meta-og-image", image);
  set("meta-tw-title", title);
  set("meta-tw-desc", desc);
  set("meta-tw-image", image);
}

function stopLabNotesRotation() {
  if (labNotesTimer != null) {
    clearInterval(labNotesTimer);
    labNotesTimer = null;
  }
}

function updateLabNoteDisplay() {
  const notes = STRINGS[lang].hero?.labNotes;
  if (!els.heroLabNotes || !notes?.length || mode !== "maze" || !introDone) {
    if (els.heroLabNotes) els.heroLabNotes.textContent = "";
    return;
  }
  labNotesIndex = ((labNotesIndex % notes.length) + notes.length) % notes.length;
  els.heroLabNotes.textContent = notes[labNotesIndex];
  els.heroLabNotes.classList.add("hero__lab-notes--pulse");
  requestAnimationFrame(() => {
    els.heroLabNotes?.classList.remove("hero__lab-notes--pulse");
  });
}

function startLabNotesRotation() {
  stopLabNotesRotation();
  updateLabNoteDisplay();
  const notes = STRINGS[lang].hero?.labNotes;
  if (!notes?.length || mode !== "maze" || !introDone) return;
  labNotesTimer = setInterval(() => {
    labNotesIndex += 1;
    updateLabNoteDisplay();
  }, LAB_NOTES_MS);
}

function renderIntro() {
  const i = STRINGS[lang].intro;
  if (els.introLangLabel) els.introLangLabel.textContent = i.languageLabel ?? "Language";
  syncIntroLangPicker();
  const copy = siteCopyVars();
  els.introEyebrow.textContent = interpolateCopy(i.eyebrow, copy);
  els.introTitle.textContent = displayName(lang);
  els.introAlias.textContent = displayName(lang, "alias");
  els.introRole.textContent = i.role;
  els.introLead.innerHTML = formatConceptHtml(interpolateCopy(i.lead, copy));
  if (els.introStations) {
    const label = i.stationsLabel ?? "";
    const chips = PROJECT_KEYS.map((key, index) => {
      const proj = getProject(lang, key);
      const station = PROJECTS.find((p) => p.key === key);
      const phase = PHASE_SHORT[key] ?? station?.phase ?? key.toUpperCase();
      const codename = station?.stationLabel ?? proj.title;
      return `<li class="intro-station-chip" data-project="${key}" style="--chip-i:${index}">
        <span class="intro-station-chip__index" aria-hidden="true">${String(index + 1).padStart(2, "0")}</span>
        <span class="intro-station-chip__body">
          <span class="intro-station-chip__phase">${escapeHtml(phase)}</span>
          <span class="intro-station-chip__name">${escapeHtml(proj.title)}</span>
          <span class="intro-station-chip__codename">${escapeHtml(codename)}</span>
        </span>
      </li>`;
    }).join("");
    if (label && chips) {
      els.introStations.innerHTML = `<p class="intro-card__stations-label">${escapeHtml(label)}</p><ul class="intro-station-chips">${chips}</ul>`;
      els.introStations.hidden = false;
    } else {
      els.introStations.innerHTML = "";
      els.introStations.hidden = true;
    }
  }
  if (els.introReturn) {
    const showReturn = !introDone && hasRestorableProgress() && i.returnWelcome;
    els.introReturn.innerHTML = showReturn ? formatConceptHtml(i.returnWelcome) : "";
    els.introReturn.classList.toggle("hidden", !showReturn);
    els.introReturn.hidden = !showReturn;
  }
  if (els.introEdu) {
    const edu = (i.edu ?? "").trim();
    els.introEdu.textContent = edu;
    els.introEdu.hidden = !edu;
  }
  if (els.introControls && i.controls) {
    const rows = i.controls
      .map(
        (row) =>
          `<div class="intro-controls__row"><kbd class="intro-controls__keys">${interpolateCopy(row.keys, copy)}</kbd><span class="intro-controls__label">${row.label}</span></div>`,
      )
      .join("");
    const touchNote =
      isTouchViewport() && i.touchNote
        ? `<p class="intro-controls__touch">${formatConceptHtml(i.touchNote)}</p>`
        : "";
    els.introControls.innerHTML = `<p class="intro-controls__title">${i.controlsTitle ?? ""}</p>${rows}${touchNote}`;
  }
  els.introStart.textContent = i.cta;
  els.introSkip.textContent = i.skip;
}

async function renderAbout() {
  const a = STRINGS[lang].about;
  const j = STRINGS[lang].journey;
  if (els.journeyAboutTitle) {
    els.journeyAboutTitle.textContent = j.aboutSectionTitle ?? a.sectionTitle ?? "";
  }
  if (els.aboutPhoto) {
    if (a.profileImage) els.aboutPhoto.src = a.profileImage;
    els.aboutPhoto.alt = fullName();
    els.aboutPhoto.hidden = !a.profileImage;
  }
  els.aboutTitle.textContent = fullName();
  els.aboutRole.textContent = a.role;
  els.aboutBio.innerHTML = formatConceptHtml(a.bio);
  els.aboutStrengths.innerHTML = a.strengths
    .map((s) => `<li>${formatConceptHtml(s)}</li>`)
    .join("");
  const aboutMedia = a.media ? prioritizeMedia(a.media) : [];
  if (aboutMedia.length && els.aboutGallery && els.aboutGalleryTitle) {
    const reachable = await filterReachableMedia(aboutMedia);
    els.aboutGalleryTitle.textContent = a.galleryTitle ?? "";
    els.aboutGalleryTitle.classList.remove("hidden");
    els.aboutGallery.classList.remove("hidden");
    els.aboutGallery.innerHTML = galleryItemsHtml(reachable, false);
    bindGalleryMedia(els.aboutGallery);
  } else if (els.aboutGallery && els.aboutGalleryTitle) {
    els.aboutGalleryTitle.classList.add("hidden");
    els.aboutGallery.classList.add("hidden");
    els.aboutGallery.innerHTML = "";
  }
  els.aboutPhone.textContent = SITE.contact.display;
  els.aboutPhone.href = `tel:${SITE.contact.tel}`;
  els.aboutThanks.textContent = a.finish;
  if (els.aboutDiplomaBlock && els.aboutDiplomaLink) {
    const showDiploma = Boolean(SITE.links.diploma && a.diplomaLinkLabel);
    els.aboutDiplomaBlock.classList.toggle("hidden", !showDiploma);
    if (showDiploma) {
      if (els.aboutDiplomaIntro) {
        if (a.diplomaLinkIntro) {
          els.aboutDiplomaIntro.innerHTML = formatConceptHtml(a.diplomaLinkIntro);
          els.aboutDiplomaIntro.classList.remove("hidden");
        } else {
          els.aboutDiplomaIntro.textContent = "";
          els.aboutDiplomaIntro.classList.add("hidden");
        }
      }
      els.aboutDiplomaLink.textContent = a.diplomaLinkLabel;
      els.aboutDiplomaLink.href = SITE.links.diploma;
    }
  }
  if (els.aboutArtBlock && els.aboutArtLink) {
    const showArt = Boolean(SITE.links.artPortfolio && a.artLinkLabel);
    els.aboutArtBlock.classList.toggle("hidden", !showArt);
    if (showArt) {
      if (els.aboutArtIntro) {
        if (a.artLinkIntro) {
          els.aboutArtIntro.innerHTML = formatConceptHtml(a.artLinkIntro);
          els.aboutArtIntro.classList.remove("hidden");
        } else {
          els.aboutArtIntro.textContent = "";
          els.aboutArtIntro.classList.add("hidden");
        }
      }
      els.aboutArtLink.textContent = a.artLinkLabel;
      els.aboutArtLink.href = SITE.links.artPortfolio;
    }
  }
}

function renderJourney() {
  const j = STRINGS[lang].journey;
  if (!j || !els.journeyMilestones) return;
  els.journeyEyebrow.textContent = j.eyebrow;
  els.journeyTitle.textContent = j.title;
  els.journeySubtitle.textContent = j.subtitle;
  if (els.journeyBootcamp) {
    if (j.bootcamp) {
      els.journeyBootcamp.innerHTML = formatConceptHtml(j.bootcamp);
      els.journeyBootcamp.classList.remove("hidden");
    } else {
      els.journeyBootcamp.textContent = "";
      els.journeyBootcamp.classList.add("hidden");
    }
  }
  if (els.journeyManifesto) {
    if (j.manifesto) {
      els.journeyManifesto.innerHTML = formatConceptHtml(j.manifesto);
      els.journeyManifesto.classList.remove("hidden");
    } else {
      els.journeyManifesto.textContent = "";
      els.journeyManifesto.classList.add("hidden");
    }
  }
  els.journeyMilestonesTitle.textContent = j.milestonesTitle;
  els.journeyLearnedTitle.textContent = j.learnedTitle;
  els.journeyPresentTitle.textContent = j.presentTitle;
  els.journeyFutureTitle.textContent = j.futureTitle;
  els.journeyMilestones.innerHTML = (j.milestones ?? [])
    .map((m) => {
      const p = STRINGS[lang].projects[m.key];
      const title = p?.title ?? m.key;
      const phase = p?.phase ?? m.key;
      const repoUrl = REPO_URLS[m.key];
      const deckUrl = m.deck;
      const links = [];
      if (m.myRole) {
        links.push(
          `<p class="journey-timeline__role"><span class="journey-timeline__learned-label">${j.myRoleLabel}</span> ${formatConceptHtml(m.myRole)}</p>`,
        );
      }
      if (repoUrl || deckUrl) {
        const parts = [];
        if (repoUrl) {
          parts.push(
            `<a class="journey-timeline__link" href="${repoUrl}" target="_blank" rel="noopener noreferrer">GitHub</a>`,
          );
        }
        if (deckUrl) {
          parts.push(
            `<a class="journey-timeline__link" href="${deckUrl}" target="_blank" rel="noopener noreferrer">${j.deckLabel}</a>`,
          );
        }
        links.push(`<p class="journey-timeline__links">${parts.join(" · ")}</p>`);
      }
      return `<li class="journey-timeline__item" data-project="${m.key}">
        <span class="journey-timeline__node" aria-hidden="true"></span>
        <div class="journey-timeline__body">
          <span class="journey-timeline__phase">${phase}</span>
          <h4 class="journey-timeline__name">${title}</h4>
          <time class="journey-timeline__date">${m.date}</time>
          <p class="journey-timeline__summary">${formatConceptHtml(m.summary)}</p>
          ${links.join("")}
          ${
            m.learned
              ? `<p class="journey-timeline__learned"><span class="journey-timeline__learned-label">${j.learnedTitle}</span> ${formatConceptHtml(m.learned)}</p>`
              : ""
          }
        </div>
      </li>`;
    })
    .join("");
  els.journeyLearned.innerHTML = (j.learned ?? [])
    .map((item) => `<li>${formatConceptHtml(item)}</li>`)
    .join("");
  els.journeyPresent.innerHTML = (j.present ?? [])
    .map((item) => `<li>${formatConceptHtml(item)}</li>`)
    .join("");
  els.journeyFuture.innerHTML = (j.future ?? [])
    .map((item) => `<li>${formatConceptHtml(item)}</li>`)
    .join("");
  if (els.journeySourcesSection && els.journeySources) {
    const sources = j.sources ?? [];
    if (sources.length) {
      els.journeySourcesTitle.textContent = j.sourcesTitle ?? "";
      els.journeySources.innerHTML = sources
        .map(
          (s) =>
            `<li><a class="journey-sources__link" href="${s.url}" target="_blank" rel="noopener noreferrer">${formatConceptHtml(s.label)}</a></li>`,
        )
        .join("");
      els.journeySourcesSection.classList.remove("hidden");
    } else {
      els.journeySources.innerHTML = "";
      els.journeySourcesSection.classList.add("hidden");
    }
  }
  if (els.journeyScrollHint) {
    const hint = isTouchViewport() ? (j.scrollHintTouch ?? j.scrollHint) : j.scrollHint;
    if (hint) {
      els.journeyScrollHint.innerHTML = formatConceptHtml(hint);
      els.journeyScrollHint.classList.remove("hidden");
    } else {
      els.journeyScrollHint.textContent = "";
      els.journeyScrollHint.classList.add("hidden");
    }
  }
  if (els.journeyClose) els.journeyClose.textContent = j.close;
}

function renderTimeline() {
  els.timeline.innerHTML = "";
  PROJECT_KEYS.forEach((key, i) => {
    const p = STRINGS[lang].projects[key];
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "timeline-btn";
    btn.dataset.key = key;
    const order = String(i + 1).padStart(2, "0");
    btn.dataset.num = order;
    btn.innerHTML = `<span class="phase"><span class="phase__order">${order}</span><span class="phase__tag">${p.phase}</span></span><span class="title">${p.title}</span>`;
    btn.addEventListener("click", () => {
      maze?.teleportToGate(key);
      setUiMenuOpen(false);
      openDetail(key);
    });
    els.timeline.appendChild(btn);
  });
}

function setActiveTimeline(key) {
  els.timeline.querySelectorAll(".timeline-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.key === key);
  });
  setProjectTheme(key);
  syncHud(key);
}

function renderVisualAids(aids) {
  return (aids ?? [])
    .map((a) => {
      if (a.type === "flow") {
        const steps = a.steps
          .map(
            (step, i) =>
              `<li><span class="flow-step__n">${i + 1}</span><span>${step}</span>${i < a.steps.length - 1 ? '<span class="flow-step__arrow" aria-hidden="true">→</span>' : ""}</li>`,
          )
          .join("");
        return `<article class="visual-aid visual-aid--flow"><h3>${a.title}</h3><ol class="flow-steps">${steps}</ol>${a.caption ? `<p>${a.caption}</p>` : ""}</article>`;
      }
      if (a.type === "diagram") {
        const cap = `${a.title}${a.caption ? ` — ${a.caption}` : ""}`.replace(/"/g, "&quot;");
        return `<figure class="visual-aid visual-aid--diagram visual-aid--zoomable" data-full="${a.src}" data-type="image" data-caption="${cap}" role="button" tabindex="0" aria-label="${a.title}"><img src="${a.src}" alt="${a.title}" loading="lazy" decoding="async" /><figcaption><strong>${a.title}</strong>${a.caption ? ` — ${a.caption}` : ""}</figcaption></figure>`;
      }
      return "";
    })
    .join("");
}

function isLocalPortfolioAsset(src) {
  return !/^https?:\/\//i.test(src);
}

async function filterReachableMedia(media) {
  const checks = await Promise.all(
    media.map(async (m) => {
      if (!isLocalPortfolioAsset(m.src)) return m;
      try {
        const res = await fetch(m.src, { method: "HEAD" });
        return res.ok ? m : null;
      } catch {
        return null;
      }
    }),
  );
  const ok = checks.filter(Boolean);
  return ok.length > 0 ? ok : media.filter((m) => m.type === "image");
}

function galleryItemsHtml(media, featuredFirst = true) {
  return media
    .map((m, i) => {
      const featured = featuredFirst && i === 0 ? " gallery-item--featured" : "";
      const cap = String(m.caption).replace(/"/g, "&quot;");
      const data = `data-full="${m.src}" data-type="${m.type}" data-caption="${cap}"`;
      if (m.type === "video") {
        return `<figure class="gallery-item gallery-item--video${featured}" ${data}><video src="${m.src}" muted autoplay playsinline preload="metadata" loop></video><span class="gallery-item__play" aria-hidden="true">▶</span><figcaption>${m.caption}</figcaption></figure>`;
      }
      if (m.type === "gif") {
        return `<figure class="gallery-item gallery-item--image gallery-item--gif${featured}" ${data}><img src="${m.src}" alt="${m.caption}" loading="lazy" decoding="async" /><figcaption>${m.caption}</figcaption></figure>`;
      }
      return `<figure class="gallery-item gallery-item--image${featured}" ${data}><img src="${m.src}" alt="${m.caption}" loading="lazy" decoding="async" /><figcaption>${m.caption}</figcaption></figure>`;
    })
    .join("");
}

function bindGalleryMedia(root = els.detailGallery) {
  root?.querySelectorAll("video").forEach((video) => {
    video.addEventListener("error", () => {
      const fig = video.closest(".gallery-item");
      if (!fig) return;
      fig.classList.add("gallery-item--broken");
      const cap = fig.querySelector("figcaption");
      if (cap && !cap.dataset.fallback) {
        cap.dataset.fallback = "1";
        cap.textContent = `${cap.textContent} (${lang === "ko" ? "미디어를 불러올 수 없음" : "media unavailable"})`;
      }
    });
  });
}

async function renderDetailContent(key) {
  const p = getProject(lang, key);
  const media = await filterReachableMedia(p.media);
  const ui = STRINGS[lang].panel;
  const nav = STRINGS[lang].nav;
  const copy = siteCopyVars({ repo: getRepoSlug(key) });

  els.detailPhase.textContent = p.phase;
  els.detailTitle.textContent = p.title;
  els.detailSubtitle.innerHTML = formatConceptHtml(p.subtitle);
  els.detailTeam.innerHTML = formatConceptHtml(interpolateCopy(p.team, copy));
  els.detailMetaLine.innerHTML = formatConceptHtml(interpolateCopy(p.metaLine ?? "", copy));
  els.detailSummary.innerHTML = formatConceptHtml(p.summary);

  const highlights = p.highlights ?? [];
  if (els.detailHighlights) {
    if (highlights.length) {
      els.detailHighlights.hidden = false;
      els.detailHighlights.innerHTML = `<ul class="detail-bullets detail-bullets--highlights">${highlights.map((h) => `<li>${formatConceptHtml(h)}</li>`).join("")}</ul>`;
    } else {
      els.detailHighlights.hidden = true;
      els.detailHighlights.innerHTML = "";
    }
  }

  els.detailRoleTitle.textContent = ui.role;
  const rolePoints = p.rolePoints ?? (p.role ? [p.role] : []);
  els.detailRole.innerHTML = rolePoints.map((r) => `<li>${formatConceptHtml(r)}</li>`).join("");
  els.detailContribTitle.textContent = ui.contributions;
  els.detailSkillsTitle.textContent = ui.skills;
  els.detailTechTitle.textContent = ui.techniques;
  els.detailObstaclesTitle.textContent = ui.obstacles;
  els.detailOutcomesTitle.textContent = ui.outcomes;
  els.detailAidsTitle.textContent = ui.visualAids;
  els.detailStackTitle.textContent = ui.stack;
  els.detailGalleryTitle.textContent = ui.gallery;
  els.detailBackLabel.textContent = nav.back;
  els.detailVisualCaption.textContent = isTouchViewport()
    ? (nav.visualCaptionTouch ?? nav.visualCaption)
    : nav.visualCaption;
  els.detailLinksTitle.textContent = ui.links;
  const repoSlug = getRepoSlug(key);
  const deckUrl = p.deck ?? getDeckUrl(key);
  const deckLabel = p.deckLabel ?? ui.deck;
  if (els.detailDeck) {
    if (deckUrl) {
      els.detailDeck.hidden = false;
      els.detailDeck.href = deckUrl;
      els.detailDeck.textContent = `${deckLabel} →`;
      els.detailDeck.setAttribute("aria-label", deckLabel);
    } else {
      els.detailDeck.hidden = true;
      els.detailDeck.removeAttribute("href");
      els.detailDeck.textContent = "";
    }
  }
  els.detailRepo.textContent = repoSlug ? `${ui.repo} · ${repoSlug} →` : `${ui.repo} →`;
  els.detailRepo.href = REPO_URLS[key];
  els.detailRepo.setAttribute("aria-label", `${ui.repo}: ${repoSlug}`);

  els.detailContributions.innerHTML = (p.contributions ?? [])
    .map((h) => `<li>${formatConceptHtml(h)}</li>`)
    .join("");
  els.detailSkills.innerHTML = (p.skills ?? [])
    .map(
      (g) =>
        `<div class="skill-group"><h3>${formatConceptHtml(g.category)}</h3><ul>${g.items.map((i) => `<li>${formatConceptHtml(i)}</li>`).join("")}</ul></div>`,
    )
    .join("");
  els.detailTechniques.innerHTML = (p.techniques ?? [])
    .map((h) => `<li>${formatConceptHtml(h)}</li>`)
    .join("");
  els.detailObstacles.innerHTML = (p.obstacles ?? [])
    .map(
      (o) =>
        `<article class="obstacle-card"><h3>${formatConceptHtml(o.title)}</h3><p>${formatConceptHtml(o.body)}</p></article>`,
    )
    .join("");
  els.detailOutcomes.innerHTML = (p.outcomes ?? [])
    .map((h) => `<li>${formatConceptHtml(h)}</li>`)
    .join("");
  els.detailAids.innerHTML = renderVisualAids(p.visualAids);
  els.detailTags.innerHTML = p.stack.map((s) => `<span class="tag">${s}</span>`).join("");

  els.detailGallery.innerHTML = galleryItemsHtml(media);

  bindGalleryMedia(els.detailGallery);

  if (els.detailContent) {
    els.detailContent.scrollTop = 0;
    requestAnimationFrame(updateDetailScrollUi);
  }
}

function syncMobileControls() {
  if (!els.mobileControls) return;
  const show =
    introDone &&
    mode === "maze" &&
    isTouchViewport() &&
    !document.body.classList.contains("cutscene-mode");
  els.mobileControls.hidden = !show;
  if (!show) {
    els.mobileControls.classList.remove("mobile-controls--suppressed");
    els.mobileControls.removeAttribute("inert");
    els.mobileControls.setAttribute("aria-hidden", "true");
    resetMobileJoystick();
  } else {
    syncMobileControlsDrawer();
  }
}

function resetMobileJoystick() {
  maze?.setVirtualStick?.(0, 0);
  if (els.mobileJoystickThumb) {
    els.mobileJoystickThumb.style.transform = "translate(-50%, -50%)";
  }
  els.mobileJoystick?.classList.remove("mobile-joystick--active");
}

function bindMobileJoystick() {
  const root = els.mobileJoystick;
  const thumb = els.mobileJoystickThumb;
  const base = root?.querySelector(".mobile-joystick__base");
  if (!root || !thumb || !base) return;

  const DEADZONE = 0.14;
  let activePointer = null;

  const applyStick = (clientX, clientY) => {
    const rect = base.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const maxR = rect.width * 0.36;
    let dx = clientX - cx;
    let dy = clientY - cy;
    const dist = Math.hypot(dx, dy);
    if (dist > maxR) {
      const scale = maxR / dist;
      dx *= scale;
      dy *= scale;
    }
    thumb.style.transform = `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px))`;
    const norm = Math.hypot(dx, dy);
    if (norm < DEADZONE * maxR) {
      maze?.setVirtualStick?.(0, 0);
      return;
    }
    const power = Math.min(1, (norm - DEADZONE * maxR) / (maxR - DEADZONE * maxR));
    maze?.setVirtualStick?.((dx / norm) * power, (dy / norm) * power);
  };

  const endStick = () => {
    activePointer = null;
    resetMobileJoystick();
  };

  root.addEventListener("pointerdown", (e) => {
    if (els.mobileControls?.classList.contains("mobile-controls--suppressed")) return;
    if (activePointer !== null) return;
    e.preventDefault();
    activePointer = e.pointerId;
    root.setPointerCapture(e.pointerId);
    root.classList.add("mobile-joystick--active");
    applyStick(e.clientX, e.clientY);
  });

  root.addEventListener("pointermove", (e) => {
    if (activePointer !== e.pointerId) return;
    e.preventDefault();
    applyStick(e.clientX, e.clientY);
  });

  root.addEventListener("pointerup", (e) => {
    if (activePointer !== e.pointerId) return;
    endStick();
  });
  root.addEventListener("pointercancel", (e) => {
    if (activePointer !== e.pointerId) return;
    endStick();
  });
  root.addEventListener("lostpointercapture", endStick);
}

function initMobileControls() {
  if (!els.mobileControls) return;
  bindMobileJoystick();
  els.mobileInteract?.addEventListener("click", () => {
    if (els.mobileControls?.classList.contains("mobile-controls--suppressed")) return;
    maze?.tryInteract?.();
  });
  window.addEventListener(
    "resize",
    () => {
      syncMobileControls();
      if (mode === "maze") updateQuestBanner();
    },
    { passive: true },
  );
  syncMobileControls();
}

async function openDetail(key) {
  setUiMenuOpen(false);
  syncMobileControls();
  document.body.classList.remove("detail-hide-3d");
  mode = "detail";
  stopLabNotesRotation();
  maze?.setPaused(true);
  maze?.visited?.add(key);
  updateProgress();
  scheduleSaveMazeProgress();
  await renderDetailContent(key);
  setActiveTimeline(key);
  detail3d.setProject(key).then(() => detail3d.start());
  els.gameUi.classList.add("hidden");
  els.detailView.classList.add("open");
  els.detailView.dataset.key = key;
  els.detailView.setAttribute("aria-hidden", "false");
  document.body.classList.add("detail-mode");
  document.body.classList.remove("maze-mode");
  layoutMazeChrome();
  els.detailContent?.focus({ preventScroll: true });
  if (els.detail3dToggle) {
    const nav = STRINGS[lang].nav;
    els.detail3dToggle.textContent = nav.detail3dHide;
    els.detail3dToggle.setAttribute("aria-expanded", "true");
  }
  requestAnimationFrame(() => {
    detail3d?._resize?.();
    updateDetailScrollUi();
  });
}

function closeDetail() {
  resetViewOverlays();
  stopScrollLoop();
  scrollKeys.up = false;
  scrollKeys.down = false;
  document.body.classList.remove("detail-mode");
  mode = "maze";
  detail3d.stop();
  maze?.setPaused(false);
  syncMobileControls();
  els.detailView.classList.remove("open");
  els.detailView.dataset.key = "";
  els.detailView.setAttribute("aria-hidden", "true");
  els.gameUi.classList.remove("hidden");
  document.body.classList.add("maze-mode");
  layoutMazeChrome();
  els.detailContent?.blur();
  setActiveTimeline(maze?.nearZone ?? maze?.getNextGate?.() ?? "dl");
  updateQuestBanner();
  updateProgress();
  startLabNotesRotation();
  refreshMazeSurface();
  requestAnimationFrame(() => {
    scheduleSaveMazeProgress();
  });
}

function openLightbox(type, src, caption) {
  if (!els.lightbox) return;
  els.lightboxStage.innerHTML =
    type === "video"
      ? `<video src="${src}" controls autoplay playsinline></video>`
      : `<img src="${src}" alt="${caption ?? ""}" />`;
  els.lightboxCaption.textContent = caption ?? "";
  els.lightbox.hidden = false;
  els.lightbox.setAttribute("aria-hidden", "false");
}

function closeLightbox() {
  if (!els.lightbox || els.lightbox.hidden) return;
  els.lightboxStage.innerHTML = "";
  els.lightbox.hidden = true;
  els.lightbox.setAttribute("aria-hidden", "true");
}

async function showJourney() {
  setUiMenuOpen(false);
  syncMobileControls();
  mode = "journey";
  stopLabNotesRotation();
  maze?.setPaused(true);
  renderJourney();
  await renderAbout();
  if (els.journeyScroll) els.journeyScroll.scrollTop = 0;
  els.journeyOverlay?.classList.remove("hidden");
  if (els.journeyOverlay) {
    els.journeyOverlay.hidden = false;
    els.journeyOverlay.setAttribute("aria-hidden", "false");
  }
  document.body.classList.remove("maze-mode", "about-mode", "cutscene-mode");
  document.body.classList.add("journey-mode");
  els.gameUi?.classList.add("hidden");
  requestAnimationFrame(() => {
    els.journeyClose?.focus({ preventScroll: true });
  });
}

function hideJourney() {
  resetViewOverlays();
  stopScrollLoop();
  scrollKeys.up = false;
  scrollKeys.down = false;
  exitFlowActive = false;
  mode = "maze";
  els.journeyOverlay?.classList.add("hidden");
  if (els.journeyOverlay) {
    els.journeyOverlay.hidden = true;
    els.journeyOverlay.setAttribute("aria-hidden", "true");
  }
  document.body.classList.remove("journey-mode");
  document.body.classList.add("maze-mode");
  layoutMazeChrome();
  els.gameUi.classList.remove("hidden");
  maze?.setPaused(false);
  syncMobileControls();
  updateQuestBanner();
  startLabNotesRotation();
  refreshMazeSurface();
}

function startMaze() {
  if (introDone) return;
  stopScrollLoop();
  introDone = true;
  bumpLabVisit();
  audio.init();
  mode = "maze";
  els.introOverlay.classList.add("hidden");
  els.introOverlay.hidden = true;
  document.body.classList.remove("intro");
  document.body.classList.add("maze-mode");
  layoutMazeChrome();
  const saved = loadMazeProgress();
  if (saved) maze?.restoreProgress(saved);
  maze?.setPaused(false);
  syncMobileControls();
  updateQuestBanner();
  updateProgress();
  requestDrawMinimap(true);
  startLabNotesRotation();
  syncBrandLabelTier();
  scheduleViewportMetrics();
}

function syncBrandLabels() {
  const full = SITE.cohort;
  if (els.brandLabelFull) els.brandLabelFull.textContent = full;
  if (els.brandLabelShort) els.brandLabelShort.textContent = SITE.cohortShort;
  if (els.brandLabelMicro) els.brandLabelMicro.textContent = SITE.cohortMicro;
  if (els.brandText) {
    els.brandText.setAttribute("aria-label", full);
    els.brandText.title = full;
  }
  syncBrandLabelTier();
}

function syncBrandLabelTier() {
  if (!els.brandText || !els.brand) return;
  const brandEl = els.brand;
  if (getComputedStyle(brandEl).display === "none") return;

  const row = els.topBarRow?.getBoundingClientRect().width ?? window.innerWidth;
  const tools = els.topBarTools?.getBoundingClientRect().width ?? 0;
  const status = els.topStatus?.getBoundingClientRect().width ?? 0;
  const colGap = els.topBarRow
    ? Number.parseFloat(getComputedStyle(els.topBarRow).columnGap) || 8
    : 8;
  const wideBar = window.innerWidth >= 720;
  const budget = wideBar
    ? Math.max(40, (row - status - colGap * 2) / 2)
    : Math.max(40, row - tools - status - 24);

  let chosen = "micro";
  for (const tier of ["full", "short", "micro"]) {
    els.brandText.dataset.tier = tier;
    void brandEl.offsetWidth;
    const need = Math.max(brandEl.scrollWidth, brandEl.getBoundingClientRect().width);
    if (need <= budget + 1) {
      chosen = tier;
      break;
    }
  }
  els.brandText.dataset.tier = chosen;
}

const BOOT_VIDEO_RE = /\.(mp4|webm|mov)(\?|$)/i;
const BOOT_PRELOAD_CONCURRENCY = 6;

async function warmBootAsset(url) {
  if (BOOT_VIDEO_RE.test(url)) {
    try {
      const res = await fetch(url, { method: "HEAD", mode: "cors" });
      if (res.ok) return;
    } catch {
      /* fall through */
    }
    try {
      await fetch(url, { method: "GET", headers: { Range: "bytes=0-262143" } });
    } catch {
      /* ignore unreachable CDN assets */
    }
    return;
  }

  await new Promise((resolve) => {
    const img = new Image();
    img.decoding = "async";
    img.onload = img.onerror = () => resolve();
    img.src = url;
  });
}

async function runBootPool(items, concurrency, worker) {
  if (!items.length) return;
  let index = 0;
  const runners = Array.from({ length: Math.min(concurrency, items.length) }, async () => {
    while (index < items.length) {
      const item = items[index++];
      await worker(item);
    }
  });
  await Promise.all(runners);
}

async function filterReachableBootAssets(urls) {
  const local = [];
  const remote = [];
  for (const url of urls) {
    if (/^https?:\/\//i.test(url)) remote.push(url);
    else local.push(url);
  }

  const reachableLocal = [];
  await runBootPool(local, BOOT_PRELOAD_CONCURRENCY, async (url) => {
    try {
      const res = await fetch(url, { method: "HEAD" });
      if (res.ok) reachableLocal.push(url);
    } catch {
      /* skip missing local files */
    }
  });
  return [...reachableLocal, ...remote];
}

async function preloadBootAssets(urls, onProgress) {
  const queue = await filterReachableBootAssets(urls);
  const total = queue.length;
  let done = 0;
  const bump = () => {
    done += 1;
    onProgress?.(done, total);
  };

  await (document.fonts?.ready ?? Promise.resolve());
  bump();

  await runBootPool(queue, BOOT_PRELOAD_CONCURRENCY, async (url) => {
    await warmBootAsset(url);
    bump();
  });
}

let brandTierObserver = null;

function setupBrandLabelTier() {
  syncBrandLabelTier();
  if (brandTierObserver) return;
  brandTierObserver = new ResizeObserver(() => syncBrandLabelTier());
  if (els.topBarRow) brandTierObserver.observe(els.topBarRow);
  if (els.topBarTools) brandTierObserver.observe(els.topBarTools);
  if (els.topStatus) brandTierObserver.observe(els.topStatus);
  window.addEventListener("resize", syncBrandLabelTier, { passive: true });
}

function setBootProgress(pct, messageKey) {
  const boot = STRINGS[lang].boot ?? {};
  const msg = boot[messageKey] ?? boot.loading ?? "";
  const clamped = Math.min(100, Math.max(0, pct));
  if (els.bootLoaderBar) els.bootLoaderBar.style.width = `${clamped}%`;
  if (els.bootLoaderStatus) els.bootLoaderStatus.textContent = msg;
  if (els.bootLoader) els.bootLoader.setAttribute("aria-valuenow", String(Math.round(clamped)));
}

function revealIntroCard() {
  const card = els.introOverlay?.querySelector(".intro-card");
  if (card) card.classList.add("intro-card--revealed");
}

async function finishBootLoader() {
  setBootProgress(100, "ready");
  document.body.classList.remove("boot-loading");
  requestAnimationFrame(() => requestAnimationFrame(revealIntroCard));
  els.bootLoader?.classList.add("boot-loader--out");
  await new Promise((r) => setTimeout(r, 520));
  els.bootLoader?.remove();
}

let viewportFxTimer = null;
let viewportMetricsRaf = null;
let lastViewportW = 0;
let lastViewportH = 0;
let lastViewportBucket = "";
let minimapLastDraw = 0;

function isMazeCanvasVisible() {
  const body = document.body;
  return (
    body.classList.contains("maze-mode") &&
    !body.classList.contains("detail-mode") &&
    !body.classList.contains("journey-mode") &&
    !body.classList.contains("about-mode")
  );
}

/** Re-sync WebGL + minimap after overlays hide the maze canvas (resize while hidden → blurry upscaling). */
function refreshMazeSurface() {
  cancelAnimationFrame(viewportMetricsRaf);
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      if (!isMazeCanvasVisible()) return;
      maze?._resize?.(true);
      requestDrawMinimap(true);
      const vv = window.visualViewport;
      lastViewportW = Math.round(vv?.width ?? window.innerWidth);
      lastViewportH = Math.round(vv?.height ?? window.innerHeight);
      syncViewportMetrics();
    });
  });
}

function syncViewportMetrics() {
  const vv = window.visualViewport;
  const w = Math.round(vv?.width ?? window.innerWidth);
  const h = Math.round(vv?.height ?? window.innerHeight);
  const root = document.documentElement;
  const sizeChanged = w !== lastViewportW || h !== lastViewportH;

  root.style.setProperty("--app-width", `${w}px`);
  root.style.setProperty("--app-height", `${h}px`);
  root.style.setProperty("--viewport-offset-top", `${Math.max(0, Math.round(vv?.offsetTop ?? 0))}px`);
  root.style.setProperty(
    "--viewport-offset-left",
    `${Math.max(0, Math.round(vv?.offsetLeft ?? 0))}px`,
  );

  const refW = 900;
  const refH = 700;
  const scale = Math.min(w / refW, h / refH);
  const uiScale = Math.min(1.06, Math.max(0.84, scale));
  root.style.setProperty("--ui-scale", String(uiScale));

  const aspect = w / Math.max(1, h);
  const bucket =
    aspect >= 2.1 ? "ultrawide" : aspect <= 0.72 ? "tall" : w < 520 ? "narrow" : "balanced";
  const bucketChanged = bucket !== lastViewportBucket;
  root.dataset.viewport = bucket;

  if (mode === "maze") {
    if (bucketChanged || sizeChanged) layoutMazeChrome();
    else syncBrandLabelTier();
  } else {
    syncBrandLabelTier();
  }

  if (sizeChanged) {
    lastViewportW = w;
    lastViewportH = h;
    maze?._resize?.();
    if (isMazeCanvasVisible()) {
      requestDrawMinimap(true);
    }
    if (document.body.classList.contains("detail-mode")) {
      detail3d?._resize?.();
    }
  }

  lastViewportBucket = bucket;
}

function requestDrawMinimap(force = false) {
  const now = performance.now();
  const minGap = perfTier === "low" ? 900 : perfTier === "medium" ? 550 : 350;
  if (!force && now - minimapLastDraw < minGap) return;
  minimapLastDraw = now;
  drawMinimap();
}

function scheduleViewportMetrics() {
  cancelAnimationFrame(viewportMetricsRaf);
  viewportMetricsRaf = requestAnimationFrame(syncViewportMetrics);
}

function pulseViewportEdges() {
  if (perfTier !== "high") return;
  document.body.classList.add("viewport-resize-active");
  clearTimeout(viewportFxTimer);
  viewportFxTimer = setTimeout(() => document.body.classList.remove("viewport-resize-active"), 720);
}

function setupViewportFx() {
  let debounce = null;
  const onResize = () => {
    scheduleViewportMetrics();
    clearTimeout(debounce);
    debounce = setTimeout(pulseViewportEdges, 90);
  };
  window.addEventListener("resize", onResize, { passive: true });
  window.addEventListener("orientationchange", onResize, { passive: true });
  window.visualViewport?.addEventListener("resize", onResize, { passive: true });
  scheduleViewportMetrics();
}

function applySiteConfig() {
  document.body.dataset.project = SITE.defaultProject;
  syncBrandLabels();
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute("content", SITE.metaDescription);
  applyShareMeta(STRINGS[lang]);
  if (els.footerGithub) {
    els.footerGithub.textContent = `GitHub · ${SITE.github.username}`;
    els.footerGithub.href = githubProfileUrl();
  }
}

function applyLanguage() {
  const s = STRINGS[lang];
  const copy = siteCopyVars();
  document.documentElement.lang = lang;
  const pageTitle = `${displayName(lang)} — ${s.meta.titleSuffix}`;
  document.title = pageTitle;
  els.title.textContent = pageTitle;
  els.heroEyebrow.textContent = interpolateCopy(s.hero.eyebrow, copy);
  els.heroName.textContent = displayName(lang);
  els.heroSub.textContent = displayName(lang, "alias");
  els.heroRole.textContent = s.hero.role;
  els.heroTagline.innerHTML = formatConceptHtml(interpolateCopy(s.hero.tagline, copy));
  applyShareMeta(s);
  if (mode === "maze" && introDone) startLabNotesRotation();
  else stopLabNotesRotation();
  maze?.setExitLabel?.(s.exit?.labelSub ?? "");
  if (els.langLabel) els.langLabel.textContent = s.nav.lang;
  if (els.detailScrollHint) {
    els.detailScrollHint.textContent = isTouchViewport()
      ? (s.nav.scrollHintTouch ?? s.nav.scrollHint)
      : s.nav.scrollHint;
  }
  if (els.mobileJoystickLabel) {
    els.mobileJoystickLabel.textContent = s.nav.mobileJoystickLabel ?? "Move";
  }
  if (els.mobileJoystick) {
    els.mobileJoystick.setAttribute("aria-label", s.nav.mobileJoystickLabel ?? "Move");
  }
  if (els.mobileInteractLabel) {
    els.mobileInteractLabel.textContent = s.nav.mobileInteractLabel ?? "Enter";
  }
  if (els.mobileInteract) {
    els.mobileInteract.setAttribute("aria-label", s.nav.mobileInteract ?? "Open station");
  }
  if (els.hint) {
    const hintTemplate = isTouchViewport() ? (s.nav.hintTouch ?? s.nav.hint) : s.nav.hint;
    els.hint.textContent = interpolateCopy(hintTemplate, copy);
    els.hint.hidden = false;
  }
  if (els.uiDrawerTitle) els.uiDrawerTitle.textContent = s.nav.menuTitle;
  if (els.uiMenuBtn) {
    els.uiMenuBtn.setAttribute(
      "aria-label",
      document.body.classList.contains("ui-menu-open") ? s.nav.menuClose : s.nav.menuOpen,
    );
  }
  if (els.uiDrawerClose) els.uiDrawerClose.setAttribute("aria-label", s.nav.menuClose);
  if (els.detail3dToggle) {
    const hidden = document.body.classList.contains("detail-hide-3d");
    els.detail3dToggle.textContent = hidden ? s.nav.detail3dShow : s.nav.detail3dHide;
    els.detail3dToggle.setAttribute("aria-expanded", String(!hidden));
  }
  const hudLabel = document.getElementById("hud-label");
  if (hudLabel) hudLabel.textContent = s.nav.hudLabel;
  renderIntro();
  renderJourney();
  renderAbout();
  renderTimeline();
  if (mode === "detail" && els.detailView.dataset.key) {
    void renderDetailContent(els.detailView.dataset.key);
  } else if (mode === "maze") {
    updateQuestBanner();
    updateProgress();
    syncHud(maze?.nearZone ?? maze?.getNextGate?.());
  }
}

function setupCursorGlow() {
  if (!els.cursorGlow || !window.matchMedia("(hover: hover)").matches || perfTier === "low") {
    return;
  }
  window.addEventListener("pointermove", (e) => {
    els.cursorGlow.style.left = `${e.clientX}px`;
    els.cursorGlow.style.top = `${e.clientY}px`;
  });
}

function updateDetailScrollUi() {
  const content = els.detailContent;
  if (!content) return;
  const max = content.scrollHeight - content.clientHeight;
  const pct = max > 8 ? (content.scrollTop / max) * 100 : 0;
  if (els.detailScrollProgress) {
    els.detailScrollProgress.style.setProperty("--scroll", `${pct}%`);
    els.detailScrollProgress.classList.toggle("detail-scroll-progress--active", max > 8);
  }
  if (els.detailScrollHint) {
    const atEnd = content.scrollTop >= max - 4;
    els.detailScrollHint.classList.toggle("detail-scroll-hint--hidden", atEnd || max <= 8);
  }
}

function setupDetailScroll() {
  const content = els.detailContent;
  if (!content) return;
  content.addEventListener(
    "wheel",
    (e) => {
      if (!document.body.classList.contains("detail-mode")) return;
      e.stopPropagation();
    },
    { passive: true },
  );
  content.addEventListener("scroll", updateDetailScrollUi, { passive: true });
}

function setupUiMenu() {
  const toggle = () => setUiMenuOpen(!document.body.classList.contains("ui-menu-open"));

  els.uiMenuBtn?.addEventListener("click", toggle);
  els.uiDrawerClose?.addEventListener("click", () => setUiMenuOpen(false));
  els.uiDrawerBackdrop?.addEventListener("click", () => setUiMenuOpen(false));

  const onMq = () => layoutMazeChrome();
  if (MAZE_MENU_MQ.addEventListener) MAZE_MENU_MQ.addEventListener("change", onMq);
  else MAZE_MENU_MQ.addListener(onMq);

  const onResize = () => {
    layoutMazeChrome();
    syncBrandLabelTier();
  };
  window.addEventListener("resize", onResize, { passive: true });
}

function setupDetail3dToggle() {
  els.detail3dToggle?.addEventListener("click", () => {
    const hide = document.body.classList.toggle("detail-hide-3d");
    els.detail3dToggle.setAttribute("aria-expanded", String(!hide));
    const s = STRINGS[lang].nav;
    els.detail3dToggle.textContent = hide ? s.detail3dShow : s.detail3dHide;
    requestAnimationFrame(() => detail3d?._resize?.());
    updateDetailScrollUi();
  });
}

function setupDetailResize() {
  const frame = els.detailCanvas?.parentElement;
  if (!frame) return;

  const sync = () => {
    if (document.body.classList.contains("detail-mode") && detail3d?._resize) {
      detail3d._resize();
      requestAnimationFrame(updateDetailScrollUi);
    }
  };

  if (typeof ResizeObserver !== "undefined") {
    const ro = new ResizeObserver(sync);
    ro.observe(frame);
  }

  window.addEventListener("resize", sync, { passive: true });
  window.visualViewport?.addEventListener("resize", sync, { passive: true });
}

els.langBtn.addEventListener("click", () => {
  setIntroLanguage(lang === "en" ? "ko" : "en");
});

els.introLangEn?.addEventListener("click", () => setIntroLanguage("en"));
els.introLangKo?.addEventListener("click", () => setIntroLanguage("ko"));

els.detailBack.addEventListener("click", closeDetail);
els.introStart.addEventListener("click", startMaze);
els.introSkip.addEventListener("click", startMaze);
els.journeyClose?.addEventListener("click", hideJourney);
els.soundBtn?.addEventListener("click", () => {
  audio.toggleMute();
  updateSoundBtn();
});

function onEnlargeableMediaClick(e) {
  const fig = e.target.closest(".gallery-item, .visual-aid--zoomable");
  if (!fig || !fig.dataset.full) return;
  openLightbox(fig.dataset.type ?? "image", fig.dataset.full, fig.dataset.caption);
}

function onEnlargeableMediaKeydown(e) {
  if (e.key !== "Enter" && e.key !== " ") return;
  const fig = e.target.closest(".visual-aid--zoomable");
  if (!fig || !fig.dataset.full) return;
  e.preventDefault();
  openLightbox(fig.dataset.type ?? "image", fig.dataset.full, fig.dataset.caption);
}

els.detailGallery?.addEventListener("click", onEnlargeableMediaClick);
els.aboutGallery?.addEventListener("click", onEnlargeableMediaClick);
els.detailAids?.addEventListener("click", onEnlargeableMediaClick);
els.detailAids?.addEventListener("keydown", onEnlargeableMediaKeydown);

els.lightbox?.addEventListener("click", (e) => {
  if (e.target === els.lightbox || e.target.closest(".lightbox__close")) closeLightbox();
});

document.addEventListener("keydown", (e) => {
  if (handlePanelScrollKey(e, true)) return;
  if (e.key === "m" || e.key === "M") {
    audio.toggleMute();
    updateSoundBtn();
    return;
  }
  if (e.key === "Escape") {
    if (els.lightbox && !els.lightbox.hidden) {
      closeLightbox();
      return;
    }
    if (document.body.classList.contains("ui-menu-open")) {
      setUiMenuOpen(false);
      return;
    }
    if (mode === "detail") closeDetail();
    else if (mode === "journey") hideJourney();
  }
  const n = Number.parseInt(e.key, 10);
  if (mode === "maze" && !maze?.paused && n >= 1 && n <= PROJECT_COUNT) {
    const key = PROJECT_KEYS[n - 1];
    if (maze?.canActivateGate?.(key) || maze?.visited?.has(key)) {
      maze?.teleportToGate(key);
      enterProject(key);
    }
  }
});

document.addEventListener("keyup", (e) => {
  handlePanelScrollKey(e, false);
});

window.addEventListener("blur", stopScrollLoop);

function showBootError(message) {
  document.body.classList.remove("intro");
  document.body.classList.add("boot-error");
  let el = document.getElementById("boot-error");
  if (!el) {
    el = document.createElement("p");
    el.id = "boot-error";
    el.className = "boot-error";
    document.body.appendChild(el);
  }
  el.textContent = message;
}

async function init() {
  const skipBoot = new URLSearchParams(location.search).get("noboot") === "1";
  try {
    if (!skipBoot) {
      document.body.classList.add("boot-loading");
      setBootProgress(8, "loading");
    }

    applySiteConfig();
    if (!skipBoot) setBootProgress(18, "config");
    if (isTouchViewport()) document.body.classList.add("touch-ui");
    perfTier = applyPerfClass(detectPerfTier());
    applyLanguage();
    if (!skipBoot) setBootProgress(28, "config");
    setupCursorGlow();
    setupDetailScroll();
    setupUiMenu();
    setupDetail3dToggle();
    setupViewportFx();
    setupBrandLabelTier();

    if (!skipBoot) setBootProgress(42, "maze");
    maze = new MazeScene(document.getElementById("canvas-root"), { perf: perfTier });
    maze.setPaused(true);
    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));

    if (!skipBoot) setBootProgress(68, "scenes");
    detail3d = new DetailScene(els.detailCanvas, { perf: perfTier });
    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
    detail3d.onCreditChange = (credit) => {
      const base = STRINGS[lang].nav.visualCaption;
      els.detailVisualCaption.textContent = credit ? `${base} · ${credit}` : base;
    };
    setupDetailResize();

    maze.onZoneFocus = (key) => {
      setProjectTheme(key);
      syncHud(key);
      updateQuestBanner();
      if (key) {
        const idx = PROJECT_KEYS.indexOf(key);
        els.timeline.querySelectorAll(".timeline-btn").forEach((btn, i) => {
          btn.classList.toggle("active", i === idx);
        });
      }
      requestDrawMinimap(true);
    };

    maze.onZoneActivate = (key) => enterProject(key);
    maze.onReachExit = () => enterExit();
    maze.onGateLocked = () => updateQuestBanner();
    maze.onStep = (sprint) => {
      audio.step(sprint);
      if (introDone && mode === "maze") {
        scheduleSaveMazeProgress();
        requestDrawMinimap();
      }
    };
    maze.onArrive = () => audio.arrive();

    window.addEventListener("pagehide", saveMazeProgress);

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        saveMazeProgress();
        detail3d?.stop();
        if (mode === "maze") maze?.setPaused(true);
        return;
      }
      if (mode === "detail") detail3d?.start();
      else if (mode === "maze" && introDone && !document.body.classList.contains("ui-menu-open")) {
        maze?.setPaused(false);
      }
    });

    updateQuestBanner();
    updateProgress();
    updateSoundBtn();
    initMobileControls();
    layoutMazeChrome();
    maze?._resize?.();

    if (!skipBoot) {
      const resumeBoot = hasRestorableProgress();
      setBootProgress(72, resumeBoot ? "resume" : "assets");
      const assets = collectBootAssetUrls();
      await preloadBootAssets(assets, (done, total) => {
        const pct = 72 + Math.round((done / Math.max(1, total)) * 18);
        setBootProgress(pct, resumeBoot ? "resume" : "assets");
      });
      setBootProgress(92, "scenes");
      await finishBootLoader();
    } else {
      document.body.classList.remove("boot-loading");
      els.bootLoader?.remove();
      requestAnimationFrame(() => requestAnimationFrame(revealIntroCard));
    }

    if (new URLSearchParams(location.search).get("debug") === "1") {
      window.__portfolio = {
        get maze() {
          return maze;
        },
        get mode() {
          return mode;
        },
        closeDetail,
        openDetail,
        enterProject,
        enterExit,
        showJourney,
        hideJourney,
        startMaze,
        unlockAllGates() {
          PROJECT_KEYS.forEach((k) => maze?.visited?.add(k));
          updateProgress();
          updateQuestBanner();
        },
      };
    }
  } catch (err) {
    console.error("[portfolio] init failed", err);
    document.body.classList.remove("boot-loading");
    els.bootLoader?.remove();
    showBootError(
      lang === "ko"
        ? "3D 뷰를 불러오지 못했습니다. 새로고침해 주세요."
        : "Could not load 3D view. Please refresh.",
    );
  }
}

init();
