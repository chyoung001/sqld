# SQLD 모의고사 — 프론트엔드

본인 SQLD 자격증 학습용 모의고사 사이트의 프론트엔드.
모의고사 + 통계 리포트가 차별화 포인트.

## 스택

- Vite + React 18 + TypeScript
- Tailwind CSS (커스텀 디자인 토큰)
- React Router v6
- Zustand (모의고사 풀이 상태)
- Recharts (점수 추이 차트)

## 실행

```bash
npm install
npm run dev          # http://localhost:5173
npm run build        # 타입체크 + 빌드
npm run type-check   # 타입체크만
npm run preview      # 빌드 결과 로컬 미리보기
```

진입 흐름: `/` (랜딩) → `/login` → "데모로 둘러보기" → `/dashboard`.

## 라우트

| Path | Page | 레이아웃 |
|---|---|---|
| `/` | LandingPage | 풀스크린 |
| `/login` | LoginPage | 풀스크린 |
| `/dashboard` | DashboardPage | AppLayout (사이드바) |
| `/mock-exams` | MockExamIntroPage | AppLayout |
| `/mock-exams/:id` | MockExamPage | 풀스크린 (집중 모드) |
| `/mock-exams/:id/result` | ResultPage | AppLayout |
| `/notebook` | NotebookPage | AppLayout |

## 폴더 구조

```
src/
├── components/
│   ├── ui/              # 재사용 프리미티브 (Card, Chip, ProgressBar)
│   ├── layout/          # AppLayout (사이드 네비)
│   ├── charts/          # ScoreLineChart
│   ├── dashboard/       # KpiCard, AiHintBanner, TimePacePanel, TopicAccuracyPanel
│   ├── mockexam/        # ExamTopBar, QuestionCard, QuestionNavigator, SubmitConfirmModal
│   ├── result/          # ResultHero, SubjectBreakdownPanel, WeakTopicsPanel,
│   │                      QuestionReviewSection, QuestionReviewItem
│   └── notebook/        # NotebookFilters, NotebookItem
├── pages/               # 라우트 단위 페이지 (위 표 참조)
├── lib/
│   └── utils.ts         # cn, formatTimer, accuracyTone, predictionTone 등
├── mocks/               # API 응답 흉내 (백엔드 연결 전 더미 데이터)
│   ├── dashboard.ts
│   ├── mockExam.ts
│   ├── mockResult.ts
│   └── notebook.ts
├── store/
│   └── mockExamStore.ts # 풀이 상태 + 자동저장 디바운스 + 타이머
├── types/
│   └── index.ts         # 백엔드 API 명세 매핑 타입
├── router.tsx           # 라우트 정의
├── main.tsx             # 진입점
└── index.css            # Tailwind + 폰트
```

## 디자인 시스템

### 색상 토큰 (`tailwind.config.js`)

```
bg          종이톤 배경 (#FAFAF7)
ink         본문 텍스트
line        경계선 (회색조)
accent      강조색 (깊은 블루)
success/warning/danger   의미색
```

### 폰트
- 본문: **Pretendard Variable** (CDN)
- 코드: **IBM Plex Mono** (Google Fonts)

### 핵심 헬퍼 (`src/lib/utils.ts`)
- `cn(...)` — 조건부 클래스 (clsx 래퍼)
- `accuracyTone(pct)` — 정답률 → success/warning/danger
- `predictionTone(label)` — 합격 예측 → 색상 토큰
- `formatTimer(sec)` — 모의고사 타이머 mm:ss

## 모의고사 풀이 상태 (`store/mockExamStore.ts`)

Zustand 단일 스토어. 핵심 동작:
- 답 변경 / 표시(별표) 토글 → `saving` 상태 전환 → 500ms 디바운스 후 `saved` + 타임스탬프
- 매초 `tickTimer()` 호출로 `remainingSec` 감소 (0 도달 시 자동 제출 훅 자리)
- 문제 이동 시 진입 시각 기록 → 문항별 소요 시간 누적
- 백엔드 연결 시 디바운스 콜백을 `setTimeout` → `PATCH` 요청으로 교체

## 백엔드 연결 시 변경 포인트

- `src/mocks/*` → 사용처에서 fetch 호출로 교체
- `src/types/index.ts`는 그대로 — 이미 API 명세와 매핑됨
- `vite.config.ts`의 `proxy` 주석 해제 (`/api` → `localhost:3000`)
- `src/lib/api.ts` 신규 — 토큰 헤더, 에러 처리, 응답 unwrap
- `mockExamStore`의 자동저장 콜백을 PATCH로 교체

## 다음 단계

1. **인증 흐름** — Zustand `auth` 스토어 + `<ProtectedRoute>` 래퍼
2. **API 레이어** — `src/lib/api.ts` (fetch 래퍼 + 토큰 저장 + 에러 처리)
3. **백엔드 연결** — mocks → 실제 fetch 교체, vite proxy 활성화
4. **타이머 서버 동기화** — 모의고사 시작 시각 서버 기준으로 일치
5. **테스트** — 핵심 헬퍼/스토어 단위 테스트 (Vitest 도입 검토)

## 메모

- `localStorage`/`sessionStorage` 사용은 신중. 모의고사 임시저장에는 유용 (브라우저 종료 대비).
- React Strict Mode가 켜져 있어 개발 시 useEffect가 두 번 실행됨. 부수 효과 idempotent하게.
- Pretendard는 CDN 로드라 첫 페인트 시 살짝 깜빡일 수 있음. 신경 쓰이면 self-host로 전환.
- 모의고사 풀이 페이지(`/mock-exams/:id`)는 사이드바 없이 풀스크린. 집중 모드 의도.
