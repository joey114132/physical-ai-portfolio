/**
 * Locale strings and media resolution. Site facts live in `config.js`.
 * @module i18n
 */

import { SITE, PROJECT_KEYS } from "./config.js";

export { PROJECT_COLORS, PROJECT_KEYS, REPO_URLS, PHASE_SHORT } from "./config.js";

/**
 * @param {string} text
 * @param {Record<string, string|number>} [vars]
 * @returns {string}
 */
export function interpolateCopy(text, vars = {}) {
  return String(text).replace(/\{(\w+)\}/g, (_, key) =>
    vars[key] != null ? String(vars[key]) : `{${key}}`,
  );
}

export const PRISMIC = {
  /** Gesto (DL cohort) — woolimi Prismic, same assets as minsungchoi.com/projects/schools/gesto */
  gestoPptMode:
    "https://images.prismic.io/woolimi/aaUlj8FoBIGEg9yq_ppt-mode.gif?auto=format,compress",
  gestoYoutubeMode:
    "https://images.prismic.io/woolimi/aaUlkMFoBIGEg9yr_youtube-mode.gif?auto=format,compress",
  gestoGestureWorking:
    "https://images.prismic.io/woolimi/aaW4RTPJ2QKSVUFn_gesture-working.gif?auto=format,compress",
  gestoGestureNotWorking:
    "https://images.prismic.io/woolimi/aaW4RDPJ2QKSVUFl_gesture-not-working.gif?auto=format,compress",
  gestoTrigger:
    "https://images.prismic.io/woolimi/aaW4RzPJ2QKSVUFp_trigger.gif?auto=format,compress",
  gestoMediapipe:
    "https://images.prismic.io/woolimi/aaWyozPJ2QKSVT-e_mediapipe.png?auto=format,compress",
  hifiveGif:
    "https://images.prismic.io/joey/ah544AeQX7-eWhsi_hifive_final.gif?auto=format,compress",
  hifiveReal:
    "https://images.prismic.io/joey/ah544geQX7-eWhsk_hifive_real.gif?auto=format,compress",
  cloud: "https://images.prismic.io/joey/ah541QeQX7-eWhsX_browser_cloud.jpg?auto=format,compress",
  simBalls:
    "https://images.prismic.io/joey/ah545AeQX7-eWhsl_hifive_sim.gif?auto=format,compress",
  mujoco: "https://images.prismic.io/joey/ah548AeQX7-eWhsw_twin_blueball.jpg?auto=format,compress",
  mugunghwa: "https://images.prismic.io/joey/ah546geQX7-eWhsq_mugunghwa_real.gif",
  mugunghwaUi:
    "https://images.prismic.io/joey/ah548weQX7-eWhs0_web_eduping_ui.jpg?auto=format,compress",
  reportUi: "https://images.prismic.io/joey/ah547AeQX7-eWhss_report_ui.jpg?auto=format,compress",
  reportTimeline:
    "https://images.prismic.io/joey/ah546weQX7-eWhsr_report_ui2.jpg?auto=format,compress",
  oxBoard:
    "https://images.prismic.io/block/ah6SSgeQX7-eWh5Y_ox-vision-board.png?auto=format,compress",
  oxLock:
    "https://images.prismic.io/block/ah6STAeQX7-eWh5b_ox-vision-lockin.png?auto=format,compress",
  /** GogoPing (pingdergarten · proj 04) — teacher follow; not ShopPinkki mart cart */
  gogopingFollow:
    "https://minsung.cdn.prismic.io/minsung/aiDnLAeQX7-eWtio_%EC%B6%94%EC%A2%85_%EC%B5%9C%EC%A2%85.mp4",
  gogopingHideseek:
    "https://minsung.cdn.prismic.io/minsung/aiDiLgeQX7-eWtWx_%EC%88%A8%EB%B0%94%EA%BC%AD%EC%A7%88-%EC%B5%9C%EC%A2%85.mp4",
  trackingReid: "https://woolimi.cdn.prismic.io/woolimi/ad_Me51ZCF7ETObD_yolo_reid_bytetracker.mp4",
  trackingLive: "https://woolimi.cdn.prismic.io/woolimi/ad-Dd51ZCF7ETNkJ_tracking_muted.mp4",
  trackingStart:
    "https://images.prismic.io/woolimi/ad-Bwp1ZCF7ETNiP_start-tracking.gif?auto=format,compress",
  shopRegister:
    "https://images.prismic.io/woolimi/ad9i4J1ZCF7ETNOV_register.gif?auto=format,compress",
  /** ShopPinkki — woolimi Prismic (minsungchoi.com/projects/schools/shoppinkki) */
  finalDemo: "https://woolimi.cdn.prismic.io/woolimi/aee1FsBOoF08xL-c_final-demo.mp4",
  shopShoppingList: "https://woolimi.cdn.prismic.io/woolimi/aeB4WJ1ZCF7ETPD6_shopping-list.mp4",
  shopWaiting: "https://woolimi.cdn.prismic.io/woolimi/aeFIHJ1ZCF7ETRBu_waiting-demo.mp4",
  shopPayment: "https://woolimi.cdn.prismic.io/woolimi/aeFOLp1ZCF7ETRDK_payment-demo.mp4",
  shopLlmGuide: "https://woolimi.cdn.prismic.io/woolimi/aeY-iMBOoF08xJCI_llm-guide.mp4",
  shopGuideAdmin: "https://woolimi.cdn.prismic.io/woolimi/aebHn8BOoF08xJ8-_guide-admin.mp4",
  shopReturn: "https://woolimi.cdn.prismic.io/woolimi/aeeisMBOoF08xL04_return-demo.mp4",
  shopGuideDemo: "https://woolimi.cdn.prismic.io/woolimi/aeezmMBOoF08xL92_guide-demo.mp4",
  guidingDemo: "https://woolimi.cdn.prismic.io/woolimi/aeE4C51ZCF7ETQ5Z_guiding-18-demo.mp4",
  hifiveVideo:
    "https://minsung.cdn.prismic.io/minsung/aiDiPgeQX7-eWtW4_%ED%95%98%EC%9D%B4%ED%8C%8C%EC%9D%B4%EB%B8%8C-%EC%B5%9C%EC%A2%85-.mp4",
  danceVideo:
    "https://minsung.cdn.prismic.io/minsung/aiDhDgeQX7-eWtV8_%EC%9C%A8%EB%8F%99-%EC%B5%9C%EC%A2%85-.mp4",
  map: "https://images.prismic.io/woolimi/ad5Y051ZCF7ETL0w_shop-map2.png?auto=format,compress",
};

/** MP4 재생 불가 시 joey/woolimi Prismic GIF로 대체 (로컬 미러 없음) */
const PRISMIC_VIDEO_GIF = {
  hifiveVideo: "hifiveGif",
  danceVideo: "mugunghwa",
  trackingReid: "trackingStart",
  trackingLive: "trackingStart",
};

export const STRINGS = {
  en: {
    meta: {
      titleSuffix: "Physical AI Lab",
      ogTitle: "Joey Lee · walk the Physical AI lab",
      ogDescription:
        "A 3D maze with four stations I actually built — gestures, IoT, ROS vision, real robot high-five. Not a PDF resume.",
    },
    boot: {
      loading: "Warming up the lab…",
      config: "Loading config…",
      maze: "Building the maze…",
      scenes: "Loading 3D scenes…",
      assets: "Caching project media…",
      resume: "Restoring your route — loading everything…",
      ready: "Ready — step in",
    },
    nav: {
      hint: "WASD move · E at gates & exit · 1–{projectLast} open a project · Esc back",
      hudLabel: "LAB",
      questIdle: "Follow the lit corridor — stations {stationFirst}→{stationLast} in order",
      questNext: "Head to Station {order}: {title}",
      questNextShort: "Station {order} · {title}",
      questNear: "Press E — Station {order}: {title}",
      questExit: "All clear · E — journey log",
      questLocked: "Complete station {order} first ({title})",
      questExitLocked: "Visit all {projectCount} stations before the exit",
      questProgress: "Stations cleared {n}/{projectCount}",
      questProgressShort: "{n}/{projectCount}",
      lang: "한국어",
      back: "Back to lab",
      visualCaption: "3D · drag to orbit · W/S scroll the panel",
      scrollHint: "W ↑ · S ↓ · scroll for more",
      scrollHintTouch: "Swipe to scroll",
      hintTouch: "Joystick (move) · Enter (E) · menu (≡)",
      mobileJoystickLabel: "Move",
      mobileInteract: "Open station",
      mobileInteractLabel: "Enter",
      visualCaptionTouch: "3D · drag to orbit · swipe to scroll",
      menuOpen: "Open menu",
      menuClose: "Close menu",
      menuTitle: "Projects & controls",
      detail3dShow: "Show 3D",
      detail3dHide: "Hide 3D",
    },
    intro: {
      eyebrow: "",
      role: "Physical AI · robotics · vision-UI",
      lead: "Walk a **3D maze** through four **Addinedu Physical AI** projects — **{stationFirst}→{stationLast}** in order. Each station shows **only what I shipped**: gestures, IoT, ROS vision, and browser teleop.",
      returnWelcome:
        "Your maze position and station progress are saved — pick up where you left off.",
      touchNote: "Mobile: **joystick** to move · **Enter (E)** to open · **menu (≡)** for status & projects",
      edu: "",
      controlsTitle: "How to explore (simple)",
      controls: [
        { keys: "W A S D", label: "Walk — hold keys to move" },
        { keys: "E", label: "Open doors, projects, and the exit" },
        { keys: "1 – {projectLast}", label: "Jump to a project (after you unlock it)" },
        { keys: "Esc", label: "Close any panel and go back to the maze" },
      ],
      stationsLabel: "Four stations · proof of work",
      cta: "Start walking",
      skip: "Skip intro",
      languageLabel: "Language",
    },
    about: {
      profileImage: "assets/about/profile.jpg",
      sectionTitle: "About me",
      role: "Physical AI · robotics · vision-UI",
      bio: "I build **Physical AI** stacks — cameras in **PyQt** or the browser, **sim/bench** before hardware when I can. From **Gesto** gestures to **ROS 2** follow mode and **EduPing** teleop, I wire **vision → UI → robot**. **3D** layout sense still shapes how I place panels and maze stations.",
      strengths: [
        "**Sim/bench** first, then on-robot",
        "**MediaPipe**, **YOLO/ByteTrack/ReID**, **D435** in the browser",
        "**ROS 2**, **TRAC-IK**, dual-arm teleop, **IK/FK** tuning",
      ],
      galleryTitle: "Clips",
      artLinkIntro: "Older **game/3D** art — separate page, link below.",
      media: [
        {
          type: "gif",
          src: "PRISMIC_HIFIVE_REAL",
          caption: "EduPing — real high-five on OpenArm",
        },
        { type: "gif", src: "PRISMIC_HIFIVE", caption: "High-five demo (depth + arm)" },
        { type: "gif", src: "PRISMIC_SIM", caption: "Browser IK sim — blue/red target balls" },
        {
          type: "gif",
          src: "PRISMIC_GESTO_WORKING",
          caption: "Gesto — gesture game / presenter mode",
        },
      ],
      artLinkLabel: "3D art portfolio",
      finish: "Thanks for walking through",
    },
    journey: {
      eyebrow: "EXIT · ABOUT & JOURNEY",
      title: "2 · What I learned",
      aboutSectionTitle: "1 · About me",
      subtitle:
        "Read **about me** above first — below is the **journey log** from Addinedu **Physical AI** (2025–2026)",
      bootcamp:
        "**Jan→Jun 2026** at **Addinedu**: DL **Gesto** (threaded **PyQt6 + MediaPipe/LSTM**), IoT **Wizard of Parking** (**ESP32 UDP/TCP** + operator UI), ROS **ShopPinkki** (**YOLOv8/ByteTrack/ReID** on **Nav2**), PAI **pingdergarten** (**Vue/Three.js** + **D435→TRAC-IK→FK** on **OpenArm**). Team decks & GitHub repos are linked below — numbers come from our **PPTX/PDF** metrics and my org-repo commits.",
      scrollHint: "Scroll down for more · keyboard **W** up · **S** down · mouse wheel",
      scrollHintTouch: "Swipe up or down to read everything",
      myRoleLabel: "My role",
      deckLabel: "Team deck",
      sourcesTitle: "Sources",
      sources: [
        {
          label: "GitHub · **joey114132**",
          url: `https://github.com/${SITE.github.username}`,
        },
        {
          label: "Gesto team presentation (Google Slides)",
          url: SITE.links.gestoDeck,
        },
        {
          label: "Wizard of Parking team deck (오주의 마법사 PPTX · Prismic)",
          url: SITE.links.iotDeck,
        },
        {
          label: "ShopPinkki team deck (삥끼랩 PPTX → web)",
          url: SITE.links.shopPinkkiDeck,
        },
        {
          label: "pingdergarten final slides (EduPing team)",
          url: SITE.links.pingdergartenDeck,
        },
      ],
      milestonesTitle: "Milestones",
      milestones: [
        {
          key: "dl",
          date: "Jan 2026 · DL Team 4",
          summary:
            "**Gesto** — hands-free **PPT/YouTube** via **MediaPipe**, **LSTM**, **PyQt6**, plus **Rat Labyrinth**",
          myRole:
            "**PyQt6 UI** (~1,600+ lines), **MediaPipe→LSTM** wiring, **LSTM dataset** + partial training, **Rat Labyrinth** mode — **14 commits** on `deeplearning-repo-4`",
          deck: SITE.links.gestoDeck,
          learned:
            "Worker threads for **camera/trigger/detection**; **6,276** `.npy` sequences (**30×21×3**); team deck **~74% avg F1**, **Swipe Left ~0.89** after **LSTM v1→v4**",
        },
        {
          key: "iot",
          date: "Feb 2026 · IoT Team 2",
          summary:
            "**Wizard of Parking** — miniature **rotary smart-parking tower** with **ESP32**, **LPR**, and **PyQt6** control room",
          myRole:
            "**ESP32** parking-guide firmware (**UDP/TCP**, **33-byte** packets), then final-week **PyQt** operator UI — multi-cam, **PaddleOCR LPR** dialogs, webcam recovery",
          deck: SITE.links.iotDeck,
          learned:
            "Merged tower + gate + LPR into one timeline; manual LPR override when angles fail; team deck **~94.3%** plate read, **TC all pass**, **±2 mm** lift",
        },
        {
          key: "ros",
          date: "Mar–Apr 2026 · ROS Team 2 (삥끼랩)",
          summary:
            "**ShopPinkki** — **ROS 2** **Pinky Pro** owner-follow in a miniature mart (**YOLOv8**, **ByteTrack**, **ReID**)",
          myRole:
            "Owner-tracking **perception stack** — detect/track/**ReID**, **Safe-ID** lock, **NCNN** export tests; **9 commits** on `ros-repo-2`",
          deck: SITE.links.shopPinkkiDeck,
          learned:
            "**5-frame Safe-ID** after lock; **OSNet→MobileNetV3** + HSV fallback when people cross; E2E latency tuned on mart recordings (deck slides)",
        },
        {
          key: "pai",
          date: "Apr–Jun 2026 · Team EduPing",
          summary:
            "**pingdergarten / EduPing** — kindergarten assistant: browser teleop, **OpenArm**, **Vue/Three.js**, **ROS 2**",
          myRole:
            "Final deck: **commute + high-five**, **Mugunghwa**, **daily report** pages; **robot-web** UX, **D435** stream, **TRAC-IK/FK** loop — **37 commits** on `physical-ai-repo-2`",
          deck: SITE.links.pingdergartenDeck,
          learned:
            "**D435 zstd WS → browser point cloud → TRAC-IK → FK residual**; miss **~28 cm → ~2 cm** on **OpenArm**; **MuJoCo** twin before hardware",
        },
      ],
      learnedTitle: "Skills I took away",
      learned: [
        "**PyQt6 + worker threads** — keep vision inference off the UI thread (Gesto, IoT control room)",
        "**Gesture & LSTM pipelines** — **MediaPipe 21-pt → 30-frame window**, dataset tooling, **pynput** action mapping",
        "**Embedded comms** — **ESP32 UDP/TCP**, device packets, gate/tower integration in one operator timeline",
        "**ROS 2 perception** — **YOLO + ByteTrack + ReID**, topic timing, mart-footage latency profiling",
        "**Sim→real teleop** — **RealSense in browser**, **TRAC-IK/FK** residual tuning, **URDF** in **Three.js**",
        "**3D spatial layout** → maze stations, robot panels, teleop UX",
      ],
      presentTitle: "Now",
      present: [
        "Polish **live demos** and this **interactive portfolio**",
        "Keep iterating **EduPing** — depth UX, dance playback, attendance flows",
        "Write down **sim→real** patterns while the capstone is fresh",
      ],
      futureTitle: "Next up",
      future: [
        "**ROS / MoveIt** — reproducible sim first, then wire to hardware",
        "**Small open-source contributions** when something is worth sharing",
        "**Teleop & vision UI** on teams — build and integrate, not run a startup",
      ],
      manifesto:
        "I am not a portfolio agency. This is a **lab log** you walk — bugs, team credit, and the ugly **sim→real** bits included.",
      close: "Return to maze",
    },
    exit: {
      cutscenePhase: "EXIT ARCH",
      cutsceneTitle: "About & journey",
      labelSub: "JOURNEY LOG",
    },
    hero: {
      eyebrow: "LAB LOG · {projectCount} STATIONS",
      role: "Physical AI · robotics · vision-UI",
      tagline:
        "**{projectCount}** stations · **{stationFirst}→{stationLast}** in order · exit for the journey log",
      labNotes: [
        "FIELD NOTE · if the maze stutters, your GPU is actually working",
        "FIELD NOTE · sim first, robot second — still my religion",
        "FIELD NOTE · every panel is something I touched, not the whole team deck",
        "FIELD NOTE · exit arch unlocks after all four gates — no speedrun skips",
        "FIELD NOTE · 3D layout sense → teleop panels, still",
      ],
    },
    panel: {
      role: "My role",
      brief: "What it is",
      whyJoined: "Why I joined this team",
      myWork: "What I shipped",
      contributions: "What I built",
      skills: "Skills",
      techniques: "Techniques & approach",
      obstacles: "What blocked us",
      outcomes: "What shipped",
      visualAids: "Visual reference",
      stack: "Tech stack",
      links: "Links",
      deck: "Team deck",
      repo: "GitHub",
      gallery: "Gallery & demos",
      close: "Close",
    },
    projects: {
      dl: {
        phase: "01 · Deep Learning",
        title: "Gesto",
        subtitle: "MediaPipe + LSTM Hand Gesture PC Control",
        team: "DL Team 4 · {repo}",
        metaLine: "29 Jan – 6 Feb 2026 · LLM robot interaction · team of 6 · GitHub: {github}",
        deckLabel: "Team presentation",
        highlights: [
          "Webcam gestures → **PPT / YouTube** without keyboard or mouse",
          "**PyQt6** UI ~1,600+ lines — live feed, modes, gauge, **worker threads**",
          "Built much of the **LSTM dataset**; **partial model training** with the team",
          "Final deck **~74% avg F1** after **LSTM v1→v4**",
        ],
        brief:
          "Hands-free **PowerPoint** and **YouTube** from a webcam — **MediaPipe**, **LSTM**, **PyQt6**, plus a **Rat Labyrinth** game mode.",
        whyJoined:
          "The DL team was shipping a **live demo**, not a notebook — I wanted **hands-free** control from the webcam, and there was a clear slot for **PyQt**, **dataset tooling**, and **threading**.",
        myWork: [
          "**PyQt6** desktop shell ~**1,600** LOC · **worker-thread** architecture",
          "**MediaPipe → LSTM → pynput** pipeline",
          "**LSTM dataset** · **6,276** sequences",
          "**Rat Labyrinth** · **14 commits** (deeplearning-repo-4)",
        ],
        summary:
          "Hands-free **PowerPoint** and **YouTube** from a webcam — **MediaPipe**, **LSTM**, **PyQt6**, plus a **Rat Labyrinth** game mode.",
        rolePoints: [
          "**PyQt6** + **MediaPipe→LSTM** pipeline (trigger, modes, thresholds)",
          "**LSTM dataset** collection + **partial training**",
          "**Rat Labyrinth** game mode",
        ],
        contributions: [
          "**ModeController** maps gestures to keyboard output via **pynput**.",
          "**MediaPipe + LSTM** — trigger on/off, per-mode detection, confidence thresholds.",
          "**PyQt6 UI** (~1,600+ lines): webcam, modes, gauge; **worker threads** keep UI responsive.",
          "**LSTM dataset**: `.npy` format (**30×21×3**), collection tooling, team manual.",
          "Trained **LSTM v1→v4** checkpoints partway — real training runs, shared with team.",
          "**Rat Labyrinth** in the gesture registry for the game demo.",
          "QA on **trigger**, **PPT**, and **YouTube** before the final.",
        ],
        skills: [
          {
            category: "Languages & frameworks",
            items: ["Python 3.10", "PyQt6", "OpenCV", "pynput"],
          },
          {
            category: "ML / vision",
            items: [
              "MediaPipe Hands",
              "LSTM sequence classifier",
              "11-dim landmark features",
              "Dataset collection & labeling",
              "Partial LSTM training",
            ],
          },
          {
            category: "Software design",
            items: [
              "Gesture registry + action mapper",
              "Mode state machine",
              "Thread-safe UI updates",
            ],
          },
        ],
        techniques: [
          "**21 landmarks** → **30-frame** window → **LSTM**; optional **11-D features**.",
          "**Camera / trigger / detection** on worker threads — UI stays responsive.",
          "**Gesture registry** → **pynput** per **PPT**, **YouTube**, or game mode.",
        ],
        obstacles: [
          {
            title: "Messy **training data** at first",
            body: "Collection framework + manual; re-recorded **6,276 sequences** with **30-frame** interpolation.",
          },
          {
            title: "**UI froze** during inference",
            body: "Moved **camera, trigger, detection** off the UI thread — matches our sequence diagram.",
          },
          {
            title: "Some gestures learned late",
            body: "More data + **LSTM v1→v4**; deck **~74% avg F1**, **Swipe Left ~0.89**.",
          },
        ],
        outcomes: [
          "Final demo: **PPT + YouTube + Rat Labyrinth**, webcam only.",
          "Team deck — architecture, **11-D features**, **F1** plots.",
          "**PyQt + MediaPipe** layout kept after class.",
        ],
        visualAids: [
          {
            type: "flow",
            title: "Recognition pipeline",
            steps: ["Webcam", "MediaPipe 21 pts", "30-frame buffer", "LSTM (11-D)", "pynput"],
            caption: "Team deck — landmarks, then 30-frame LSTM.",
          },
          {
            type: "diagram",
            src: "assets/gesto/deck-sequence.png",
            title: "Runtime sequence",
            caption: "Both-hands-open trigger → detection on → gesture actions to UI.",
          },
          {
            type: "diagram",
            src: "assets/gesto/deck-arch.png",
            title: "System architecture",
            caption: "Camera + main app on the user PC (team deck).",
          },
        ],
        stack: ["Python", "PyQt6", "MediaPipe", "LSTM", "OpenCV", "pynput", "Threading"],
        media: [
          {
            type: "gif",
            src: "PRISMIC_GESTO_PPT",
            caption: "PPT mode — next/prev slide & fullscreen gestures",
          },
          { type: "gif", src: "PRISMIC_GESTO_WORKING", caption: "Detection armed — LSTM → pynput" },
          {
            type: "gif",
            src: "PRISMIC_GESTO_YOUTUBE",
            caption: "YouTube mode — transport, volume, fullscreen",
          },
          {
            type: "gif",
            src: "PRISMIC_GESTO_TRIGGER",
            caption: "Trigger gesture — start/stop motion recognition",
          },
          {
            type: "gif",
            src: "PRISMIC_GESTO_NOT_WORKING",
            caption: "Idle until trigger — prevents false fires",
          },
          {
            type: "image",
            src: "assets/gesto/deck-demo-ui.png",
            caption: "Team deck — game / YouTube PyQt shell",
          },
          {
            type: "image",
            src: "assets/gesto/deck-pipeline.png",
            caption: "Team deck — landmarks → 30-frame LSTM",
          },
          {
            type: "image",
            src: "assets/gesto/deck-features-11d.png",
            caption: "Team deck — 11-D feature expansion",
          },
          {
            type: "image",
            src: "assets/gesto/deck-results.png",
            caption: "Team deck — LSTM F1 (~74% avg)",
          },
          {
            type: "image",
            src: "assets/gesto/deck-sequence.png",
            caption: "Team deck — camera / trigger / detection threads",
          },
          { type: "image", src: "assets/gesto/deck-arch.png", caption: "Team deck — architecture" },
          { type: "image", src: "assets/gesto/deck-team.png", caption: "Team deck — who did what" },
          {
            type: "image",
            src: "PRISMIC_GESTO_MEDIAPIPE",
            caption: "MediaPipe overlay in the operator UI",
          },
          {
            type: "image",
            src: "assets/gesto/ui.jpg",
            caption: "Gesto control shell — modes, sensitivity, gesture status",
          },
          {
            type: "image",
            src: "assets/gesto/page-115.png",
            caption: "Swipe-right trajectory overlays (collection QA)",
          },
          { type: "image", src: "assets/gesto/landmarks.png", caption: "21-landmark vocabulary" },
        ],
      },
      iot: {
        phase: "02 · IoT",
        title: "Wizard of Parking",
        subtitle: "오주의 마법사 — Smart tower parking (APS)",
        team: "IoT Team 2 · {repo}",
        metaLine: "23 Feb – 4 Mar 2026 · IoT robotics integration · team of 6 · ESP32-CAM + PyQt6",
        highlights: [
          "Miniature **rotary parking tower** — **ESP32-CAM**, gates, tower lift",
          "Early **UDP/TCP comms**: multi-cam GUI, **33-byte packets**, parking-guide **firmware**",
          "**PyQt control room** — **PaddleOCR LPR** dialogs, device client, webcam stability",
          "Team deck: **~94.3%** plate read, **TC pass**, **±2 mm** lift",
        ],
        brief:
          "Miniature **rotary smart-parking tower** — **3× ESP32** firmware, **LPR**, and a **PyQt6** control room for the full park-and-pay flow.",
        whyJoined:
          "IoT Team 2 ran a rotary **physical model** with **3 ESP32s** and **FastAPI**. I wanted to own **33-byte TCP** tower state into the **PyQt control room**; when the control-room schedule slipped, I took **IR guidance firmware · multi-cam UI · LPR verify window** through demo day.",
        myWork: [
          "**ESP32** parking-guide firmware — **33-byte** packets, **UDP/TCP**",
          "**PyQt6** control room — multi-cam, **LPR** dialogs, gate UI",
          "**Webcam recovery** on demo laptops",
          "Team deck **~94.3%** plate read",
        ],
        summary:
          "Miniature **rotary smart-parking tower** — **ESP32** firmware, **LPR**, and a **PyQt6** control room for the full park-and-pay flow.",
        rolePoints: [
          "**ESP32** parking-guide firmware + **UDP/TCP** comms layout",
          "**PyQt** control room — multi-cam, **LPR** dialogs, device client",
          "**PaddleOCR** validation UI before automation",
        ],
        contributions: [
          "**ESP32** parking-guide firmware — **IR zones**, **WiFi TCP**, **PING/PONG**, LCD.",
          "Multi **ESP32-CAM UDP** path + **33-byte** device packet format.",
          "**PyQt6** operator UI: multi webcam panels, connection state, transmission manager.",
          "Enter/exit **LPR** test dialogs — catch bad reads before automation.",
          "Fixed **webcam drops** on demo laptops (USB re-enumeration, **OpenCV**, retry).",
        ],
        skills: [
          {
            category: "Desktop / vision",
            items: ["PyQt6 layouts", "OpenCV VideoCapture", "PaddleOCR LPR", "LPR validation UI"],
          },
          { category: "Backend (team)", items: ["FastAPI REST", "MySQL / SQLAlchemy (14 tables)"] },
          {
            category: "Embedded interface",
            items: ["ESP32-CAM UDP", "Arduino gates & stepper tower", "Device-client protocols"],
          },
        ],
        techniques: [
          "**PyQt** ↔ team **FastAPI**; cameras on **UDP**; devices on **33-byte TCP**.",
          "Camera read on **worker threads** — HMI stays responsive.",
          "Manual **PaddleOCR LPR** override when the plate angle is bad.",
        ],
        obstacles: [
          {
            title: "**Webcam** died during integration",
            body: "Retry + device index scan + warning UI — saved live **TR** runs.",
          },
          {
            title: "Too many windows",
            body: "Merged tower, gate, guide into one **PyQt** timeline.",
          },
          {
            title: "**LPR** wrong at shallow angles",
            body: "Snapshot review + manual override; team middleware hit **~94%** on the lot.",
          },
        ],
        outcomes: [
          "Integration demo: **plate in → slot → tower → pay → exit** on the mini lot.",
          "**TC matrix** all pass; technical report **TR1/TR2**.",
          "Real prototype + team deck slides in the gallery.",
        ],
        visualAids: [
          {
            type: "flow",
            title: "Parking flow (SR)",
            steps: ["Entry LPR", "Slot assign", "IR guide", "Tower lift", "Billing", "Exit gate"],
            caption: "Mini lot — ESP32 gates + PyQt control room.",
          },
          {
            type: "diagram",
            src: "assets/iot/deck-architecture.png",
            title: "3-tier architecture",
            caption: "Team deck — PyQt6 / FastAPI / ESP32·Arduino.",
          },
          {
            type: "diagram",
            src: "assets/iot/deck-overview.png",
            title: "System overview",
            caption: "ESP32-CAM · FastAPI · PyQt6 · MySQL stack.",
          },
        ],
        stack: [
          "ESP32-CAM",
          "Arduino",
          "FastAPI",
          "PyQt6",
          "OpenCV",
          "PaddleOCR",
          "MySQL",
          "UDP/TCP",
        ],
        media: [
          {
            type: "video",
            src: "assets/iot/image69.webm",
            caption: "Tower control UI — plate assign, lift log (team deck)",
          },
          {
            type: "video",
            src: "assets/iot/image70.webm",
            caption: "Gate + tower coordination — end-to-end rehearsal",
          },
          {
            type: "gif",
            src: "assets/iot/image57.gif",
            caption: "PyQt6 SMART PARKING admin dashboard (team deck)",
          },
          {
            type: "gif",
            src: "assets/iot/gate.gif",
            caption: "Entry gate — barrier open/close rehearsal",
          },
          {
            type: "gif",
            src: "assets/iot/image66.gif",
            caption: "Rotary tower lift — mechanical simulation",
          },
          { type: "gif", src: "assets/iot/image50.gif", caption: "Tower lift sequence" },
          { type: "gif", src: "assets/iot/image40.gif", caption: "LPR enter / exit validation UI" },
          {
            type: "image",
            src: "assets/iot/pyqt-cam-capture.jpg",
            caption: "ESP32-CAM UDP preview in PyQt (Z20260302 repo capture)",
          },
          {
            type: "image",
            src: "assets/iot/pyqt-admin-ui.png",
            caption: "Operator UI during integration demo week",
          },
          {
            type: "image",
            src: "assets/iot/deck-overview.png",
            caption: "Team deck — system overview",
          },
          {
            type: "image",
            src: "assets/iot/deck-architecture.png",
            caption: "Team deck — 3-tier stack",
          },
          {
            type: "image",
            src: "assets/iot/deck-features.png",
            caption: "Team deck — feature list",
          },
          {
            type: "image",
            src: "assets/iot/deck-testing.png",
            caption: "Team deck — TC tests (all pass)",
          },
          {
            type: "image",
            src: "assets/iot/deck-metrics.png",
            caption: "Team deck — LPR %, lift error, DB",
          },
          {
            type: "image",
            src: "assets/iot/deck-hardware.png",
            caption: "Team deck — hardware photo",
          },
          { type: "image", src: "assets/iot/deck-erd.png", caption: "Team deck — MySQL ERD" },
          {
            type: "image",
            src: "assets/iot/hero.jpg",
            caption: "Wizard of Parking — physical demo layout",
          },
          {
            type: "image",
            src: "assets/iot/system.jpg",
            caption: "Architecture & data flow (team diagram)",
          },
          {
            type: "image",
            src: "assets/iot/image18.jpg",
            caption: "Miniature lot — gates and operator screens",
          },
          {
            type: "image",
            src: "assets/iot/image34.png",
            caption: "ESP32 gate wiring & bench test",
          },
        ],
      },
      ros: {
        phase: "03 · ROS",
        title: "ShopPinkki",
        subtitle: "Autonomous Mart Cart (쑈삥끼)",
        team: "ROS Team 2 · {repo}",
        metaLine: "3 Apr – 14 Apr 2026 · AI autonomous driving · Pinky Pro differential drive",
        highlights: [
          "**Owner tracking** on **Pinky Pro** for the mini-mart follow demo",
          "**YOLOv8 + ByteTrack + ReID** with **5-frame Safe-ID** lock",
          "**ReID** swap: **OSNet → MobileNetV3** + color fallback; **NCNN** on **Pi 5**",
          "**Latency** profiling on mart recordings; thresholds from deck slides",
        ],
        brief:
          "**ROS 2** **Pinky Pro** mart cart — **owner follow** with **YOLOv8**, **ByteTrack**, and **ReID** in a miniature store.",
        whyJoined:
          "My first **perception → navigation** stretch — I wanted to **keep the owner** in mart footage and own **perception tuning** on the team.",
        myWork: [
          "**YOLO → ByteTrack → ReID** follow pipeline",
          "**5-frame Safe-ID** lock",
          "**MobileNetV3 ReID** + **NCNN** export tests",
          "**9 commits** on ros-repo-2",
        ],
        summary:
          "**ROS 2** **Pinky Pro** mart cart — **owner follow** with **YOLOv8**, **ByteTrack**, and **ReID** in a miniature store.",
        rolePoints: [
          "**YOLOv8 + ByteTrack** in the **ROS** perception graph",
          "**Safe-ID lock** + **ReID** backbone swap (**MobileNetV3**)",
          "Mart-footage **latency** profiling; **NCNN** export tests",
        ],
        contributions: [
          "**Owner tracking**: **YOLOv8** + CNN **ReID** + IoU; **Safe-ID** after **5 frames**.",
          "**ReID** redone — **MobileNetV3** + color fallback; **NCNN** quantize for **Pi 5**.",
          "**ByteTrack** integrated into the **ROS** perception graph.",
          "**E2E delay** on recorded mart runs; thresholds tuned on deck footage.",
          "On-robot **LCD/QR** layout for the final demo.",
        ],
        skills: [
          { category: "ROS 2", items: ["Jazzy", "Perception nodes", "Topic timing analysis"] },
          {
            category: "Vision / ML",
            items: ["YOLOv8", "ByteTrack", "torchreid OSNet", "NCNN export"],
          },
          {
            category: "Systems",
            items: ["Latency profiling", "Multi-camera sync", "On-robot UI layout"],
          },
        ],
        techniques: [
          "**Detect → track → ReID**; thresholds tuned on mart footage.",
          "**Safe-ID** skips **ReID** until lock breaks — saves **Pi** compute.",
          "**NCNN** export for on-cart inference experiments.",
        ],
        obstacles: [
          {
            title: "**ID swap** when people crossed",
            body: "Bigger **ReID** backbone + track lifecycle tuning on loop recordings.",
          },
          {
            title: "Lag made tracking feel late",
            body: "Pipeline delay on mart recordings; tighter thresholds + **Safe-ID**.",
          },
          {
            title: "Doll shelf false positives",
            body: "Separate **YOLO** class + smaller **ROI** for doll tests.",
          },
        ],
        outcomes: [
          "Follow mode stable for the team’s integrated mart video.",
          "Perception section in **shoppinkki.pdf**.",
          "**NCNN** weights for edge board tries.",
        ],
        visualAids: [
          {
            type: "flow",
            title: "Perception stack",
            steps: ["RGB camera", "YOLOv8 detect", "ByteTrack", "ReID match", "Safe-ID lock"],
            caption: "What I built: tracker + ReID stability.",
          },
          {
            type: "diagram",
            src: "assets/shop/arch.png",
            title: "ShopPinkki architecture",
            caption: "ROS graph from shoppinkki.pdf.",
          },
          {
            type: "diagram",
            src: "assets/shop/demo.jpg",
            title: "Mart demo floor",
            caption: "Pinky Pro in miniature store.",
          },
        ],
        stack: ["ROS 2 Jazzy", "YOLOv8", "ByteTrack", "torchreid", "MobileNetV3", "NCNN", "OpenCV"],
        media: [
          {
            type: "video",
            src: "PRISMIC_FINAL_DEMO",
            caption: "Integrated mart run — Pinky Pro final demo",
          },
          {
            type: "video",
            src: "PRISMIC_TRACKING_REID",
            caption: "YOLO + ByteTrack + ReID on mart footage",
          },
          {
            type: "video",
            src: "PRISMIC_SHOP_GUIDE",
            caption: "In-store guiding — follow shopper to aisle",
          },
          {
            type: "video",
            src: "PRISMIC_SHOP_LLM_GUIDE",
            caption: "LLM-assisted product guide on mart map",
          },
          {
            type: "video",
            src: "PRISMIC_SHOP_RETURN",
            caption: "Return-to-base after checkout flow",
          },
          {
            type: "video",
            src: "PRISMIC_SHOP_PAYMENT",
            caption: "Payment / checkout station demo",
          },
          {
            type: "video",
            src: "PRISMIC_SHOP_WAITING",
            caption: "Waiting zone — customer hand-off",
          },
          {
            type: "video",
            src: "PRISMIC_SHOP_SHOPPING_LIST",
            caption: "Shopping-list driven pick route",
          },
          { type: "video", src: "PRISMIC_TRACKING", caption: "Tracking pipeline — live rehearsal" },
          {
            type: "video",
            src: "PRISMIC_GUIDING",
            caption: "Guiding mode — alternate rehearsal capture",
          },
          {
            type: "video",
            src: "PRISMIC_SHOP_GUIDE_ADMIN",
            caption: "Guide admin / map configuration UI",
          },
          { type: "gif", src: "PRISMIC_TRACKING_START", caption: "Tracking session start" },
          { type: "gif", src: "PRISMIC_SHOP_REGISTER", caption: "Customer register / QR pairing" },
          { type: "image", src: "assets/shop/demo.jpg", caption: "Miniature mart floor setup" },
          {
            type: "image",
            src: "assets/shop/page-014.png",
            caption: "ByteTrack + ReID pipeline slides",
          },
          {
            type: "image",
            src: "assets/shop/page-027.png",
            caption: "YOLO / tracking tuning notes",
          },
          { type: "image", src: "assets/shop/page-048.png", caption: "On-robot LCD & QR layout" },
          { type: "image", src: "PRISMIC_MAP", caption: "Mart zone map" },
          {
            type: "image",
            src: "assets/shop/arch.png",
            caption: "ROS perception & navigation architecture",
          },
          {
            type: "image",
            src: "assets/shop/hero.jpg",
            caption: "ShopPinkki overview (shoppinkki.pdf)",
          },
        ],
      },
      pai: {
        phase: "04 · Physical AI",
        title: "pingdergarten",
        subtitle: "EduPing — Kindergarten Assistant Robot",
        team: "Team EduPing · {repo}",
        metaLine: "23 Apr – 4 Jun 2026 · Physical AI robotics · ~68 commits ({github})",
        highlights: [
          "**Depth high-five**: browser hand → **TRAC-IK** loop; miss **~20–28 cm → ~2 cm**",
          "**MuJoCo twin** before real **OpenArm** demo",
          "**Vue + Three.js** robot web — live **D435** cloud, attendance, dance UI",
          "Final **Q&A pages** I wrote (commute, **Mugunghwa**, portal)",
        ],
        brief:
          "Kindergarten assistant **pingdergarten** — **high-five**, **attendance**, and **Mugunghwa** rhythm game in the **browser** on **OpenArm**, **Vue/Three.js**, and **ROS 2**.",
        whyJoined:
          "Final **Physical AI** team — I wanted a **browser robot** to matter with **real children** (high-five, attendance, dance). Capstone **vision → UI → robot** after Gesto, IoT, and ROS. The team already had **browser teleop** and an **OpenArm** slot that matched my **3D/UI** background.",
        myWork: [
          "**High-five** — D435 depth → **TRAC-IK** + **FK** residual (**~28 cm → ~2 cm**)",
          "**Mugunghwa** — red-light-green-light game shell, beat sync, record UI, motion+audio WS playback",
          "**Attendance** · **O/X quiz** UI + portal **daily report** Q&A pages",
          "**Vue 3 + Three.js** — **D435** zstd WebSocket point cloud · ~**68 commits**",
        ],
        summary:
          "Kindergarten assistant **pingdergarten** — **high-five**, **attendance**, and **Mugunghwa** rhythm game in the **browser** on **OpenArm**, **Vue/Three.js**, and **ROS 2**.",
        rolePoints: [
          "**High-five** closed loop + **Mugunghwa** game shell & dance playback (~**68 commits**)",
          "**Depth WebSocket**, **MediaPipe** hands, **TRAC-IK** residual fix",
          "**Attendance** · **O/X quiz** UI + final **Q&A** pages (commute, Mugunghwa, portal)",
        ],
        contributions: [
          "**High-five**: **D435** zstd WS → browser **point cloud** → **TRAC-IK** + **FK residual** loop.",
          "Left arm **IK mirror-solve** on right **TRAC-IK** group when left shoulder could not open.",
          "**Vue 3 + Three.js** robot web: depth tab, **URDF GLB**, **Z-up→Y-up** fix.",
          "**Attendance** UI — face detect + greeting trigger.",
          "**Mugunghwa** — game shell (`MugunghwaGame.vue`), **RecorderControls** motion capture, `/dance/{slug}/stream` motion+audio sync; emotion capture for portal photos.",
          "**MuJoCo twin** for reach checks; **D435** streamer on system Python (**cv_bridge** ABI fix).",
          "Korean **Q&A** slides for final presentation.",
        ],
        skills: [
          {
            category: "Frontend",
            items: ["Vue 3", "Three.js", "Web Workers", "WebRTC datachannel", "TypeScript"],
          },
          {
            category: "Vision",
            items: ["MediaPipe Hands", "Depth deprojection", "Face detection", "GLSL point clouds"],
          },
          {
            category: "Robotics",
            items: ["ROS 2 Jazzy", "TRAC-IK", "MuJoCo twin", "Joint-limit tuning"],
          },
          {
            category: "Delivery",
            items: ["DAE→GLB mesh pipeline", "Prismic asset pipeline", "Presentation report pages"],
          },
        ],
        techniques: [
          "**Depth + MediaPipe** → **TRAC-IK** → **FK residual** → joint cmd (closed loop).",
          "Browser **depth view** is calibration truth; **MuJoCo** mesh follows it.",
          "**MediaPipe** on main thread; **zstd** decode in a **Worker**.",
        ],
        obstacles: [
          {
            title: "**IK** solved but palm still missed",
            body: "**FK feedback loop** + shoulder height cap; reach box from real measurements.",
          },
          {
            title: "**Depth view** froze",
            body: "**cv_bridge** NumPy ABI under conda — **D435** streamer on system Python.",
          },
          {
            title: "**URDF** slow / upside-down",
            body: "**DAE → GLB**; one **Z-up → Y-up** on root (double rotation was a bug).",
          },
          {
            title: "**moveit_servo** hung on Jazzy",
            body: "Smoothed **JointTrajectory** workaround while tracking upstream **PSM** deadlock.",
          },
        ],
        outcomes: [
          "Real **high-five** on hardware — gallery video.",
          "Browser runs **depth + attendance + dance** playback.",
          "**Q&A** pages shipped for the final.",
          "Same **URDF** orientation fix reused in this portfolio maze.",
        ],
        visualAids: [
          {
            type: "flow",
            title: "High-five closed loop",
            steps: [
              "D435 depth",
              "Hand landmark",
              "IK target",
              "TRAC-IK",
              "FK residual",
              "Joint command",
            ],
            caption: "The browser depth view is the calibration source of truth.",
          },
          {
            type: "diagram",
            src: "PRISMIC_CLOUD",
            title: "Depth point cloud (browser)",
            caption: "Live D435 stream rendered in Three.js.",
          },
          {
            type: "diagram",
            src: "PRISMIC_SIM",
            title: "IK simulation",
            caption: "Blue/red target balls + reach tuning.",
          },
        ],
        stack: ["Vue 3", "Three.js", "MediaPipe", "ROS 2", "MuJoCo", "WebRTC", "TRAC-IK", "Python"],
        media: [
          {
            type: "video",
            src: "PRISMIC_HIFIVE_VIDEO",
            caption: "EduPing — real high-five demo (full capture)",
          },
          { type: "gif", src: "PRISMIC_HIFIVE", caption: "EduPing high-five demo (GIF)" },
          {
            type: "video",
            src: "PRISMIC_DANCE_VIDEO",
            caption: "EduPing — Mugunghwa rhythm routine playback",
          },
          {
            type: "video",
            src: "PRISMIC_GOGOPING_FOLLOW",
            caption: "GogoPing — teacher follow mode (mobile base)",
          },
          {
            type: "video",
            src: "PRISMIC_GOGOPING_HIDESEEK",
            caption: "GogoPing — hide-and-seek navigation game",
          },
          {
            type: "gif",
            src: "PRISMIC_SIM",
            caption: "IK residual loop — blue/red target balls (GIF)",
          },
          {
            type: "gif",
            src: "PRISMIC_MUGUNGHWA",
            caption: "Mugunghwa rhythm routine — dance recording UI (GIF)",
          },
          { type: "image", src: "PRISMIC_OX", caption: "Attendance O/X vision board" },
          { type: "image", src: "PRISMIC_OXLOCK", caption: "Attendance lock-in confirmation UI" },
          { type: "image", src: "PRISMIC_CLOUD", caption: "Browser D435 point cloud viewer" },
          { type: "image", src: "PRISMIC_MUJOCO", caption: "MuJoCo digital twin" },
          { type: "image", src: "PRISMIC_UI", caption: "EduPing web robot console" },
          {
            type: "image",
            src: "PRISMIC_REPORT",
            caption: "Daily report page (final presentation)",
          },
          { type: "image", src: "PRISMIC_REPORT2", caption: "Timeline & schedule report page" },
        ],
      },
    },
  },
  ko: {
    meta: {
      titleSuffix: "Physical AI 랩",
      ogTitle: "이정우 · 3D Physical AI 랩",
      ogDescription:
        "직접 만진 네 스테이션을 돌아다니는 3D 미로 — 제스처, IoT, ROS 비전, 실물 로봇 하이파이브. PDF 이력서가 아닙니다.",
    },
    boot: {
      loading: "랩을 준비하는 중…",
      config: "설정 불러오는 중…",
      maze: "미로를 만드는 중…",
      scenes: "3D 장면 불러오는 중…",
      assets: "프로젝트 미디어 캐시 중…",
      resume: "이전 경로 복원 — 전체 로딩 중…",
      ready: "준비되었습니다 — 들어가 보시면 됩니다",
    },
    nav: {
      hint: "WASD 이동 · E로 게이트·출구 · 1–{projectLast} 프로젝트 · Esc 뒤로",
      hudLabel: "랩",
      questIdle: "**{stationFirst}→{stationLast}** 스테이션을 순서대로 방문해 주세요",
      questNext: "다음 — 스테이션 {order} · {title}",
      questNextShort: "스테이션 {order} · {title}",
      questNear: "E — 스테이션 {order} · {title}",
      questExit: "네 스테이션 완료 · E — 여정 기록",
      questLocked: "스테이션 {order}·{title}부터 완료해 주세요",
      questExitLocked: "네 스테이션을 모두 방문하신 뒤 출구로 가 주세요",
      questProgress: "스테이션 {n}/{projectCount} 완료",
      questProgressShort: "{n}/{projectCount}",
      lang: "English",
      back: "랩으로 복귀",
      visualCaption: "3D · 드래그 회전 · W/S로 패널 스크롤",
      scrollHint: "W 위 · S 아래 · 더 읽으려면 스크롤",
      scrollHintTouch: "스와이프로 스크롤",
      hintTouch: "조이스틱(이동) · Enter(E) · 메뉴(≡)",
      mobileJoystickLabel: "이동",
      mobileInteract: "스테이션 열기",
      mobileInteractLabel: "Enter",
      visualCaptionTouch: "3D · 드래그 회전 · 스와이프로 스크롤",
      menuOpen: "메뉴 열기",
      menuClose: "메뉴 닫기",
      menuTitle: "프로젝트 · 조작",
      detail3dShow: "3D 보기",
      detail3dHide: "3D 숨기기",
    },
    intro: {
      eyebrow: "",
      role: "Physical AI · 로봇 · 비전-UI",
      lead: "**애드인 Physical AI** 부트캠프 **팀 프로젝트 네 건을** **3D 미로로** 옮긴 포트폴리오입니다. **{stationFirst}→{stationLast}** 순서대로 걷다 보면 **제스처·IoT·ROS 비전·브라우저 teleop이** 이어지고, 각 스테이션에는 **제가 직접 기여한 작업만** 담았습니다.",
      returnWelcome:
        "탐색 위치와 스테이션 진행이 저장되어 있습니다. 미로에서 이어서 진행할 수 있습니다.",
      touchNote: "모바일: **조이스틱**으로 이동 · **Enter(E)** 로 열기 · **메뉴(≡)** 에서 상태·프로젝트",
      edu: "",
      controlsTitle: "조작 방법",
      controls: [
        { keys: "W A S D", label: "걷기 — 키를 누르고 있으면 이동합니다" },
        { keys: "E", label: "문·프로젝트·출구를 엽니다" },
        { keys: "1 – {projectLast}", label: "해금 후 프로젝트로 바로 이동합니다" },
        { keys: "Esc", label: "패널을 닫고 미로로 돌아갑니다" },
      ],
      stationsLabel: "네 스테이션 · 제가 한 일",
      cta: "걷기 시작",
      skip: "소개 건너뛰기",
      languageLabel: "언어",
    },
    about: {
      profileImage: "assets/about/profile.jpg",
      sectionTitle: "자기소개",
      role: "Physical AI · 로봇 · 비전-UI",
      bio: "**Physical AI** 쪽에서 카메라·비전을 **PyQt**나 **브라우저**에 붙이고, 가능하면 **시뮬·벤치**에서 먼저 검증한 뒤 로봇으로 옮깁니다. **Gesto** 제스처부터 **ROS 2** 추적, **EduPing** teleop까지 **비전→UI→로봇을** 이어 붙이고, **3D** 공간 감각은 패널·미로 스테이션 배치에 그대로 씁니다.",
      strengths: [
        "**시뮬·벤치**에서 먼저 확인한 뒤 로봇에 올립니다",
        "**MediaPipe**, **YOLO/ByteTrack/ReID**, 브라우저 **D435**",
        "**ROS 2**, **TRAC-IK**, 듀얼암 **teleop**, **IK/FK** 튜닝",
      ],
      galleryTitle: "영상",
      media: [
        {
          type: "gif",
          src: "PRISMIC_HIFIVE_REAL",
          caption: "EduPing — OpenArm 실물 하이파이브",
        },
        { type: "gif", src: "PRISMIC_HIFIVE", caption: "하이파이브 (뎁스 + 암)" },
        { type: "gif", src: "PRISMIC_SIM", caption: "브라우저 IK 시뮬 — 파란/빨간 볼" },
        { type: "gif", src: "PRISMIC_GESTO_WORKING", caption: "Gesto — 제스처 게임/발표 모드" },
      ],
      artLinkIntro:
        "예전 **게임·3D** 아트 작업은 따로 모아 두었습니다. 아래 링크에서 보실 수 있습니다.",
      artLinkLabel: "3D 아트 포트폴리오",
      finish: "둘러봐 주셔서 감사합니다",
    },
    journey: {
      eyebrow: "출구 · 소개 & 여정",
      title: "2 · 배운 것들",
      aboutSectionTitle: "1 · 자기소개",
      subtitle:
        "위에서 **자기소개를** 먼저 읽어 주세요 — 아래는 애디닝 **Physical AI 부트캠프 여정 기록**입니다",
      bootcamp:
        "**2026.01→06 애디닝**: DL **Gesto**(스레드 **PyQt6+MediaPipe/LSTM**), IoT **오주의 마법사**(**ESP32 UDP/TCP**+**관제 UI**), ROS **쑈삥끼**(**YOLOv8/ByteTrack/ReID**+**Nav2**), PAI **pingdergarten**(**Vue/Three.js**+**D435→TRAC-IK→FK**). 아래 **GitHub·팀 덱 링크** — 수치는 **PPTX/PDF** 지표와 조직 저장소 **제 커밋**에서 가져왔습니다.",
      scrollHint: "아래로 스크롤 · 키보드 **W** 위 · **S** 아래 · 마우스 휠",
      scrollHintTouch: "위아래로 스와이프하시면 전체 내용을 읽으실 수 있습니다",
      myRoleLabel: "제 역할",
      deckLabel: "팀 발표",
      sourcesTitle: "출처",
      sources: [
        {
          label: "GitHub · **joey114132**",
          url: `https://github.com/${SITE.github.username}`,
        },
        {
          label: "Gesto 팀 발표 (Google Slides · DL 4조)",
          url: SITE.links.gestoDeck,
        },
        {
          label: "오주의 마법사 팀 덱 (PPTX · Prismic)",
          url: SITE.links.iotDeck,
        },
        {
          label: "쑈삥끼 팀 덱 (삥끼랩 PPTX → 웹)",
          url: SITE.links.shopPinkkiDeck,
        },
        {
          label: "pingdergarten 최종 슬라이드 (EduPing 팀)",
          url: SITE.links.pingdergartenDeck,
        },
      ],
      milestonesTitle: "마일스톤",
      milestones: [
        {
          key: "dl",
          date: "2026.01 · DL 4조",
          summary:
            "**Gesto** — 웹캠으로 **PPT·YouTube** 핸즈프리 제어(**MediaPipe**·**LSTM**·**PyQt6**, **쥐 미로**)",
          myRole:
            "**PyQt6 UI**(~1,600+ 라인), **MediaPipe→LSTM** 연동, **LSTM 데이터셋** 수집·일부 학습, **Rat Labyrinth** 구현을 맡았습니다(deeplearning-repo-4 · **14 commits**)",
          deck: SITE.links.gestoDeck,
          learned:
            "**카메라·트리거·인식을** 워커 스레드로 분리했습니다. **6,276**개 `.npy` 시퀀스(**30×21×3**)를 모았고, 팀 덱 기준 **평균 F1 ~74%**, **Swipe Left ~0.89**(**LSTM v1→v4**) 달성했습니다",
        },
        {
          key: "iot",
          date: "2026.02 · IoT 2조",
          summary:
            "**오주의 마법사** — 미니 **회전식 스마트 주차 타워**(**ESP32**, **LPR**, **PyQt6** 관제실)",
          myRole:
            "**ESP32** 주차 안내 펌웨어(**UDP/TCP**, **33바이트** 패킷)를 작성했고, 최종 주에는 **PyQt** 관제 UI(멀티캠, **PaddleOCR LPR**, 웹캠 복구)를 담당했습니다",
          deck: SITE.links.iotDeck,
          learned:
            "타워·게이트·LPR을 한 타임라인으로 묶었습니다. 각도가 나쁠 때는 수동 LPR로 보완했고, 팀 덱 기준 번호판 **~94.3%**, **TC 전부 통과**, 리프트 **±2mm** 확인했습니다",
        },
        {
          key: "ros",
          date: "2026.03–04 · ROS 2조 (삥끼랩)",
          summary:
            "**쑈삥끼** — **ROS 2** **Pinky Pro** 미니 마트 **주인 추종**(**YOLOv8**·**ByteTrack**·**ReID**)",
          myRole:
            "주인 추적 **인식 스택**(detect/track/**ReID**, **Safe-ID**, **NCNN** 배포)을 담당했습니다(ros-repo-2 · **9 commits**)",
          deck: SITE.links.shopPinkkiDeck,
          learned:
            "락 이후 **5프레임 Safe-ID** 적용했습니다. 사람이 교차할 때는 **OSNet→MobileNetV3**+HSV 폴백을 썼고, 매장 녹화본으로 E2E 지연을 튜닝했습니다(덱 슬라이드)",
        },
        {
          key: "pai",
          date: "2026.04–06 · 팀 EduPing",
          summary:
            "**pingdergarten / EduPing** — 유치원 보조 로봇(**브라우저 teleop**, **OpenArm**, **Vue/Three.js**, **ROS 2**)",
          myRole:
            "최종 발표(**등하원·하이파이브**, **무궁화꽃**, **일과 보고서**)와 **robot-web** UX, **D435** 스트림, **TRAC-IK/FK** 담당했습니다(physical-ai-repo-2 · **37 commits**)",
          deck: SITE.links.pingdergartenDeck,
          learned:
            "**D435 zstd WS → 브라우저 포인트클라우드 → TRAC-IK → FK 잔차** 파이프라인을 구축했습니다. **OpenArm** 오차를 **~28cm→~2cm**로 줄였고, 하드웨어 전 **MuJoCo** 트윈으로 검증했습니다",
        },
      ],
      learnedTitle: "배워간 기술",
      learned: [
        "**PyQt6**와 **워커 스레드로** 비전 추론을 UI 밖으로 분리하는 방식을 익혔습니다(Gesto, IoT 관제실)",
        "**제스처·LSTM 파이프라인**(**MediaPipe 21점→30프레임**, 데이터셋 도구, **pynput** 액션 매핑)을 다뤘습니다",
        "**임베디드 통신**(**ESP32 UDP/TCP**, 디바이스 패킷)으로 게이트·타워를 한 타임라인에 묶었습니다",
        "**ROS 2 인식**(**YOLO+ByteTrack+ReID**, 토픽 타이밍)과 매장 영상 지연 프로파일링을 수행했습니다",
        "**sim→real teleop**에서 브라우저 **RealSense**, **TRAC-IK/FK** 잔차 튜닝, **Three.js URDF** 연습했습니다",
        "**3D 공간 배치** 감각을 미로 스테이션, 로봇 패널, teleop UX에 적용했습니다",
      ],
      presentTitle: "지금",
      present: [
        "**라이브 데모**와 이 **인터랙티브 포트폴리오를** 계속 다듬고 있습니다",
        "**EduPing**의 뎁스 UX, 댄스 재생, 출석 플로우를 반복 개선하고 있습니다",
        "캡스톤이 생생할 때 **sim→real** 패턴을 문서로 남기고 있습니다",
      ],
      futureTitle: "다음에 해보고 싶은 것",
      future: [
        "**ROS·MoveIt을** 시뮬에서 재현 가능하게 굴린 뒤 실기에 연결해 보고 싶습니다",
        "도움이 되면 **작은 오픈소스 기여**(이슈·문서·패치)를 이어가고 싶습니다",
        "**teleop·비전 UI** 엔지니어링을 팀 안에서 붙이고 다듬는 역할을 맡고 싶습니다",
      ],
      manifesto:
        "포트폴리오 대행이 아닙니다. 걸어 다니는 **랩 기록** — 버그, 팀 크레딧, 지저분한 **sim→real**까지 그대로.",
      close: "미로로 돌아가기",
    },
    exit: {
      cutscenePhase: "출구 아치",
      cutsceneTitle: "소개 & 여정",
      labelSub: "여정 기록",
    },
    hero: {
      eyebrow: "랩 기록 · 스테이션 {projectCount}개",
      role: "Physical AI · 로봇 · 비전-UI",
      tagline:
        "스테이션 **{projectCount}**개 · **{stationFirst}→{stationLast}** 순서대로 · 출구에서 여정 기록",
      labNotes: [
        "현장 메모 · 미로가 버벅이면 GPU가 제대로 일하고 있다는 증거입니다",
        "현장 메모 · 시뮬 먼저, 로봇 나중 — 아직도 제가 지키는 원칙입니다",
        "현장 메모 · 패널마다 제가 손댄 부분만 담았으며, 팀 전체 슬라이드는 아닙니다",
        "현장 메모 · 네 게이트를 모두 거친 뒤 출구로 가야 하며, 스피드런 스킵은 없습니다",
        "현장 메모 · 3D 배치 감각은 teleop 패널에도 그대로 쓰고 있습니다",
      ],
    },
    panel: {
      role: "담당 역할",
      brief: "프로젝트 소개",
      whyJoined: "이 팀을 선택한 이유",
      myWork: "내가 한 일",
      contributions: "구현 내용",
      skills: "사용 기술",
      techniques: "접근 방식",
      obstacles: "어려웠던 점",
      outcomes: "결과물",
      visualAids: "시각 자료",
      stack: "기술 스택",
      links: "링크",
      deck: "팀 발표",
      repo: "GitHub",
      gallery: "갤러리 & 데모",
      close: "닫기",
    },
    projects: {
      dl: {
        phase: "01 · 딥러닝",
        title: "Gesto",
        subtitle: "MediaPipe + LSTM 손동작 PC 제어",
        team: "DL 4조 · {repo}",
        metaLine: "2026.01.29 – 2026.02.06 · LLM 로봇 인터랙션 · 6인 팀 · GitHub {github}",
        deckLabel: "팀 발표",
        highlights: [
          "웹캠 손동작으로 **PPT·YouTube를** 핸즈프리 제어했습니다",
          "**PyQt6** UI 약 1,600+ 라인에 실시간 피드, 모드, **워커 스레드를** 구현했습니다",
          "**LSTM 데이터셋** 상당 부분을 수집·정리했고 **일부 직접 학습**했습니다",
          "최종 발표에서 **평균 F1 약 74%**(**LSTM v1→v4**)를 달성했습니다",
        ],
        brief:
          "웹캠 제스처로 **PPT·YouTube를** 핸즈프리 조작 — **MediaPipe**·**LSTM**·**PyQt6**, **쥐 미로** 게임 모드 포함.",
        whyJoined:
          "DL 팀이 노트북이 아니라 **라이브 데모를** 만들고 있었고, 웹캠만으로 **핸즈프리** 제어를 하고 싶었습니다. **PyQt 데스크톱 셸으로** **웹캠→LSTM→pynput을** 한 화면에 묶고, **LSTM 데이터셋을** 정리하며, 추론 중에도 **UI가 멈추지 않게** 워커 스레드를 나누기로 했습니다.",
        myWork: [
          "**PyQt6** 데스크톱 셸 약 **1,600** LOC · **워커 스레드** 구조",
          "**MediaPipe → LSTM → pynput** 파이프라인",
          "**LSTM 데이터셋** **6,276** 시퀀스",
          "**Rat Labyrinth** · **14 commits** (deeplearning-repo-4)",
        ],
        summary:
          "웹캠 제스처로 **PPT·YouTube를** 핸즈프리 조작 — **MediaPipe**·**LSTM**·**PyQt6**, **쥐 미로** 게임 모드 포함.",
        rolePoints: [
          "**PyQt6**와 **MediaPipe→LSTM** 파이프라인(트리거, 모드, 임계값)을 구현했습니다",
          "**LSTM 데이터셋을** 수집하고 **일부 학습을** 수행했습니다",
          "**Rat Labyrinth** 게임 모드를 연동했습니다",
        ],
        contributions: [
          "**ModeController**로 인식 제스처를 **pynput** 키 입력에 매핑했습니다.",
          "**MediaPipe + LSTM**에서 트리거 on/off, 모드별 검출, 신뢰도 임계값을 맞췄습니다.",
          "**PyQt6 UI**(~1,600+ 라인)에 웹캠, 모드, 게이지를 넣고 **워커 스레드로** UI 응답을 유지했습니다.",
          "**LSTM 데이터셋** `.npy`(**30×21×3**), 수집 툴, 팀 매뉴얼을 정리했습니다.",
          "**LSTM v1→v4** 체크포인트를 일부 직접 학습해 팀과 공유했고, 실제 학습 런을 돌렸습니다.",
          "**Rat Labyrinth**에 제스처 레지스트리를 연동했습니다.",
          "발표 전 **트리거·PPT·YouTube** QA를 수행했습니다.",
        ],
        skills: [
          { category: "언어 & 프레임워크", items: ["Python 3.10", "PyQt6", "OpenCV", "pynput"] },
          {
            category: "ML / 비전",
            items: [
              "MediaPipe Hands",
              "LSTM 시퀀스 분류",
              "11차원 랜드마크 피처",
              "데이터셋 수집·라벨링",
              "LSTM 일부 학습",
            ],
          },
          {
            category: "설계",
            items: ["제스처 레지스트리", "액션 매퍼", "모드 상태 머신", "스레드-세이프 UI"],
          },
        ],
        techniques: [
          "**21점** → **30프레임** → **LSTM**과 **11차원 피처** 파이프라인을 썼습니다.",
          "**카메라·검출·트리거** 워커 3분할과 **ModeController**로 UI 응답을 유지했습니다.",
          "모드별 **pynput** 키 출력 **레지스트리로** 액션을 통일했습니다.",
        ],
        obstacles: [
          {
            title: "처음엔 **학습 데이터** 들쭉날쭉",
            body: "수집 프레임워크·매뉴얼을 만든 뒤 **6,276** 시퀀스를 **30프레임** 보간으로 재수집했습니다.",
          },
          {
            title: "발표 직전 **UI 멈춤**",
            body: "**카메라·LSTM·pynput이** 한 스레드에 묶여 추론 중 화면이 멈췄습니다. **카메라·검출·트리거를** 워커 3분할로 나누고 **ModeController**로 모드별 키 매핑을 분리해 데모 중에도 피드가 살아 있게 했습니다.",
          },
          {
            title: "일부 제스처 늦게 잡힘",
            body: "데이터를 추가하고 **LSTM v1→v4** 학습을 돌려 **~74% F1**, **Swipe Left ~0.89** 달성했습니다.",
          },
        ],
        outcomes: [
          "최종 발표에서 **PPT + YouTube + Rat Labyrinth** 웹캠만으로 시연했습니다.",
          "팀 덱에 아키텍처, **11-D**, **F1** 그래프를 정리했습니다.",
          "수업 후에도 **PyQt + MediaPipe** 구조를 계속 활용했습니다.",
        ],
        visualAids: [
          {
            type: "flow",
            title: "인식 파이프라인",
            steps: ["웹캠", "MediaPipe 21점", "30프레임", "LSTM(11-D)", "pynput"],
            caption: "팀 최종 발표 — 공간 랜드마크 후 시계열 LSTM.",
          },
          {
            type: "diagram",
            src: "assets/gesto/deck-sequence.png",
            title: "런타임 시퀀스",
            caption: "양손 펼침 트리거 → 검출 ON → UI·액션.",
          },
          {
            type: "diagram",
            src: "assets/gesto/deck-arch.png",
            title: "시스템 아키텍처",
            caption: "사용자 PC — 카메라·메인 앱 (팀 발표).",
          },
        ],
        stack: ["Python", "PyQt6", "MediaPipe", "LSTM", "OpenCV", "pynput"],
        media: [
          { type: "gif", src: "PRISMIC_GESTO_PPT", caption: "PPT 모드 — 슬라이드·전체화면 제스처" },
          { type: "gif", src: "PRISMIC_GESTO_WORKING", caption: "인식 활성 — LSTM → pynput" },
          {
            type: "gif",
            src: "PRISMIC_GESTO_YOUTUBE",
            caption: "YouTube 모드 — 재생/볼륨/전체화면",
          },
          {
            type: "gif",
            src: "PRISMIC_GESTO_TRIGGER",
            caption: "트리거 제스처 — 동작 감지 시작/종료",
          },
          { type: "gif", src: "PRISMIC_GESTO_NOT_WORKING", caption: "트리거 대기 — 오동작 방지" },
          {
            type: "image",
            src: "assets/gesto/deck-demo-ui.png",
            caption: "팀 발표 — 게임/YouTube PyQt UI",
          },
          {
            type: "image",
            src: "assets/gesto/deck-pipeline.png",
            caption: "팀 발표 — MediaPipe → LSTM",
          },
          {
            type: "image",
            src: "assets/gesto/deck-features-11d.png",
            caption: "팀 발표 — 11차원 피처",
          },
          {
            type: "image",
            src: "assets/gesto/deck-results.png",
            caption: "팀 발표 — LSTM F1 (~74%)",
          },
          {
            type: "image",
            src: "assets/gesto/deck-sequence.png",
            caption: "팀 발표 — 스레드 시퀀스",
          },
          { type: "image", src: "assets/gesto/deck-arch.png", caption: "팀 발표 — 아키텍처" },
          { type: "image", src: "assets/gesto/deck-team.png", caption: "팀 발표 — 역할" },
          { type: "image", src: "PRISMIC_GESTO_MEDIAPIPE", caption: "운영 UI MediaPipe 오버레이" },
          { type: "image", src: "assets/gesto/ui.jpg", caption: "Gesto 제어 화면" },
          { type: "image", src: "assets/gesto/page-115.png", caption: "Swipe Right 궤적 오버레이" },
          { type: "image", src: "assets/gesto/landmarks.png", caption: "21랜드마크·제스처 클래스" },
        ],
      },
      iot: {
        phase: "02 · IoT",
        title: "오주의 마법사",
        subtitle: "스마트 타워 주차 시스템 (APS)",
        team: "IoT 2조 · {repo}",
        metaLine: "2026.02.23 – 2026.03.04 · IoT 로봇 시스템 · 6인 팀 · ESP32-CAM + PyQt6",
        highlights: [
          "실물 **로타리 주차 타워**에 **ESP32-CAM**, 게이트, 리프트를 연동했습니다",
          "초반에는 **UDP/TCP** 다중 CAM GUI, **33바이트 패킷**, 주차 안내 **펌웨어를** 담당했습니다",
          "후반에는 **PyQt 관제**에서 **PaddleOCR LPR** 창, 디바이스 클라이언트, **웹캠** 안정화를 맡았습니다",
          "팀 덱 기준 번호판 **~94.3%**, **TC 통과**, 리프트 **±2 mm** 확인했습니다",
        ],
        brief:
          "미니 **회전식 스마트 주차 타워** — **ESP32 3대** 펌웨어, **LPR**, **PyQt6** 관제실로 입출차·결제까지 운영.",
        whyJoined:
          "IoT 2조는 회전 주차 **실물 모형**에 **ESP32 3대**와 **FastAPI가** 동시에 붙는 팀이었습니다. 저는 **33바이트 TCP로** 타워 상태를 읽고 **PyQt 관제실**에 뿌리는 통합을 맡고 싶었고, 후반 관제 일정이 밀리자 제가 **IR 안내 펌웨어**, **멀티캠 UI**, **LPR 검증 창**까지 이어서 데모를 살렸습니다.",
        myWork: [
          "**ESP32** 주차 안내 펌웨어 — **33바이트** 패킷, **UDP/TCP**",
          "**PyQt6** 관제실 — 다중 웹캠, **LPR** 창, 게이트 UI",
          "데모 노트북 **웹캠 복구**",
          "팀 덱 **LPR ~94.3%**",
        ],
        summary:
          "미니 **회전식 스마트 주차 타워** — **ESP32** 펌웨어, **LPR**, **PyQt6** 관제실로 입출차·결제까지 운영.",
        rolePoints: [
          "**ESP32** 주차 안내 펌웨어와 **UDP/TCP** 통신을 구현했습니다",
          "**PyQt** 관제실에서 다중 웹캠, **LPR** 창, 디바이스 클라이언트를 맡았습니다",
          "자동화 전 **PaddleOCR** 검증 UI를 만들었습니다",
        ],
        contributions: [
          "**ESP32** 주차 안내 펌웨어에 **IR 4구역**, **WiFi TCP**, **PING/PONG**, LCD를 넣었습니다.",
          "다중 **ESP32-CAM UDP**와 **33바이트** 패킷 포맷을 정의했습니다.",
          "**PyQt6** 관제에 다중 웹캠, 연결 상태, 전송 매니저를 구현했습니다.",
          "입·출차 **LPR** 테스트 창으로 자동화 전 번호판을 확인했습니다.",
          "데모 노트북 **웹캠 끊김을** **OpenCV**, USB 재열거, 재시도로 수정했습니다.",
        ],
        skills: [
          {
            category: "데스크톱·비전",
            items: ["PyQt6", "OpenCV VideoCapture", "PaddleOCR LPR", "LPR 검증 UI"],
          },
          { category: "백엔드(팀)", items: ["FastAPI REST", "MySQL / SQLAlchemy (14테이블)"] },
          {
            category: "임베디드 연동",
            items: ["ESP32-CAM UDP", "Arduino 게이트·스테퍼 타워", "디바이스 클라이언트"],
          },
        ],
        techniques: [
          "**PyQt**와 팀 **FastAPI**, 카메라 **UDP**, 장비 **33바이트 TCP** 연결했습니다.",
          "카메라 **워커 스레드로** HMI 응답을 유지했습니다.",
          "각도가 나쁠 때 **PaddleOCR LPR** 수동 오버라이드를 썼습니다.",
        ],
        obstacles: [
          {
            title: "통합 데모 중 **웹캠** 끊김",
            body: "재시도, 디바이스 인덱스, 경고 UI로 복구했습니다.",
          },
          {
            title: "창이 너무 많음",
            body: "타워·게이트·안내를 **PyQt** 타임라인 하나로 묶었습니다.",
          },
          {
            title: "**LPR** 각도 틀림",
            body: "스냅샷 확인·수동 입력으로 보완했고, 팀 미들웨어 **~94%** 확인했습니다.",
          },
        ],
        outcomes: [
          "미니 로트 **입차→주차→요금→출차** 데모를 완료했습니다.",
          "팀 덱 **TC** 전항 PASS와 기술 보고서 **TR** 확보했습니다.",
          "갤러리에 실물 프로토와 팀 덱을 정리했습니다.",
        ],
        visualAids: [
          {
            type: "flow",
            title: "주차 흐름",
            steps: ["입차 LPR", "자리 배정", "IR 안내", "타워 리프트", "요금", "출차"],
            caption: "미니 로트 — ESP32 + PyQt 관제.",
          },
          {
            type: "diagram",
            src: "assets/iot/deck-architecture.png",
            title: "3계층 구조",
            caption: "팀 발표 — PyQt / FastAPI / 하드웨어.",
          },
          {
            type: "diagram",
            src: "assets/iot/deck-overview.png",
            title: "시스템 개요",
            caption: "ESP32-CAM · FastAPI · PyQt6 · MySQL.",
          },
        ],
        stack: [
          "ESP32-CAM",
          "Arduino",
          "FastAPI",
          "PyQt6",
          "OpenCV",
          "PaddleOCR",
          "MySQL",
          "UDP/TCP",
        ],
        media: [
          {
            type: "video",
            src: "assets/iot/image69.webm",
            caption: "타워 제어 UI — 차판 배정·리프트 로그 (팀 덱)",
          },
          {
            type: "video",
            src: "assets/iot/image70.webm",
            caption: "게이트·타워 연동 — 입차→출차 리허설",
          },
          {
            type: "gif",
            src: "assets/iot/image57.gif",
            caption: "PyQt6 SMART PARKING 관제 대시보드 (팀 덱)",
          },
          {
            type: "gif",
            src: "assets/iot/gate.gif",
            caption: "입구 게이트 — 차단기 개폐 리허설",
          },
          {
            type: "gif",
            src: "assets/iot/image66.gif",
            caption: "회전식 타워 리프트 — 기구 시뮬레이션",
          },
          { type: "gif", src: "assets/iot/image50.gif", caption: "타워 리프트 시퀀스" },
          { type: "gif", src: "assets/iot/image40.gif", caption: "LPR 입·출차 검증 UI" },
          {
            type: "image",
            src: "assets/iot/pyqt-cam-capture.jpg",
            caption: "PyQt ESP32-CAM UDP 미리보기 (Z20260302 캡처)",
          },
          {
            type: "image",
            src: "assets/iot/pyqt-admin-ui.png",
            caption: "통합 데모 주간 — 관제 UI",
          },
          { type: "image", src: "assets/iot/deck-overview.png", caption: "팀 발표 — 시스템 개요" },
          {
            type: "image",
            src: "assets/iot/deck-architecture.png",
            caption: "팀 발표 — 3계층 구조",
          },
          { type: "image", src: "assets/iot/deck-features.png", caption: "팀 발표 — 기능 목록" },
          {
            type: "image",
            src: "assets/iot/deck-testing.png",
            caption: "팀 발표 — TC 테스트 (전항 PASS)",
          },
          {
            type: "image",
            src: "assets/iot/deck-metrics.png",
            caption: "팀 발표 — LPR %, 리프트 오차, DB",
          },
          {
            type: "image",
            src: "assets/iot/deck-hardware.png",
            caption: "팀 발표 — 하드웨어 사진",
          },
          { type: "image", src: "assets/iot/deck-erd.png", caption: "팀 발표 — MySQL ERD" },
          { type: "image", src: "assets/iot/hero.jpg", caption: "오주의 마법사 — 물리 데모 배치" },
          {
            type: "image",
            src: "assets/iot/system.jpg",
            caption: "아키텍처 & 데이터 흐름 (팀 다이어그램)",
          },
          {
            type: "image",
            src: "assets/iot/image18.jpg",
            caption: "미니어처 로트 — 게이트·운영 화면",
          },
          {
            type: "image",
            src: "assets/iot/image34.png",
            caption: "ESP32 게이트 배선·벤치 테스트",
          },
        ],
      },
      ros: {
        phase: "03 · ROS",
        title: "쑈삥끼",
        subtitle: "자율주행 마트 카트 (ShopPinkki)",
        team: "ROS 2조 · {repo}",
        metaLine: "2026.04.03 – 2026.04.14 · AI 로봇 자율주행 · Pinky Pro",
        highlights: [
          "**Pinky Pro** 미니 마트에서 **Owner 추적** 데모를 시연했습니다",
          "**YOLOv8 + ByteTrack + ReID**와 **5프레임 Safe-ID** 적용했습니다",
          "**ReID를** **OSNet → MobileNetV3로** 바꾸고 **Pi 5 NCNN** 시험했습니다",
          "마트 녹화 **지연을** 측정하고 덱 영상으로 임계값을 조정했습니다",
        ],
        brief:
          "**ROS 2** **Pinky Pro** 마트 카트 — **YOLOv8**·**ByteTrack**·**ReID**로 주인을 따라가는 미니 마트 추종.",
        whyJoined:
          "처음으로 **인식→내비를** 한 사이클에 묶는 팀이었고, 마트 영상에서 **주인을 놓치지** 않고 **인식 튜닝을** 맡고 싶었습니다.",
        myWork: [
          "**YOLO → ByteTrack → ReID** 추종 파이프라인",
          "**5프레임 Safe-ID** 락",
          "**MobileNetV3 ReID** + **NCNN** 실험",
          "**9 commits** (ros-repo-2)",
        ],
        summary:
          "**ROS 2** **Pinky Pro** 마트 카트 — **YOLOv8**·**ByteTrack**·**ReID**로 주인을 따라가는 미니 마트 추종.",
        rolePoints: [
          "**ROS** 그래프에 **YOLOv8 + ByteTrack** 연동했습니다",
          "**Safe-ID**와 **ReID**(**MobileNetV3**) 교체를 담당했습니다",
          "마트 영상 **지연** 프로파일링과 **NCNN** 실험을 수행했습니다",
        ],
        contributions: [
          "**Owner 추적**에 **YOLOv8** + CNN **ReID** + IoU와 **5프레임 Safe-ID** 넣었습니다.",
          "**ReID를** **OSNet → MobileNetV3** + 색상 폴백으로 바꾸고 **NCNN**(Pi 5) 시험했습니다.",
          "**ROS** 인식 그래프에 **ByteTrack** 연동했습니다.",
          "마트 녹화 **E2E 지연을** 재고 덱 영상으로 임계값을 튜닝했습니다.",
          "최종 데모 **LCD·QR** 배치를 맞췄습니다.",
        ],
        skills: [
          { category: "ROS 2", items: ["Jazzy", "Perception 노드", "토픽 타이밍"] },
          { category: "비전·ML", items: ["YOLOv8", "ByteTrack", "torchreid", "NCNN"] },
          { category: "시스템", items: ["지연 측정", "멀티 카메라", "온로봇 UI"] },
        ],
        techniques: [
          "**검출 → 트래크 → ReID** 파이프라인을 마트 영상으로 임계값 조정했습니다.",
          "**Safe-ID** 동안 **ReID** 생략해 **Pi** 부담을 줄였습니다.",
          "**NCNN** 온카트 추론을 실험했습니다.",
        ],
        obstacles: [
          {
            title: "사람 지나갈 때 **ID 스왑**",
            body: "**ReID** 가중을 키우고 트랙 생명주기를 조정했습니다.",
          },
          {
            title: "**지연**으로 추적 늦음",
            body: "파이프라인 지연을 재고 **Safe-ID**·임계값으로 보완했습니다.",
          },
          {
            title: "인형 데모 **오검출**",
            body: "**YOLO** 클래스와 **ROI** 분리해 줄였습니다.",
          },
        ],
        outcomes: [
          "팀 통합 마트 영상에서 **추종** 안정화했습니다.",
          "**shoppinkki.pdf** 인식 파트를 정리했습니다.",
          "엣지용 **NCNN** 파일을 남겼습니다.",
        ],
        visualAids: [
          {
            type: "flow",
            title: "인식 스택",
            steps: ["카메라", "YOLOv8", "ByteTrack", "ReID", "Safe-ID"],
            caption: "제가 만든 부분: 트래커 + ReID.",
          },
          {
            type: "diagram",
            src: "assets/shop/arch.png",
            title: "ShopPinkki 아키텍처",
            caption: "shoppinkki.pdf ROS 그래프.",
          },
          {
            type: "diagram",
            src: "assets/shop/demo.jpg",
            title: "마트 데모 환경",
            caption: "미니어처 매장의 Pinky Pro.",
          },
        ],
        stack: ["ROS 2 Jazzy", "YOLOv8", "ByteTrack", "torchreid", "MobileNetV3", "NCNN"],
        media: [
          {
            type: "video",
            src: "PRISMIC_FINAL_DEMO",
            caption: "통합 마트 주행 — Pinky Pro 최종 데모",
          },
          {
            type: "video",
            src: "PRISMIC_TRACKING_REID",
            caption: "YOLO + ByteTrack + ReID 마트 영상",
          },
          { type: "video", src: "PRISMIC_SHOP_GUIDE", caption: "매장 안내 — 고객 추종 주행" },
          { type: "video", src: "PRISMIC_SHOP_LLM_GUIDE", caption: "LLM 기반 상품 안내 · 맵 연동" },
          { type: "video", src: "PRISMIC_SHOP_RETURN", caption: "결제 후 복귀 주행" },
          { type: "video", src: "PRISMIC_SHOP_PAYMENT", caption: "결제·체크아웃 스테이션 데모" },
          { type: "video", src: "PRISMIC_SHOP_WAITING", caption: "대기 구역 — 고객 인계" },
          {
            type: "video",
            src: "PRISMIC_SHOP_SHOPPING_LIST",
            caption: "쇼핑 리스트 기반 픽업 경로",
          },
          { type: "video", src: "PRISMIC_TRACKING", caption: "추적 파이프라인 — 라이브 리허설" },
          { type: "video", src: "PRISMIC_GUIDING", caption: "가이딩 모드 — 추가 리허설 영상" },
          { type: "video", src: "PRISMIC_SHOP_GUIDE_ADMIN", caption: "안내 맵·관리자 설정 UI" },
          { type: "gif", src: "PRISMIC_TRACKING_START", caption: "추적 세션 시작" },
          { type: "gif", src: "PRISMIC_SHOP_REGISTER", caption: "고객 등록 · QR 페어링" },
          { type: "image", src: "assets/shop/demo.jpg", caption: "미니어처 마트 데모 환경" },
          {
            type: "image",
            src: "assets/shop/page-014.png",
            caption: "ByteTrack + ReID 파이프라인",
          },
          { type: "image", src: "assets/shop/page-027.png", caption: "YOLO·트래킹 튜닝" },
          { type: "image", src: "assets/shop/page-048.png", caption: "온로봇 LCD·QR 배치" },
          { type: "image", src: "PRISMIC_MAP", caption: "매장 구역 맵" },
          { type: "image", src: "assets/shop/arch.png", caption: "ROS 인식·내비 아키텍처" },
          {
            type: "image",
            src: "assets/shop/hero.jpg",
            caption: "ShopPinkki 개요 (shoppinkki.pdf)",
          },
        ],
      },
      pai: {
        phase: "04 · Physical AI",
        title: "pingdergarten",
        subtitle: "EduPing — 유치원 교육보조 로봇",
        team: "사랑의 에듀핑 · {repo}",
        metaLine: "2026.04.23 – 2026.06.04 · Physical AI 로봇 구현 · 커밋 약 68",
        highlights: [
          "**뎁스 하이파이브**에서 손 3D → **TRAC-IK**로 빗나감을 **~20–28cm → ~2cm**까지 줄였습니다",
          "**MuJoCo 트윈** 검증 후 실물 **OpenArm** 데모를 시연했습니다",
          "**Vue + Three.js**로 **D435** 포인트클라우드, 등하원, 율동 UI를 구현했습니다",
          "최종 **Q&A** 페이지(등하원·**무궁화**·포털)를 작성했습니다",
        ],
        brief:
          "유치원 보조 **pingdergarten** — **하이파이브**, **등하원**, **무궁화** 율동까지 **브라우저**에서 돌아가는 **OpenArm** + **Vue/Three.js** + **ROS 2**.",
        whyJoined:
          "마지막 **Physical AI** 팀 — **진짜 아이** 앞에서 의미 있는 **브라우저 로봇**(하이파이브·등하원·율동)을 만들고 싶었습니다. Gesto·IoT·ROS 이후 **비전→UI→로봇** 캡스톤. 팀에 **브라우저 teleop**과 **OpenArm** 슬롯이 있었고 **3D/UI** 배경과 맞았습니다.",
        myWork: [
          "**하이파이브** — D435 뎁스 → **TRAC-IK** + **FK** 잔차 (**~28cm → ~2cm**)",
          "**무궁화** — ‘무궁화꽃이 피었습니다’ 게임 셸, 박자·녹화 UI, 모션+음원 WS 재생",
          "**등하원**·**OX 퀴즈** UI + 포털 **일과 보고서** Q&A 페이지",
          "**Vue 3 + Three.js** — **D435** zstd WS · 커밋 약 **68건**",
        ],
        summary:
          "유치원 보조 **pingdergarten** — **하이파이브**, **등하원**, **무궁화** 율동까지 **브라우저**에서 돌아가는 **OpenArm** + **Vue/Three.js** + **ROS 2**.",
        rolePoints: [
          "**하이파이브** 폐루프와 **무궁화** 게임·율동 재생을 맡았습니다 (커밋 약 **68건**)",
          "**뎁스 WS**, **MediaPipe** 손, **TRAC-IK** 잔차 보정을 구현했습니다",
          "**등하원**·**OX** UI와 최종 **Q&A** 페이지(등하원·무궁화·포털)를 작성했습니다",
        ],
        contributions: [
          "**하이파이브**에 **D435** zstd WS → **포인트클라우드** → **TRAC-IK** + **FK 잔차** 루프를 넣었습니다.",
          "좌팔 **IK 미러 솔브**(우측 **TRAC-IK** 그룹) 추가했습니다.",
          "**Vue3 + Three.js**에 **URDF GLB**, **Z-up→Y-up** 회전 1회 적용했습니다.",
          "**등하원** UI에 얼굴 인식과 인사 트리거를 연결했습니다.",
          "**무궁화** — `MugunghwaGame.vue` 게임 셸, **RecorderControls** 율동 녹화, `/dance/{slug}/stream` 모션·오디오 동기 재생; 포털 감정 캡처.",
          "**MuJoCo 트윈을** 만들고 **D435** 스트리머 **cv_bridge** ABI를 시스템 Python에 맞췄습니다.",
          "최종 **Q&A** 슬라이드를 작성했습니다.",
        ],
        skills: [
          {
            category: "프론트",
            items: ["Vue 3", "Three.js", "Web Worker", "WebRTC", "TypeScript"],
          },
          {
            category: "비전",
            items: ["MediaPipe Hands", "뎁스 역투영", "얼굴 인식", "GLSL 포인트클라우드"],
          },
          { category: "로봇", items: ["ROS 2 Jazzy", "TRAC-IK", "MuJoCo", "관절 한계 튜닝"] },
          {
            category: "전달",
            items: ["DAE→GLB 메쉬 파이프라인", "Prismic 자산", "발표 리포트 페이지"],
          },
        ],
        techniques: [
          "**IK→FK 잔차** 폐루프로 아이 손을 추종했습니다.",
          "좌어깨 한계 시 **TRAC-IK 미러 솔브** 적용했습니다.",
          "브라우저 **뎁스 뷰** 기준으로 **MuJoCo** 메쉬를 정합했습니다.",
          "**MediaPipe**는 메인 스레드, **zstd**는 **Worker**로 분리했습니다.",
        ],
        obstacles: [
          {
            title: "**IK** 나와도 하이파이브 빗나감",
            body: "**FK 잔차** 루프·어깨 높이 캡·리치 박스를 튜닝했습니다.",
          },
          {
            title: "**뎁스 뷰** 멈춤",
            body: "**cv_bridge** ABI를 맞춰 **D435** 스트리머를 시스템 Python으로 돌렸습니다.",
          },
          {
            title: "**URDF** 렉·뒤집힘",
            body: "**DAE→GLB**와 **Z-up→Y-up** 회전 1회로 정리했습니다.",
          },
          {
            title: "**moveit_servo PSM** 데드락",
            body: "**JointTrajectory** 스무딩으로 우회했습니다.",
          },
        ],
        outcomes: [
          "실물 **하이파이브** 갤러리 영상으로 남겼습니다.",
          "브라우저 **뎁스·등하원·율동** 재생을 완성했습니다.",
          "최종 **Q&A** 페이지를 배포했습니다.",
          "**URDF** 좌표 수정은 이 포트폴리오 미로에도 재사용했습니다.",
        ],
        visualAids: [
          {
            type: "flow",
            title: "하이파이브 폐루프",
            steps: ["D435 뎁스", "손 랜드마크", "IK 타겟", "TRAC-IK", "FK 잔차", "관절 명령"],
            caption: "브라우저 뎁스 뷰가 캘리브레이션 기준.",
          },
          {
            type: "diagram",
            src: "PRISMIC_CLOUD",
            title: "뎁스 포인트클라우드 (브라우저)",
            caption: "Three.js로 렌더한 실시간 D435 스트림.",
          },
          {
            type: "diagram",
            src: "PRISMIC_SIM",
            title: "IK 시뮬레이션",
            caption: "블루·레드 타겟 볼 + 리치 튜닝.",
          },
        ],
        stack: ["Vue 3", "Three.js", "MediaPipe", "ROS 2", "MuJoCo", "WebRTC", "TRAC-IK", "Python"],
        media: [
          {
            type: "video",
            src: "PRISMIC_HIFIVE_VIDEO",
            caption: "EduPing — 실물 하이파이브 데모 (전체 영상)",
          },
          { type: "gif", src: "PRISMIC_HIFIVE", caption: "EduPing 하이파이브 데모 (GIF)" },
          { type: "video", src: "PRISMIC_DANCE_VIDEO", caption: "EduPing — 무궁화 리듬 율동 재생" },
          {
            type: "video",
            src: "PRISMIC_GOGOPING_FOLLOW",
            caption: "GogoPing — 교사 추종 모드 (모바일 베이스)",
          },
          {
            type: "video",
            src: "PRISMIC_GOGOPING_HIDESEEK",
            caption: "GogoPing — 숨바꼭질 내비게이션",
          },
          { type: "gif", src: "PRISMIC_SIM", caption: "IK 잔차 루프 — 블루·레드 볼 (GIF)" },
          {
            type: "gif",
            src: "PRISMIC_MUGUNGHWA",
            caption: "무궁화 리듬 율동 — 동작 녹화 UI (GIF)",
          },
          { type: "image", src: "PRISMIC_OX", caption: "등하원 O/X 비전 보드" },
          { type: "image", src: "PRISMIC_OXLOCK", caption: "등하원 확정(lock-in) UI" },
          { type: "image", src: "PRISMIC_CLOUD", caption: "브라우저 D435 포인트클라우드" },
          { type: "image", src: "PRISMIC_MUJOCO", caption: "MuJoCo 디지털 트윈" },
          { type: "image", src: "PRISMIC_UI", caption: "EduPing 웹 로봇 콘솔" },
          { type: "image", src: "PRISMIC_REPORT", caption: "일과 보고서 페이지 (최종 발표)" },
          { type: "image", src: "PRISMIC_REPORT2", caption: "타임라인·일정 리포트 페이지" },
        ],
      },
    },
  },
};

const PRISMIC_KEYS = {
  PRISMIC_GESTO_PPT: "gestoPptMode",
  PRISMIC_GESTO_YOUTUBE: "gestoYoutubeMode",
  PRISMIC_GESTO_WORKING: "gestoGestureWorking",
  PRISMIC_GESTO_NOT_WORKING: "gestoGestureNotWorking",
  PRISMIC_GESTO_TRIGGER: "gestoTrigger",
  PRISMIC_GESTO_MEDIAPIPE: "gestoMediapipe",
  PRISMIC_HIFIVE: "hifiveGif",
  PRISMIC_HIFIVE_REAL: "hifiveReal",
  PRISMIC_CLOUD: "cloud",
  PRISMIC_SIM: "simBalls",
  PRISMIC_MUJOCO: "mujoco",
  PRISMIC_MUGUNGHWA: "mugunghwa",
  PRISMIC_UI: "mugunghwaUi",
  PRISMIC_REPORT: "reportUi",
  PRISMIC_REPORT2: "reportTimeline",
  PRISMIC_OX: "oxBoard",
  PRISMIC_OXLOCK: "oxLock",
  PRISMIC_MAP: "map",
  PRISMIC_GOGOPING_FOLLOW: "gogopingFollow",
  PRISMIC_GOGOPING_HIDESEEK: "gogopingHideseek",
  PRISMIC_TRACKING_REID: "trackingReid",
  PRISMIC_TRACKING: "trackingLive",
  PRISMIC_TRACKING_START: "trackingStart",
  PRISMIC_SHOP_REGISTER: "shopRegister",
  PRISMIC_FINAL_DEMO: "finalDemo",
  PRISMIC_SHOP_SHOPPING_LIST: "shopShoppingList",
  PRISMIC_SHOP_WAITING: "shopWaiting",
  PRISMIC_SHOP_PAYMENT: "shopPayment",
  PRISMIC_SHOP_LLM_GUIDE: "shopLlmGuide",
  PRISMIC_SHOP_GUIDE_ADMIN: "shopGuideAdmin",
  PRISMIC_SHOP_RETURN: "shopReturn",
  PRISMIC_SHOP_GUIDE: "shopGuideDemo",
  PRISMIC_GUIDING: "guidingDemo",
  PRISMIC_HIFIVE_VIDEO: "hifiveVideo",
  PRISMIC_DANCE_VIDEO: "danceVideo",
};

const VIDEO_EXT = /\.(mp4|webm|mov)(\?|$)/i;
const GIF_EXT = /\.gif(\?|$)/i;
const MEDIA_PRIORITY = { video: 0, gif: 1, image: 2 };

export function resolveMediaSrc(src) {
  if (src.startsWith("PRISMIC_")) return PRISMIC[PRISMIC_KEYS[src]] ?? src;
  return src;
}

function resolveVideoGifFallback(token) {
  if (!token?.startsWith("PRISMIC_")) return null;
  const key = PRISMIC_KEYS[token];
  const gifKey = key && PRISMIC_VIDEO_GIF[key];
  return gifKey ? PRISMIC[gifKey] : null;
}

export function inferMediaType(src, declared) {
  if (declared === "video" || VIDEO_EXT.test(src)) return "video";
  if (declared === "gif" || GIF_EXT.test(src)) return "gif";
  return "image";
}

export function prioritizeMedia(media) {
  return [...media]
    .map((m) => {
      const token = m.src;
      const src = resolveMediaSrc(token);
      const type = inferMediaType(src, m.type);
      const gifFallback = type === "video" ? resolveVideoGifFallback(token) : null;
      return { ...m, src, type, gifFallback };
    })
    .sort((a, b) => MEDIA_PRIORITY[a.type] - MEDIA_PRIORITY[b.type]);
}

/** 기본 KO — 사용자가 EN으로 수동 전환한 경우에만 EN 유지 */
export function detectLanguage() {
  const { lang, langManual } = SITE.storage;
  if (localStorage.getItem(langManual) === "1" && localStorage.getItem(lang) === "en") {
    return "en";
  }
  return "ko";
}

export function setLanguage(lang, manual = true) {
  const { lang: langKey, langManual } = SITE.storage;
  localStorage.setItem(langKey, lang);
  if (manual) localStorage.setItem(langManual, "1");
}

export function t(lang, path) {
  const parts = path.split(".");
  let cur = STRINGS[lang];
  for (const p of parts) cur = cur?.[p];
  return cur ?? path;
}

export function getProject(lang, key) {
  const p = { ...STRINGS[lang].projects[key] };
  p.media = prioritizeMedia(p.media);
  p.visualAids = (p.visualAids ?? []).map((a) => {
    if (a.type === "diagram") return { ...a, src: resolveMediaSrc(a.src) };
    return a;
  });
  return p;
}

/** Every gallery / about asset URL — used by the boot loader (resume included). */
export function collectBootAssetUrls() {
  const urls = new Set();
  const add = (src) => {
    if (!src || typeof src !== "string") return;
    const resolved = resolveMediaSrc(src);
    if (/^https?:\/\//i.test(resolved) || resolved.startsWith("assets/")) {
      urls.add(resolved);
    }
  };

  for (const loc of ["en", "ko"]) {
    const block = STRINGS[loc];
    add(block.about?.profileImage);
    for (const m of block.about?.media ?? []) add(m.src);
    for (const key of PROJECT_KEYS) {
      const p = block.projects?.[key];
      if (!p) continue;
      for (const m of p.media ?? []) {
        add(m.src);
        const gifFallback = resolveVideoGifFallback(m.src);
        if (gifFallback) add(gifFallback);
      }
      for (const a of p.visualAids ?? []) {
        if (a.type === "diagram") add(a.src);
      }
    }
  }

  for (const url of Object.values(PRISMIC)) add(url);
  urls.add("assets/og-lab.svg");
  urls.add("assets/favicon.svg");
  return [...urls];
}
