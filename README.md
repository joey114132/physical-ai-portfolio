# Physical AI Portfolio

**이정우(Joey Lee)** 의 인터랙티브 3D 포트폴리오입니다. Three.js 미로를 걸으며 Physical AI 부트캠프에서 진행한 네 가지 팀 프로젝트를 순서대로 탐색할 수 있습니다.

- **저장소:** [github.com/joey114132/physical-ai-portfolio](https://github.com/joey114132/physical-ai-portfolio)
- **언어:** 한국어 / English (`js/i18n.js`)

## 개요

정적 HTML·CSS·JavaScript로 동작하며, 빌드 도구 없이 바로 서빙할 수 있습니다. 미로 안의 스테이션 **01→04**를 방문하면 각 프로젝트 상세 패널과 3D 프리뷰, 데모 미디어를 볼 수 있습니다.

| 순서 | 단계 | 프로젝트 | 요약 |
|------|------|----------|------|
| 01 | Deep Learning | **Gesto** | MediaPipe + LSTM 손동작으로 PPT·YouTube 제어 |
| 02 | IoT | **오주의 마법사** | ESP32-CAM·PyQt6 기반 스마트 타워 주차 |
| 03 | ROS | **쑈삥끼 (ShopPinkki)** | Pinky Pro 자율주행 마트 카트 |
| 04 | Physical AI | **pingdergarten (EduPing)** | 브라우저 로봇 UI·뎁스 하이파이브 폐루프 |

각 프로젝트의 GitHub 저장소 링크는 상세 화면 및 `js/i18n.js`의 `REPO_URLS`에 정의되어 있습니다.

## 조작법

### 데스크톱

| 입력 | 동작 |
|------|------|
| `W` `A` `S` `D` | 미로 이동 |
| `Shift` | 달리기 |
| `E` | 스테이션·출구 아치 열기 |
| `1`–`4` | 잠금 해제된 프로젝트로 바로 이동 |
| `Esc` | 패널 닫고 미로로 복귀 |

### 모바일 (터치 UI)

- **조이스틱** (좌하단): 이동
- **달리기 버튼** (우하단, 길게 누르기): `Shift`와 동일
- **E** 버튼: 상호작용
- **≡ 메뉴** (우상단): 상태, 퀘스트, 사운드, 언어, 타임라인
- **미니맵** (좌상단): 진행도 확인

조이스틱을 끝까지 밀면 자동으로 스프린트가 켜집니다.

## 로컬 실행

저장소 루트에서 정적 서버를 띄웁니다.

```zsh
cd portfolio
python3 -m http.server 8766
```

브라우저에서 [http://localhost:8766](http://localhost:8766) 을 엽니다.

> ES 모듈과 import map을 사용하므로 `file://`로 직접 열면 동작하지 않을 수 있습니다. 반드시 HTTP 서버로 서빙하세요.

## 기술 스택

- **Three.js** 0.170 (CDN import map)
- **urdf-loader** (저장소 내 URDF는 참고용, 브라우저 프리뷰는 절차적 저폴리 메시)
- 바닐라 JavaScript (모듈), CSS

성능 등급 감지(`js/perf.js`), Web Audio 효과음(`js/audio.js`), 한·영 i18n이 포함되어 있습니다.

## 디렉터리 구조

```
portfolio/
├── index.html          # 진입점, UI 마크업
├── css/style.css       # 레이아웃·미로 HUD·모바일 터치 UI
├── js/
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
