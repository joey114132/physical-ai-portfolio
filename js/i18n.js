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
  hifiveGif: "https://images.prismic.io/joey/ah544AeQX7-eWhsi_hifive_final.gif",
  cloud: "https://images.prismic.io/joey/ah541QeQX7-eWhsX_browser_cloud.jpg?auto=format,compress",
  simBalls: "https://images.prismic.io/joey/ah545AeQX7-eWhsl_hifive_sim.gif",
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
      hintTouch: "Joystick · E · menu (≡)",
      mobileInteract: "Open",
      visualCaptionTouch: "3D · drag to orbit · swipe to scroll",
      menuOpen: "Open menu",
      menuClose: "Close menu",
      menuTitle: "Projects & controls",
      detail3dShow: "Show 3D",
      detail3dHide: "Hide 3D",
    },
    intro: {
      eyebrow: "FIELD LAB · NOT A PDF",
      role: "Physical AI · robotics · vision-UI",
      lead: "Four bootcamp **team projects** in a walkable **3D maze**. Open **{stationFirst}→{stationLast}** in order — **IK tuning**, a **real high-five**, and **only my contributions** at each stop.",
      returnWelcome:
        "Your maze position and station progress are saved — pick up where you left off.",
      touchNote: "Mobile: **joystick** · **E** to open · **menu (≡)** for status & projects",
      edu: "B.S. Game Design, University of Utah — 2024",
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
      bio: "Game school at **Utah (2024)**. These days it's **Physical AI** — robots, vision, UI. I hook cameras into **PyQt** or a browser, run **sim** first when I can, then move to hardware. **3D** spatial sense still shows up in **teleop** layout.",
      strengths: [
        "**Sim/bench** first, then on-robot",
        "**MediaPipe**, **YOLO/ByteTrack/ReID**, **D435** in the browser",
        "**ROS 2**, **TRAC-IK**, dual-arm teleop, **IK/FK** tuning",
      ],
      galleryTitle: "Clips",
      artLinkIntro: "Older **game/3D** art — separate page, link below.",
      media: [
        {
          type: "video",
          src: "assets/about/high-five-demo.mp4",
          caption: "EduPing — real high-five on OpenArm",
        },
        {
          type: "video",
          src: "assets/about/hri-lab.webm",
          caption: "High-five robot — interaction test in the lab",
        },
        {
          type: "video",
          src: "assets/about/high-five-sim.webm",
          caption: "Browser IK sim — blue/red target balls",
        },
        { type: "gif", src: "PRISMIC_HIFIVE", caption: "High-five demo (depth + arm)" },
        { type: "gif", src: "PRISMIC_SIM", caption: "IK tuning loop in the browser" },
        {
          type: "gif",
          src: "PRISMIC_GESTO_WORKING",
          caption: "Gesto — gesture game / presenter mode",
        },
      ],
      artLinkLabel: "3D art portfolio (game school work)",
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
            "**Gesto** — webcam **MediaPipe→LSTM→pynput** for **PPT/YouTube**; I owned the **PyQt6** shell and dataset tooling",
          myRole:
            "**PyQt6 UI** (~1,600+ lines), **MediaPipe→LSTM** wiring, **LSTM dataset** + partial training, **Rat Labyrinth** mode — **14 commits** on `deeplearning-repo-4`",
          learned:
            "Worker threads for **camera/trigger/detection**; **6,276** `.npy` sequences (**30×21×3**); team deck **~74% avg F1**, **Swipe Left ~0.89** after **LSTM v1→v4**",
        },
        {
          key: "iot",
          date: "Feb 2026 · IoT Team 2",
          summary:
            "**오주의 마법사** — **ESP32-CAM** rotary tower lot, gates, and a **PyQt6** control room I kept alive on demo day",
          myRole:
            "**ESP32** parking-guide firmware (**UDP/TCP**, **33-byte** packets), then final-week **PyQt** operator UI — multi-cam, **PaddleOCR LPR** dialogs, webcam recovery",
          learned:
            "Merged tower + gate + LPR into one timeline; manual LPR override when angles fail; team deck **~94.3%** plate read, **TC all pass**, **±2 mm** lift",
        },
        {
          key: "ros",
          date: "Mar–Apr 2026 · ROS Team 2 (삥끼랩)",
          summary:
            "**ShopPinkki** — **Pinky Pro** mart cart: **YOLOv8 → ByteTrack → ReID** follow mode on **ROS 2 Jazzy** + **Nav2**",
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
            "**pingdergarten / EduPing** — kindergarten assistant robot: browser teleop, depth high-five, attendance flows",
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
        "**3D spatial sense** from game school → maze layout, robot panels, teleop UX",
      ],
      presentTitle: "Now",
      present: [
        "Polish **live demos** and this **interactive portfolio**",
        "Keep iterating **EduPing** — depth UX, dance playback, attendance flows",
        "Write down **sim→real** patterns while the capstone is fresh",
      ],
      futureTitle: "Next",
      future: [
        "Ship **full-stack robot products** with thoughtful **HRI** and operator UX",
        "Contribute to **open-source robotics** — MoveIt, ROS, reproducible sim stacks",
        "Grow into **Physical AI** industry or research roles that blend vision + motion",
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
        "FIELD NOTE · game-school spatial sense → teleop layout, still",
      ],
    },
    panel: {
      role: "My role",
      contributions: "What I built",
      skills: "Skills",
      techniques: "Techniques & approach",
      obstacles: "What blocked us",
      outcomes: "What shipped",
      visualAids: "Visual reference",
      stack: "Tech stack",
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
        highlights: [
          "Webcam gestures → **PPT / YouTube** without keyboard or mouse",
          "**PyQt6** UI ~1,600+ lines — live feed, modes, gauge, **worker threads**",
          "Built much of the **LSTM dataset**; **partial model training** with the team",
          "Final deck **~74% avg F1** after **LSTM v1→v4**",
        ],
        summary:
          "Hands-free PPT and YouTube for demos — no keyboard. I built the **PyQt** shell, wired **MediaPipe→LSTM→pynput**, collected a lot of the **training data**, ran part of the **LSTM training**, and shipped **Rat Labyrinth**.",
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
          {
            type: "gif",
            src: "PRISMIC_GESTO_YOUTUBE",
            caption: "YouTube mode — transport, volume, fullscreen",
          },
          { type: "gif", src: "PRISMIC_GESTO_WORKING", caption: "Detection armed — LSTM → pynput" },
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
        summary:
          "**오주의 마법사** — smart parking on a physical mini lot. I started with **ESP32 firmware** and **UDP/TCP comms**; for the final I owned the **PyQt control room** and kept integration demos alive (**webcams**, **LPR dialogs**, gate UI).",
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
        summary:
          "**ShopPinkki** mart cart — I handled **owner-tracking perception**: detect, track, **re-ID**, keep ID when people cross. Most commits are in the **vision stack** plus **LCD/QR** demo tweaks.",
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
          {
            type: "video",
            src: "PRISMIC_TRACKING_REID",
            caption: "YOLO + ByteTrack + ReID on mart footage",
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
        summary:
          "**EduPing** on pingdergarten — I owned **browser robot UX** and the **high-five closed loop** (**depth stream**, hand track, **IK→FK feedback**). ~**68 commits** on **physical-ai-repo-2**.",
        rolePoints: [
          "**EduPing** browser + high-five (~**68 commits**)",
          "**Depth WebSocket**, **MediaPipe** hands, **TRAC-IK** residual fix",
          "Wake-word hook + final **Q&A** pages",
        ],
        contributions: [
          "**High-five**: **D435** zstd WS → browser **point cloud** → **TRAC-IK** + **FK residual** loop.",
          "Left arm **IK mirror-solve** on right **TRAC-IK** group when left shoulder could not open.",
          "**Vue 3 + Three.js** robot web: depth tab, **URDF GLB**, **Z-up→Y-up** fix.",
          "**Attendance** UI — face detect + greeting trigger.",
          "**Mugunghwa** dance recording UI; emotion capture for portal photos.",
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
          { type: "gif", src: "PRISMIC_HIFIVE", caption: "EduPing high-five demo (GIF)" },
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
      ready: "준비됐습니다 — 들어가 보세요",
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
      hintTouch: "조이스틱 · E · 메뉴(≡)",
      mobileInteract: "열기",
      visualCaptionTouch: "3D · 드래그 회전 · 스와이프로 스크롤",
      menuOpen: "메뉴 열기",
      menuClose: "메뉴 닫기",
      menuTitle: "프로젝트 · 조작",
      detail3dShow: "3D 보기",
      detail3dHide: "3D 숨기기",
    },
    intro: {
      eyebrow: "현장 랩 · PDF 아님",
      role: "Physical AI · 로봇 · 비전-UI",
      lead: "부트캠프 **팀 프로젝트를** **3D 미로로** 옮긴 포트폴리오입니다. **{stationFirst}→{stationLast}** 스테이션을 순서대로 열면 **IK 튜닝**과 **실물 하이파이브를** 직접 확인할 수 있고, 각 스테이션에는 **제가 기여한 작업만** 담았습니다.",
      returnWelcome:
        "탐색 위치와 스테이션 진행이 저장되어 있습니다. 미로에서 이어서 진행할 수 있습니다.",
      touchNote: "모바일: **조이스틱** · **E로** 열기 · **메뉴(≡)** 에서 상태·프로젝트",
      edu: "유타대학교 게임학 학사 · 2024",
      controlsTitle: "조작 방법",
      controls: [
        { keys: "W A S D", label: "걷기 — 키를 누르고 있으면 이동" },
        { keys: "E", label: "문·프로젝트·출구 열기" },
        { keys: "1 – {projectLast}", label: "프로젝트로 바로 이동 (해금 후)" },
        { keys: "Esc", label: "패널 닫고 미로로 돌아가기" },
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
      bio: "**유타대** 게임 전공(2024)입니다. 현재 **Physical AI** — **로봇·비전·UI** 관련 작업을 하고 있습니다. 카메라는 **PyQt**나 **브라우저 UI**에 연결하고, **시뮬**에서 먼저 확인할 수 있으면 그렇게 한 뒤 실물로 옮깁니다. **3D** 작업 때 익힌 공간 감각은 **teleop**과 UI 배치에 아직도 사용하고 있습니다.",
      strengths: [
        "**시뮬·벤치**에서 먼저 확인한 뒤 로봇에 올립니다",
        "**MediaPipe**, **YOLO/ByteTrack/ReID**, 브라우저 **D435**",
        "**ROS 2**, **TRAC-IK**, 듀얼암 **teleop**, **IK/FK** 튜닝",
      ],
      galleryTitle: "영상",
      media: [
        {
          type: "video",
          src: "assets/about/high-five-demo.mp4",
          caption: "EduPing — OpenArm 실물 하이파이브",
        },
        {
          type: "video",
          src: "assets/about/hri-lab.webm",
          caption: "하이파이브 로봇 — 실험실 상호작용 테스트",
        },
        {
          type: "video",
          src: "assets/about/high-five-sim.webm",
          caption: "브라우저 IK 시뮬 — 파란/빨간 볼",
        },
        { type: "gif", src: "PRISMIC_HIFIVE", caption: "하이파이브 (뎁스 + 암)" },
        { type: "gif", src: "PRISMIC_SIM", caption: "브라우저 IK 튜닝 루프" },
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
      scrollHintTouch: "위아래로 스와이프해 전체를 읽어 주세요",
      myRoleLabel: "제 역할",
      deckLabel: "팀 발표",
      sourcesTitle: "출처",
      sources: [
        {
          label: "GitHub · **joey114132**",
          url: `https://github.com/${SITE.github.username}`,
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
            "**Gesto** — 웹캠 **MediaPipe→LSTM→pynput로** **PPT/YouTube** 제어; **PyQt6 셸·데이터셋 도구를** 담당",
          myRole:
            "**PyQt6 UI** (~1,600+ 라인), **MediaPipe→LSTM** 연동, **LSTM 데이터셋**·일부 학습, **Rat Labyrinth** · deeplearning-repo-4 · **14 commits**",
          learned:
            "**카메라·트리거·인식** 워커 스레드; **6,276** `.npy` 시퀀스(**30×21×3**); 팀 덱 **평균 F1 ~74%**, **Swipe Left ~0.89** (**LSTM v1→v4**)",
        },
        {
          key: "iot",
          date: "2026.02 · IoT 2조",
          summary:
            "**오주의 마법사** — **ESP32-CAM** 회전 타워·게이트 미니 주차장 + 데모 날 살린 **PyQt6** 관제실",
          myRole:
            "**ESP32** 주차 안내 펌웨어(**UDP/TCP**, **33바이트** 패킷), 최종 주 **PyQt** 관제 UI — 멀티캠, **PaddleOCR LPR**, 웹캠 복구",
          learned:
            "타워+게이트+LPR 한 타임라인; 각도 나쁠 때 수동 LPR; 팀 덱 **번호판 ~94.3%**, **TC 전부 통과**, 리프트 **±2mm**",
        },
        {
          key: "ros",
          date: "2026.03–04 · ROS 2조 (삥끼랩)",
          summary:
            "**쑈삥끼** — **Pinky Pro** 매장 카트: **YOLOv8→ByteTrack→ReID** 팔로우 모드 (**ROS 2 Jazzy** + **Nav2**)",
          myRole:
            "주인 추적 **인식 스택** — detect/track/**ReID**, **Safe-ID**, **NCNN 보내기**; ros-repo-2 · **9 commits**",
          deck: SITE.links.shopPinkkiDeck,
          learned:
            "락 후 **5프레임 Safe-ID**; 사람 교차 시 **OSNet→MobileNetV3**+HSV 폴백; 매장 녹화본 E2E 지연 튜닝(덱 슬라이드)",
        },
        {
          key: "pai",
          date: "2026.04–06 · 팀 EduPing",
          summary:
            "**pingdergarten / EduPing** — 유치원 보조 로봇: 브라우저 teleop, 뎁스 하이파이브, 출석 플로우",
          myRole:
            "최종 발표: **등하원·하이파이브**, **무궁화꽃**, **일과 보고서**; **robot-web** UX, **D435** 스트림, **TRAC-IK/FK** · physical-ai-repo-2 · **37 commits**",
          deck: SITE.links.pingdergartenDeck,
          learned:
            "**D435 zstd WS → 브라우저 포인트클라우드 → TRAC-IK → FK 잔차**; **OpenArm** 오차 **~28cm→~2cm**; 하드웨어 전 **MuJoCo** 트윈",
        },
      ],
      learnedTitle: "배워간 기술",
      learned: [
        "**PyQt6 + 워커 스레드** — 비전 추론을 UI 밖으로 (Gesto, IoT 관제실)",
        "**제스처·LSTM 파이프라인** — **MediaPipe 21점→30프레임**, 데이터셋 도구, **pynput** 액션 매핑",
        "**임베디드 통신** — **ESP32 UDP/TCP**, 디바이스 패킷, 게이트·타워를 한 타임라인에",
        "**ROS 2 인식** — **YOLO+ByteTrack+ReID**, 토픽 타이밍, 매장 영상 지연 프로파일링",
        "**sim→real teleop** — 브라우저 **RealSense**, **TRAC-IK/FK** 잔차 튜닝, **Three.js URDF**",
        "게임학교 **3D 공간 감각** → 미로 배치, 로봇 패널, teleop UX",
      ],
      presentTitle: "지금",
      present: [
        "**라이브 데모**와 이 **인터랙티브 포트폴리오** 다듬기",
        "**EduPing** 반복 개선 — 뎁스 UX, 댄스 재생, 출석 플로우",
        "캡스톤이 생생할 때 **sim→real** 패턴 문서화",
      ],
      futureTitle: "앞으로",
      future: [
        "**HRI**와 조작 UX를 신경 쓰는 **풀스택 로봇 제품** 출시",
        "**오픈소스 로보틱스** 기여 — MoveIt, ROS, 재현 가능한 sim 스택",
        "비전 + 모션을 아우르는 **Physical AI** 산업·연구 역할로 성장",
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
        "현장 메모 · 미로가 버벅이면 GPU가 제대로 일하는 증거",
        "현장 메모 · 시뮬 먼저, 로봇 나중 — 아직도 제 신조",
        "현장 메모 · 패널마다 제가 손댄 부분만, 팀 전체 슬라이드 아님",
        "현장 메모 · 네 게이트 후 출구 — 스피드런 스킵 없음",
        "현장 메모 · 게임학교 공간 감각 → teleop 배치에 아직도 씀",
      ],
    },
    panel: {
      role: "담당 역할",
      contributions: "구현 내용",
      skills: "사용 기술",
      techniques: "접근 방식",
      obstacles: "어려웠던 점",
      outcomes: "결과물",
      visualAids: "시각 자료",
      stack: "기술 스택",
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
        highlights: [
          "웹캠 손동작 → **PPT·YouTube** 핸즈프리 제어",
          "**PyQt6** UI 약 1,600+ 라인 — 실시간 피드, 모드, **워커 스레드**",
          "**LSTM 데이터셋** 상당 부분 수집·정리; **일부 직접 학습**",
          "최종 발표 **평균 F1 약 74%** (**LSTM v1→v4**)",
        ],
        summary:
          "발표 시 **PPT·YouTube를** 키보드 없이 돌리는 작업을 진행했습니다. **PyQt** 셸과 **MediaPipe→LSTM→pynput** 연결, **학습 데이터** 수집, **LSTM** 일부 학습, **Rat Labyrinth**·기말 QA까지 담당했습니다.",
        rolePoints: [
          "**PyQt6** + **MediaPipe→LSTM** 파이프라인 (트리거, 모드, 임계값)",
          "**LSTM 데이터셋** 수집 + **일부 학습**",
          "**Rat Labyrinth** 게임 모드",
        ],
        contributions: [
          "**ModeController** — 인식 제스처를 **pynput** 키 입력으로 매핑.",
          "**MediaPipe + LSTM** — 트리거 on/off, 모드별 검출, 신뢰도 임계값.",
          "**PyQt6 UI** (~1,600+ 라인): 웹캠, 모드, 게이지; **워커 스레드로** UI 응답 유지.",
          "**LSTM 데이터셋**: `.npy` (**30×21×3**), 수집 툴, 팀 매뉴얼.",
          "**LSTM v1→v4** 체크포인트 일부 직접 학습 — 팀과 공유, 실제 학습 런은 돌림.",
          "**Rat Labyrinth** 제스처 레지스트리 연동.",
          "기말 전 **트리거·PPT·YouTube** QA.",
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
          "**21점** → **30프레임** → **LSTM**; **11차원 피처**.",
          "**카메라/트리거/검출** 워커 분리 — UI 응답 유지.",
          "모드별 **pynput** 키 출력 **레지스트리**.",
        ],
        obstacles: [
          {
            title: "처음엔 **학습 데이터** 들쭉날쭉",
            body: "수집 프레임워크·매뉴얼 후 **6,276 시퀀스** **30프레임** 보간 재수집.",
          },
          { title: "추론 시 **UI 멈춤**", body: "시퀀스 그림대로 **스레드** 분리." },
          {
            title: "일부 제스처 늦게 잡힘",
            body: "데이터 추가 + **LSTM v1→v4**; **~74% F1**, **Swipe Left ~0.89**.",
          },
        ],
        outcomes: [
          "기말: **PPT + YouTube + Rat Labyrinth**, 웹캠만.",
          "팀 덱 — 아키텍처, **11-D**, **F1** 그래프.",
          "수업 후에도 쓰던 **PyQt + MediaPipe** 구조.",
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
          {
            type: "gif",
            src: "PRISMIC_GESTO_YOUTUBE",
            caption: "YouTube 모드 — 재생/볼륨/전체화면",
          },
          { type: "gif", src: "PRISMIC_GESTO_WORKING", caption: "인식 활성 — LSTM → pynput" },
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
          "실물 **로타리 주차 타워** — **ESP32-CAM**, 게이트, 리프트",
          "초반 **UDP/TCP**: 다중 CAM GUI, **33바이트 패킷**, 주차 안내 **펌웨어**",
          "후반 **PyQt 관제** — **PaddleOCR LPR** 창, 디바이스 클라이언트, **웹캠** 안정화",
          "팀 덱: 번호판 **~94.3%**, **TC 통과**, 리프트 **±2 mm**",
        ],
        summary:
          "미니어처 주차 타워 프로젝트입니다. **ESP32** 펌웨어와 **UDP/TCP** 통신부터 담당했고, 기말에는 **PyQt** 관제실과 통합 데모(**웹캠**, **LPR**)를 맞췄습니다.",
        rolePoints: [
          "**ESP32** 주차 안내 펌웨어 + **UDP/TCP** 통신",
          "**PyQt** 관제실 — 다중 웹캠, **LPR** 창, 디바이스 클라이언트",
          "자동화 전 **PaddleOCR** 검증 UI",
        ],
        contributions: [
          "**ESP32** 주차 안내 펌웨어 — **IR 4구역**, **WiFi TCP**, **PING/PONG**, LCD.",
          "다중 **ESP32-CAM UDP** + **33바이트** 패킷 포맷.",
          "**PyQt6** 관제: 다중 웹캠, 연결 상태, 전송 매니저.",
          "입·출차 **LPR** 테스트 창 — 자동화 전 번호판 확인.",
          "데모 노트북 **웹캠 끊김** 수정 (**OpenCV**, USB 재열거, 재시도).",
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
          "**PyQt** ↔ 팀 **FastAPI**; 카메라 **UDP**; 장비 **33바이트 TCP**.",
          "카메라 **워커 스레드** — HMI 응답 유지.",
          "각도 나쁠 때 **PaddleOCR LPR** 수동 오버라이드.",
        ],
        obstacles: [
          { title: "통합 데모 중 **웹캠** 끊김", body: "재시도 + 디바이스 인덱스 + 경고 UI." },
          { title: "창이 너무 많음", body: "타워·게이트·안내를 **PyQt** 타임라인 하나로." },
          { title: "**LPR** 각도 틀림", body: "스냅샷 확인·수동 입력; 팀 미들웨어 **~94%**." },
        ],
        outcomes: [
          "미니 로트 **입차→주차→요금→출차** 데모.",
          "팀 덱 **TC** 전항 PASS, 기술 보고서 **TR**.",
          "갤러리에 실물 프로토 + 팀 덱.",
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
          "**Pinky Pro** 미니 마트 **Owner 추적** 데모",
          "**YOLOv8 + ByteTrack + ReID**, **5프레임 Safe-ID**",
          "**ReID** **OSNet → MobileNetV3**; **Pi 5 NCNN**",
          "마트 녹화 **지연** 측정; 덱 영상으로 임계값 조정",
        ],
        summary:
          "쑈삥끼 마트 카트 프로젝트입니다. 고객 추종 **비전 스택**(검출·트래킹·**ReID**)과 **LCD·QR** 온카트 쪽을 담당했습니다.",
        rolePoints: [
          "**ROS** 그래프에 **YOLOv8 + ByteTrack**",
          "**Safe-ID** + **ReID** 교체 (**MobileNetV3**)",
          "마트 영상 **지연** 프로파일링, **NCNN** 실험",
        ],
        contributions: [
          "**Owner 추적**: **YOLOv8** + CNN **ReID** + IoU; **5프레임 Safe-ID**.",
          "**ReID** **OSNet → MobileNetV3** + 색상 폴백; **NCNN**(Pi 5).",
          "**ROS** 인식 그래프에 **ByteTrack** 연동.",
          "마트 녹화 **E2E 지연**; 덱 영상 임계값 튜닝.",
          "기말 데모 **LCD·QR** 배치.",
        ],
        skills: [
          { category: "ROS 2", items: ["Jazzy", "Perception 노드", "토픽 타이밍"] },
          { category: "비전·ML", items: ["YOLOv8", "ByteTrack", "torchreid", "NCNN"] },
          { category: "시스템", items: ["지연 측정", "멀티 카메라", "온로봇 UI"] },
        ],
        techniques: [
          "**검출 → 트래크 → ReID**; 마트 영상으로 임계값 조정.",
          "**Safe-ID** 동안 **ReID** 생략 — **Pi** 부담 감소.",
          "**NCNN** 온카트 추론 실험.",
        ],
        obstacles: [
          { title: "사람 지나갈 때 **ID 스왑**", body: "**ReID** 키우고 트랙 생명주기 조정." },
          {
            title: "**지연**으로 추적 늦음",
            body: "파이프라인 지연 재고, **Safe-ID**·임계값 보완.",
          },
          { title: "인형 데모 **오검출**", body: "**YOLO** 클래스·**ROI** 분리." },
        ],
        outcomes: [
          "팀 통합 마트 영상에서 **추종** 안정화.",
          "**shoppinkki.pdf** 인식 파트.",
          "엣지용 **NCNN** 파일.",
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
          {
            type: "video",
            src: "PRISMIC_TRACKING_REID",
            caption: "YOLO + ByteTrack + ReID 마트 영상",
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
          "**뎁스 하이파이브**: 손 3D → **TRAC-IK**; 빗나감 **~20–28cm → ~2cm**",
          "**MuJoCo 트윈** 후 실물 **OpenArm** 데모",
          "**Vue + Three.js** — **D435** 포인트클라우드, 등하원, 율동 UI",
          "최종 **Q&A** 페이지(등하원·**무궁화**·포털) 작성",
        ],
        summary:
          "핑더가든 **EduPing** 프로젝트입니다. 브라우저 로봇 UI와 **하이파이브**(**뎁스**→손→**IK→FK**) 폐루프를 담당했습니다. **physical-ai-repo-2** 커밋 약 68건입니다.",
        rolePoints: [
          "**EduPing** 브라우저 + **하이파이브**",
          "**뎁스 WS**, **MediaPipe** 손, **TRAC-IK** 잔차 보정",
          "웨이크워드 + 최종 **Q&A** 페이지",
        ],
        contributions: [
          "**하이파이브**: **D435** zstd WS → **포인트클라우드** → **TRAC-IK** + **FK 잔차** 루프.",
          "좌팔 **IK 미러 솔브**(우측 **TRAC-IK** 그룹).",
          "**Vue3 + Three.js**: **URDF GLB**, **Z-up→Y-up** 회전 1회.",
          "**등하원** UI — 얼굴 인식 + 인사 트리거.",
          "**무궁화** 녹화·재생 UI; 포털 감정 캡처.",
          "**MuJoCo 트윈**; **D435** 스트리머 **cv_bridge** ABI → 시스템 Python.",
          "최종 **Q&A** 슬라이드.",
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
          "**IK→FK 잔차** 폐루프로 아이 손 추종.",
          "좌어깨 한계 시 **TRAC-IK 미러 솔브**.",
          "브라우저 **뎁스 뷰** 기준 **MuJoCo** 메쉬 정합.",
          "**MediaPipe** 메인 스레드; **zstd**는 **Worker**.",
        ],
        obstacles: [
          {
            title: "**IK** 나와도 하이파이브 빗나감",
            body: "**FK 잔차** 루프·어깨 높이 캡·리치 박스 튜닝.",
          },
          {
            title: "**뎁스 뷰** 멈춤",
            body: "**cv_bridge** ABI → **D435** 스트리머 시스템 Python.",
          },
          { title: "**URDF** 렉·뒤집힘", body: "**DAE→GLB**; **Z-up→Y-up** 1회만." },
          { title: "**moveit_servo PSM** 데드락", body: "**JointTrajectory** 스무딩 우회." },
        ],
        outcomes: [
          "실물 **하이파이브** — 갤러리 영상.",
          "브라우저 **뎁스·등하원·율동** 재생.",
          "최종 **Q&A** 페이지 배포.",
          "**URDF** 좌표 수정은 이 포트폴리오 미로에도 재사용.",
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
          { type: "gif", src: "PRISMIC_HIFIVE", caption: "EduPing 하이파이브 데모 (GIF)" },
          { type: "gif", src: "PRISMIC_SIM", caption: "IK 잔차 루프 — 블루·레드 볼 (GIF)" },
          {
            type: "gif",
            src: "PRISMIC_MUGUNGHWA",
            caption: "무궁화 리듬 율동 — 동작 녹화 UI (GIF)",
          },
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

export function inferMediaType(src, declared) {
  if (declared === "video" || VIDEO_EXT.test(src)) return "video";
  if (declared === "gif" || GIF_EXT.test(src)) return "gif";
  return "image";
}

export function prioritizeMedia(media) {
  return [...media]
    .map((m) => {
      const src = resolveMediaSrc(m.src);
      const type = inferMediaType(src, m.type);
      return { ...m, src, type };
    })
    .sort((a, b) => MEDIA_PRIORITY[a.type] - MEDIA_PRIORITY[b.type]);
}

/** System language first; localStorage only after manual toggle. */
export function detectLanguage() {
  const { lang, langManual } = SITE.storage;
  if (localStorage.getItem(langManual) === "1") {
    const stored = localStorage.getItem(lang);
    if (stored === "en" || stored === "ko") return stored;
  }
  return (navigator.language || "ko").toLowerCase().startsWith("ko") ? "ko" : "en";
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
      for (const m of p.media ?? []) add(m.src);
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
