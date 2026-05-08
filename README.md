# SQLD.lab

SQLD(SQL 개발자) 자격검정 대비 모의고사·학습 분석 웹 애플리케이션의 프론트엔드 프로젝트입니다.
실제 시험과 동일한 환경에서 모의고사를 응시하고, 학습 데이터를 시각화하며, 오답을 체계적으로 복습할 수 있도록 설계되었습니다.

> 현재는 **목(mock) 데이터 기반 UI 구현 단계**입니다.

---

## 🔗 데모 사이트

**[https://chyoung001.github.io/sqld/](https://chyoung001.github.io/sqld/)**

`main` 브랜치에 푸시되면 GitHub Actions가 자동으로 빌드·배포합니다. 별도 설치 없이 위 링크에서 모든 화면을 둘러볼 수 있습니다.

---

## 주요 기능

| 영역 | 설명 |
| --- | --- |
| **모의고사** | 50문항 / 90분 풀스크린 응시 환경, 1초 단위 타이머, 자동저장(500ms 디바운스), 문항 네비게이터, 검토 표시, 새로고침 경고 |
| **대시보드** | 정답률·풀이수·학습시간·랭킹 KPI, 점수 추이 라인차트, 추천 약점 토픽 카드 |
| **결과 리포트** | 과목별 점수 분해, 토픽별 정답률, 약점 토픽 하이라이트, 문항별 해설 리뷰 |
| **오답노트** | 검색·토픽 필터, 개인 메모, 복습 카운트, 마스터 토글, 망각곡선 큐 제외 처리 |
| **랜딩/로그인** | 제품 소개, 피처/스탯 섹션, 로그인 페이지 (UI만 구현) |

---

## 기술 스택

- **프레임워크**: React 18 + TypeScript (strict mode)
- **번들러**: Vite 5
- **스타일링**: Tailwind CSS 3 + 커스텀 디자인 토큰 (종이톤 베이스, 깊은 블루 강조)
- **라우팅**: React Router v6 (`createBrowserRouter`)
- **상태 관리**: Zustand (모의고사 풀이 세션)
- **차트**: Recharts
- **유틸**: clsx (`cn` 헬퍼)
- **타이포그래피**: Pretendard Variable, IBM Plex Mono
- **아이콘**: Material Symbols Outlined

---

## 시작하기

### 요구 사항
- Node.js 20 이상 권장
- npm

### 설치 및 실행

```bash
npm install
npm run dev          # 개발 서버 (http://localhost:5173)
npm run build        # 타입체크 + 프로덕션 빌드 (dist/)
npm run preview      # 빌드 결과물 로컬 확인
npm run type-check   # 타입체크만 단독 실행
```

---

## 프로젝트 구조

```
src/
├── main.tsx                    # 앱 진입점
├── router.tsx                  # 라우트 정의 (basename은 BASE_URL 기반)
├── index.css                   # Tailwind + 전역 스타일
├── lib/
│   └── utils.ts                # cn() 등 공통 유틸
├── types/
│   └── index.ts                # API 응답 타입 (백엔드 명세와 동기화)
├── store/
│   └── mockExamStore.ts        # 모의고사 풀이 세션 (Zustand)
├── mocks/                      # 백엔드 연결 전 임시 데이터
│   ├── dashboard.ts
│   ├── mockExam.ts
│   ├── mockResult.ts
│   └── notebook.ts
├── pages/                      # 라우트 단위 페이지
│   ├── LandingPage.tsx
│   ├── LoginPage.tsx
│   ├── DashboardPage.tsx
│   ├── MockExamIntroPage.tsx
│   ├── MockExamPage.tsx        # 풀스크린 (사이드바 없음)
│   ├── ResultPage.tsx
│   └── NotebookPage.tsx
└── components/
    ├── layout/AppLayout.tsx    # 사이드바 + 헤더 + 푸터 (Outlet)
    ├── ui/                     # Card, Chip, ProgressBar
    ├── charts/ScoreLineChart.tsx
    ├── dashboard/              # KpiCard, AiHintBanner, TopicAccuracyPanel, TimePacePanel
    ├── mockexam/               # ExamTopBar, QuestionCard, QuestionNavigator, SubmitConfirmModal
    ├── result/                 # ResultHero, SubjectBreakdownPanel, WeakTopicsPanel, QuestionReview*
    └── notebook/               # NotebookFilters, NotebookItem
```

---

## 라우트

| 경로 | 페이지 | 레이아웃 |
| --- | --- | --- |
| `/` | LandingPage | 자체 (헤더/푸터) |
| `/login` | LoginPage | 자체 |
| `/dashboard` | DashboardPage | AppLayout (사이드바) |
| `/mock-exams` | MockExamIntroPage | AppLayout |
| `/mock-exams/:id` | MockExamPage | **풀스크린** (집중 모드) |
| `/mock-exams/:id/result` | ResultPage | AppLayout |
| `/notebook` | NotebookPage | AppLayout |

---

## 디자인 시스템

`tailwind.config.js`에 정의된 토큰을 그대로 사용합니다.

- **컬러**
  - `bg` / `bg-secondary` / `bg-tertiary` — 종이톤 베이스
  - `ink` / `ink-secondary` / `ink-tertiary` — 텍스트 계조
  - `line` / `line-strong` — 보더
  - `accent` (`#1F5BAA`) — 깊은 블루 강조
  - `success` / `warning` / `danger` — 의미색 + soft 변형
- **폰트**: `font-sans` (Pretendard), `font-mono` (IBM Plex Mono)
- **데이터 디스플레이**: `text-display`, `text-kpi`, `.tabular`(자릿수 정렬)
- **컴포넌트 클래스**: `.btn`, `.btn-primary`, `.btn-danger` (`index.css`)

원칙: 그림자 최소화, 보더와 면 분할로 위계 표현. 숫자는 모노폰트 + tabular-nums.

---

## 백엔드 연동 가이드

목 데이터 → 실제 API로 전환할 때 손볼 지점:

- `src/types/index.ts` — API 응답 타입을 단일 출처로 사용
- `src/mocks/*` — 동일한 시그니처의 fetch 함수로 교체
- `src/store/mockExamStore.ts` — `triggerAutoSave()`, `submitExam()` 내 `TODO` 주석에 PATCH/POST 호출 추가
- `src/pages/NotebookPage.tsx` — `updateEntry`, `handleDelete` 내 `TODO` 주석 위치
- `vite.config.ts` — `server.proxy['/api']` 주석 해제 후 백엔드 주소 입력

---
## 라이선스

© 2026 SQLD.lab. All rights reserved.
