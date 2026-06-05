import {
  SITE,
  BREAKPOINTS,
  PROJECT_COUNT,
  displayName,
  fullName,
  githubProfileUrl,
  getRepoSlug,
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
} from "./i18n.js";
import { MazeScene, getMazeLayout } from "./maze-scene.js";
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
const audio = new AudioEngine();

const els = {
  title: document.getElementById("page-title"),
  heroEyebrow: document.getElementById("hero-eyebrow"),
  heroName: document.getElementById("hero-name"),
  heroSub: document.getElementById("hero-sub"),
  heroRole: document.getElementById("hero-role"),
  heroTagline: document.getElementById("hero-tagline"),
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
  detailRepoTitle: document.getElementById("detail-repo-title"),
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
  introEdu: document.getElementById("intro-edu"),
  introStart: document.getElementById("intro-start"),
  introSkip: document.getElementById("intro-skip"),
  introControls: document.getElementById("intro-controls"),
  introLangLabel: document.getElementById("intro-lang-label"),
  introLangEn: document.getElementById("intro-lang-en"),
  introLangKo: document.getElementById("intro-lang-ko"),
  aboutOverlay: document.getElementById("about-overlay"),
  aboutPhoto: document.getElementById("about-photo"),
  aboutEyebrow: document.getElementById("about-eyebrow"),
  aboutTitle: document.getElementById("about-title"),
  aboutRole: document.getElementById("about-role"),
  aboutBio: document.getElementById("about-bio"),
  aboutStrengths: document.getElementById("about-strengths"),
  aboutPhone: document.getElementById("about-phone"),
  aboutArtBlock: document.getElementById("about-art-block"),
  aboutArtIntro: document.getElementById("about-art-intro"),
  aboutArtLink: document.getElementById("about-art-link"),
  aboutThanks: document.getElementById("about-thanks"),
  aboutClose: document.getElementById("about-close"),
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
  mobileSprint: document.getElementById("mobile-sprint"),
  mobileInteract: document.getElementById("mobile-interact"),
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
  brandText: document.querySelector(".brand__text"),
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

function setUiMenuOpen(open) {
  if (!usesMazeMenu() && open) return;
  document.body.classList.toggle("ui-menu-open", open);
  els.uiMenuBtn?.setAttribute("aria-expanded", String(open));
  const nav = STRINGS[lang].nav;
  els.uiMenuBtn?.setAttribute("aria-label", open ? nav.menuClose : nav.menuOpen);
  els.uiDrawer?.setAttribute("aria-hidden", String(!open));
  if (els.uiDrawerBackdrop) els.uiDrawerBackdrop.hidden = !open;
  if (open) {
    els.uiDrawerClose?.focus({ preventScroll: true });
  } else if (document.activeElement?.closest?.(".ui-drawer__panel")) {
    els.uiMenuBtn?.focus({ preventScroll: true });
  }
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
  if (mode === "about" && els.aboutOverlay) {
    return els.aboutOverlay.querySelector(".overlay__card");
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
  if (mode !== "detail" && mode !== "about" && mode !== "intro") return false;
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
    return;
  }
  if (maze?.nearExit) {
    setQuestBanner(s.nav.questExit);
    els.questBanner.classList.add("quest-banner--active");
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
  drawMinimap();
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
  els.introEdu.textContent = i.edu;
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
  if (els.aboutPhoto) {
    if (a.profileImage) els.aboutPhoto.src = a.profileImage;
    els.aboutPhoto.alt = fullName();
    els.aboutPhoto.hidden = !a.profileImage;
  }
  els.aboutEyebrow.textContent = a.eyebrow;
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
  els.aboutClose.textContent = a.close;
}

function renderTimeline() {
  els.timeline.innerHTML = "";
  PROJECT_KEYS.forEach((key, i) => {
    const p = STRINGS[lang].projects[key];
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "timeline-btn";
    btn.dataset.key = key;
    btn.dataset.num = String(i + 1).padStart(2, "0");
    btn.innerHTML = `<span class="phase">${p.phase}</span><span class="title">${p.title}</span>`;
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
        return `<figure class="visual-aid visual-aid--diagram"><img src="${a.src}" alt="${a.title}" loading="lazy" /><figcaption><strong>${a.title}</strong>${a.caption ? ` — ${a.caption}` : ""}</figcaption></figure>`;
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
  els.detailRepoTitle.textContent = ui.repo;
  const repoSlug = getRepoSlug(key);
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
    resetMobileJoystick();
    resetMobileSprint();
  }
}

function isMobileSprintHeld() {
  return els.mobileSprint?.classList.contains("mobile-btn--sprint-active") ?? false;
}

function mobileStickPower() {
  return Math.hypot(maze?.stickX ?? 0, maze?.stickZ ?? 0);
}

function syncMobileSprintKey(power) {
  const p = power ?? mobileStickPower();
  maze?.setVirtualKey?.("shift", isMobileSprintHeld() || p >= 0.9);
}

function resetMobileSprint() {
  els.mobileSprint?.classList.remove("mobile-btn--sprint-active");
  els.mobileSprint?.setAttribute("aria-pressed", "false");
  maze?.setVirtualKey?.("shift", false);
}

function resetMobileJoystick() {
  maze?.setVirtualStick?.(0, 0);
  if (els.mobileJoystickThumb) {
    els.mobileJoystickThumb.style.transform = "translate(-50%, -50%)";
  }
  els.mobileJoystick?.classList.remove("mobile-joystick--active");
  if (!isMobileSprintHeld()) maze?.setVirtualKey?.("shift", false);
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
      syncMobileSprintKey(0);
      return;
    }
    const power = Math.min(1, (norm - DEADZONE * maxR) / (maxR - DEADZONE * maxR));
    maze?.setVirtualStick?.((dx / norm) * power, (dy / norm) * power);
    syncMobileSprintKey(power);
  };

  const endStick = () => {
    activePointer = null;
    resetMobileJoystick();
  };

  root.addEventListener("pointerdown", (e) => {
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

function bindMobileSprint() {
  const btn = els.mobileSprint;
  if (!btn) return;

  const down = (e) => {
    e.preventDefault();
    btn.setPointerCapture(e.pointerId);
    btn.classList.add("mobile-btn--sprint-active");
    btn.setAttribute("aria-pressed", "true");
    maze?.setVirtualKey?.("shift", true);
  };

  const up = (e) => {
    if (btn.hasPointerCapture(e.pointerId)) btn.releasePointerCapture(e.pointerId);
    btn.classList.remove("mobile-btn--sprint-active");
    btn.setAttribute("aria-pressed", "false");
    syncMobileSprintKey();
  };

  btn.addEventListener("pointerdown", down);
  btn.addEventListener("pointerup", up);
  btn.addEventListener("pointercancel", up);
  btn.addEventListener("lostpointercapture", () => {
    btn.classList.remove("mobile-btn--sprint-active");
    btn.setAttribute("aria-pressed", "false");
    syncMobileSprintKey();
  });
}

function initMobileControls() {
  if (!els.mobileControls) return;
  bindMobileJoystick();
  bindMobileSprint();
  els.mobileInteract?.addEventListener("click", () => maze?.tryInteract?.());
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
  maze?.setPaused(true);
  maze?.visited?.add(key);
  updateProgress();
  await renderDetailContent(key);
  setActiveTimeline(key);
  detail3d.setProject(key).then(() => detail3d.start());
  els.gameUi.classList.add("hidden");
  els.detailView.classList.add("open");
  els.detailView.dataset.key = key;
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
  els.gameUi.classList.remove("hidden");
  document.body.classList.add("maze-mode");
  layoutMazeChrome();
  els.detailContent?.blur();
  setActiveTimeline(maze?.nearZone ?? maze?.getNextGate?.() ?? "dl");
  updateQuestBanner();
  updateProgress();
  requestAnimationFrame(() => {
    maze?._resize?.();
    drawMinimap();
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

function showAbout() {
  setUiMenuOpen(false);
  syncMobileControls();
  mode = "about";
  maze?.setPaused(true);
  renderAbout();
  els.aboutOverlay.classList.remove("hidden");
  els.aboutOverlay.hidden = false;
  document.body.classList.add("about-mode");
}

function hideAbout() {
  resetViewOverlays();
  stopScrollLoop();
  scrollKeys.up = false;
  scrollKeys.down = false;
  mode = "maze";
  els.aboutOverlay.classList.add("hidden");
  els.aboutOverlay.hidden = true;
  document.body.classList.remove("about-mode");
  document.body.classList.add("maze-mode");
  layoutMazeChrome();
  els.gameUi.classList.remove("hidden");
  maze?.setPaused(false);
  syncMobileControls();
  updateQuestBanner();
  requestAnimationFrame(() => {
    maze?._resize?.();
    drawMinimap();
  });
}

function startMaze() {
  if (introDone) return;
  stopScrollLoop();
  introDone = true;
  audio.init();
  mode = "maze";
  els.introOverlay.classList.add("hidden");
  els.introOverlay.hidden = true;
  document.body.classList.remove("intro");
  document.body.classList.add("maze-mode");
  layoutMazeChrome();
  maze?.setPaused(false);
  syncMobileControls();
  updateQuestBanner();
  updateProgress();
}

function applySiteConfig() {
  document.body.dataset.project = SITE.defaultProject;
  if (els.brandText) els.brandText.textContent = SITE.cohort;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute("content", SITE.metaDescription);
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
  if (els.langLabel) els.langLabel.textContent = s.nav.lang;
  if (els.detailScrollHint) {
    els.detailScrollHint.textContent = isTouchViewport()
      ? (s.nav.scrollHintTouch ?? s.nav.scrollHint)
      : s.nav.scrollHint;
  }
  if (els.mobileInteract) {
    els.mobileInteract.textContent = isTouchViewport() ? "E" : (s.nav.mobileInteract ?? "E");
    els.mobileInteract.setAttribute("aria-label", s.nav.mobileInteract ?? "Open");
  }
  if (els.mobileSprint) {
    els.mobileSprint.setAttribute("aria-label", s.nav.mobileSprint ?? "Sprint");
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

  window.addEventListener("resize", layoutMazeChrome, { passive: true });
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
els.aboutClose.addEventListener("click", hideAbout);
els.soundBtn?.addEventListener("click", () => {
  audio.toggleMute();
  updateSoundBtn();
});

function onGalleryClick(e) {
  const fig = e.target.closest(".gallery-item");
  if (!fig || !fig.dataset.full) return;
  openLightbox(fig.dataset.type, fig.dataset.full, fig.dataset.caption);
}

els.detailGallery?.addEventListener("click", onGalleryClick);
els.aboutGallery?.addEventListener("click", onGalleryClick);

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
    else if (mode === "about") hideAbout();
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

function init() {
  try {
    applySiteConfig();
    if (isTouchViewport()) document.body.classList.add("touch-ui");
    perfTier = applyPerfClass(detectPerfTier());
    applyLanguage();
    setupCursorGlow();
    setupDetailScroll();
    setupUiMenu();
    setupDetail3dToggle();
    maze = new MazeScene(document.getElementById("canvas-root"), { perf: perfTier });
    maze.setPaused(true);
    detail3d = new DetailScene(els.detailCanvas, { perf: perfTier });
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
      drawMinimap();
    };

    maze.onZoneActivate = (key) => enterProject(key);
    maze.onReachExit = () => showAbout();
    maze.onGateLocked = () => updateQuestBanner();
    maze.onStep = (sprint) => audio.step(sprint);
    maze.onArrive = () => audio.arrive();

    setInterval(() => {
      if (mode === "maze" && !document.hidden) drawMinimap();
    }, 400);

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        detail3d?.stop();
        if (mode === "maze") maze?.setPaused(true);
        return;
      }
      if (mode === "detail") detail3d?.start();
      else if (mode === "maze" && introDone) maze?.setPaused(false);
    });

    updateQuestBanner();
    updateProgress();
    updateSoundBtn();
    initMobileControls();
    layoutMazeChrome();

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
        startMaze,
      };
    }
  } catch (err) {
    console.error("[portfolio] init failed", err);
    showBootError(
      lang === "ko"
        ? "3D 뷰를 불러오지 못했습니다. 새로고침해 주세요."
        : "Could not load 3D view. Please refresh.",
    );
  }
}

init();
