# Physical AI Portfolio

**로컬 경로:** `~/PAIPortfolio` (이 저장소에 대한 심볼릭 링크)

**이정우(Joey Lee)** 의 인터랙티브 3D 포트폴리오입니다. Three.js 미로를 걸으며 Physical AI 부트캠프에서 진행한 네 가지 팀 프로젝트를 순서대로 탐색할 수 있습니다.

[![Live demo](https://img.shields.io/badge/Live-joeyleeportfolio.netlify.app-2dffb3?style=flat-square)](https://joeyleeportfolio.netlify.app/)
[![Three.js](https://img.shields.io/badge/Three.js-0.170-000000?style=flat-square&logo=threedotjs&logoColor=white)](https://threejs.org/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES_modules-F7DF1E?style=flat-square&logo=javascript&logoColor=000)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![CSS](https://img.shields.io/badge/CSS-vanilla-1572B6?style=flat-square&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![Playwright](https://img.shields.io/badge/Playwright-E2E-2EAD33?style=flat-square&logo=playwright&logoColor=white)](https://playwright.dev/)
[![Netlify](https://img.shields.io/badge/Netlify-static_hosting-00C7B7?style=flat-square&logo=netlify&logoColor=white)](https://www.netlify.com/)

- **설정:** `js/config.js` — 이름, GitHub, 연락처, 프로젝트 목록, 브레이크포인트 (하드코딩 최소화)
- **언어:** 한국어 / English (`js/i18n.js`)

## 개요

정적 HTML·CSS·JavaScript로 동작하며, 빌드 도구 없이 바로 서빙할 수 있습니다. 미로 안의 스테이션 **01→04**를 방문하면 각 프로젝트 상세 패널과 3D 프리뷰, 데모 미디어를 볼 수 있습니다. 네 스테이션을 모두 완료한 뒤 **출구 아치**에서 `E`를 누르면 **여정 기록**이 열리며, 애디닝 Physical AI 부트캠프에서 배운 내용과 프로젝트별 마일스톤을 확인할 수 있습니다.

| 순서 | 단계          | 프로젝트                    | 요약                                         |
| ---- | ------------- | --------------------------- | -------------------------------------------- |
| 01   | Deep Learning | **Gesto**                   | MediaPipe + LSTM 손동작으로 PPT·YouTube 제어 |
| 02   | IoT           | **오주의 마법사**           | ESP32-CAM·PyQt6 기반 스마트 타워 주차        |
| 03   | ROS           | **쑈삥끼 (ShopPinkki)**     | Pinky Pro 자율주행 마트 카트                 |
| 04   | Physical AI   | **pingdergarten (EduPing)** | 브라우저 로봇 UI·뎁스 하이파이브 폐루프      |

프로젝트 메타·저장소 URL은 `js/config.js`의 `PROJECTS`에서 정의하고, 문구만 `js/i18n.js`에 둡니다.

### 프로젝트 스택 · 스킬

**01 Gesto (DL)**  
![Python](https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white)
![PyQt6](https://img.shields.io/badge/PyQt6-41CD52?style=flat-square&logo=qt&logoColor=white)
![MediaPipe](https://img.shields.io/badge/MediaPipe-4285F4?style=flat-square&logo=google&logoColor=white)
![LSTM](https://img.shields.io/badge/LSTM-PyTorch-EE4C2C?style=flat-square&logo=pytorch&logoColor=white)
![OpenCV](https://img.shields.io/badge/OpenCV-5C3EE8?style=flat-square&logo=opencv&logoColor=white)
![pynput](https://img.shields.io/badge/pynput-input-555?style=flat-square)

**02 오주의 마법사 (IoT)**  
![ESP32-CAM](https://img.shields.io/badge/ESP32--CAM-embedded-E7352C?style=flat-square&logo=espressif&logoColor=white)
![Arduino](https://img.shields.io/badge/Arduino-00979D?style=flat-square&logo=arduino&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=flat-square&logo=fastapi&logoColor=white)
![PyQt6](https://img.shields.io/badge/PyQt6-41CD52?style=flat-square&logo=qt&logoColor=white)
![OpenCV](https://img.shields.io/badge/OpenCV-5C3EE8?style=flat-square&logo=opencv&logoColor=white)
![PaddleOCR](https://img.shields.io/badge/PaddleOCR-OCR-2932E1?style=flat-square)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=flat-square&logo=mysql&logoColor=white)

**03 쑈삥끼 / ShopPinkki (ROS)**  
![ROS 2](https://img.shields.io/badge/ROS_2-Jazzy-22314E?style=flat-square&logo=ros&logoColor=white)
![YOLOv8](https://img.shields.io/badge/YOLOv8-ultralytics-111?style=flat-square)
![ByteTrack](https://img.shields.io/badge/ByteTrack-tracking-555?style=flat-square)
![torchreid](https://img.shields.io/badge/torchreid-ReID-EE4C2C?style=flat-square&logo=pytorch&logoColor=white)
![MobileNetV3](https://img.shields.io/badge/MobileNetV3-TFLite-FF6F00?style=flat-square&logo=tensorflow&logoColor=white)
![NCNN](https://img.shields.io/badge/NCNN-edge_infer-0052CC?style=flat-square)
![OpenCV](https://img.shields.io/badge/OpenCV-5C3EE8?style=flat-square&logo=opencv&logoColor=white)

**04 pingdergarten / EduPing (PAI)**  
![Vue 3](https://img.shields.io/badge/Vue_3-4FC08D?style=flat-square&logo=vuedotjs&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-WebGL-000000?style=flat-square&logo=threedotjs&logoColor=white)
![MediaPipe](https://img.shields.io/badge/MediaPipe-hands-4285F4?style=flat-square&logo=google&logoColor=white)
![ROS 2](https://img.shields.io/badge/ROS_2-bridge-22314E?style=flat-square&logo=ros&logoColor=white)
![MuJoCo](https://img.shields.io/badge/MuJoCo-sim-6C5CE7?style=flat-square)
![WebRTC](https://img.shields.io/badge/WebRTC-teleop-333?style=flat-square)
![TRAC-IK](https://img.shields.io/badge/TRAC--IK-kinematics-555?style=flat-square)
![Python](https://img.shields.io/badge/Python-backend-3776AB?style=flat-square&logo=python&logoColor=white)

## 조작법

### 데스크톱

| 입력            | 동작                             |
| --------------- | -------------------------------- |
| `W` `A` `S` `D` | 미로 이동 (항상 빠른 속도)       |
| `E`             | 스테이션·출구 아치 열기          |
| `1`–`4`         | 잠금 해제된 프로젝트로 바로 이동 |
| `Esc`           | 패널 닫고 미로로 복귀            |

### 모바일 (터치 UI)

- **조이스틱** (좌하단): 이동
- **E** 버튼: 상호작용
- **≡ 메뉴** (우상단): 상태, 퀘스트, 사운드, 언어, 타임라인
- **미니맵** (좌상단): 진행도 확인

## 개발 표준

| 언어                 | 도구                    | 명령               |
| -------------------- | ----------------------- | ------------------ |
| JavaScript (ESM)     | ESLint 9                | `npm run lint`     |
| CSS                  | Stylelint (recommended) | `npm run lint:css` |
| JS / HTML / CSS / MD | Prettier                | `npm run format`   |
| 공통                 | EditorConfig            | `.editorconfig`    |

한 번에 검사: `npm run check` (lint + format check). E2E: `npm run test:all` (출구 여정·스프린트 제거 검증, Playwright Chromium 필요).

- **설정·상수:** `js/config.js` — 이름, GitHub, 프로젝트, 브레이크포인트
- **문구:** `js/i18n.js` — 한·영 UI 텍스트만 (`{placeholder}`로 config 값 주입)
- **모듈:** `import` → 상대 경로 `.js` 확장자 명시, `config` → `i18n` → 기능 모듈 순

최초 설정: `npm install` (개발 의존성만, 빌드 단계 없음).

## 로컬 실행

저장소 루트에서 정적 서버를 띄웁니다.

```zsh
cd portfolio
python3 -m http.server 8766
```

브라우저에서 [http://localhost:8766](http://localhost:8766) 을 엽니다.

> ES 모듈과 import map을 사용하므로 `file://`로 직접 열면 동작하지 않을 수 있습니다. 반드시 HTTP 서버로 서빙하세요.

## 기술 스택 (사이트)

- **Three.js** 0.170 (CDN import map) · **urdf-loader** (URDF 참고용, 브라우저 프리뷰는 `js/models.js` 절차 메시)
- 바닐라 **JavaScript (ESM)**, **CSS** — 빌드 단계 없음
- **Playwright** UI 검증 · **Netlify** 정적 호스팅
- 성능 등급(`js/perf.js`), Web Audio(`js/audio.js`), 한·영 i18n(`js/i18n.js`)

프로젝트별 스택·스킬 뱃지는 위 [프로젝트 스택 · 스킬](#프로젝트-스택--스킬)을 참고하세요. 상세 문구·태그는 `js/i18n.js`와 동기화됩니다.

## 디렉터리 구조

```
portfolio/
├── index.html          # 진입점, UI 마크업
├── css/style.css       # 레이아웃·미로 HUD·모바일 터치 UI
├── js/
│   ├── config.js       # 사이트·프로젝트·브레이크포인트 (단일 설정)
│   ├── app.js          # 앱 상태, 입력, UI 연동
│   ├── maze-scene.js   # 미로 3D·이동·가상 조이스틱
│   ├── detail-scene.js # 프로젝트 상세 3D 뷰
│   ├── i18n.js         # 문구·프로젝트 메타·미디어 URL
│   ├── models.js       # 절차적 3D 모델
│   └── ...
├── assets/
│   ├── about/          # 소개·클립
│   └── models/         # URDF/메시 (참고용)
└── README.md
```

## 배포

빌드 단계 없이 저장소 루트를 정적 사이트 publish 디렉터리로 지정하면 됩니다.

## 3D 모델

브라우저 상세 뷰어의 프리뷰는 `js/models.js`의 절차적 지오메트리를 사용합니다. 자세한 출처는 `assets/models/CREDITS.md`를 참고하세요.

## 라이선스

개인 포트폴리오 프로젝트입니다. 코드·에셋 재사용 시 별도 문의가 필요할 수 있습니다.
