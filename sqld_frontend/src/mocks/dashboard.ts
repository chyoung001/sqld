import type { DashboardOverview, TopicAccuracy, TimePace } from '@/types';

// GET /stats/overview 응답을 흉내냄
export const MOCK_OVERVIEW: DashboardOverview = {
  passPrediction: { label: '합격권', recentAvg: 76.0, sampleSize: 3 },
  recentAvg: { value: 72, delta: 3 },
  totalExams: 8,
  studyTime: { totalSec: 51600, avgPerExamSec: 5220 },
  scoreProgression: [
    { id: 1, submittedAt: '2026-04-01', score: 52, movingAvg3: 52.0 },
    { id: 2, submittedAt: '2026-04-05', score: 58, movingAvg3: 55.0 },
    { id: 3, submittedAt: '2026-04-09', score: 62, movingAvg3: 57.3 },
    { id: 4, submittedAt: '2026-04-13', score: 60, movingAvg3: 60.0 },
    { id: 5, submittedAt: '2026-04-17', score: 68, movingAvg3: 63.3 },
    { id: 6, submittedAt: '2026-04-21', score: 70, movingAvg3: 66.0 },
    { id: 7, submittedAt: '2026-04-25', score: 74, movingAvg3: 70.7 },
    { id: 8, submittedAt: '2026-04-29', score: 76, movingAvg3: 73.3 },
  ],
  weakTopicHint: { topicName: '정규화', accuracyPct: 38.0 },
};

// GET /stats/topics
export const MOCK_TOPICS: TopicAccuracy[] = [
  { topicId: 6,  topicName: '정규화',     subject: 1, totalAttempted: 12, correct: 4,  accuracyPct: 38 },
  { topicId: 9,  topicName: '서브쿼리',   subject: 2, totalAttempted: 22, correct: 10, accuracyPct: 45 },
  { topicId: 12, topicName: '윈도우 함수', subject: 2, totalAttempted: 16, correct: 10, accuracyPct: 62 },
  { topicId: 7,  topicName: 'JOIN',       subject: 2, totalAttempted: 24, correct: 16, accuracyPct: 68 },
  { topicId: 11, topicName: '그룹 함수',   subject: 2, totalAttempted: 20, correct: 16, accuracyPct: 81 },
  { topicId: 17, topicName: 'DDL/DML',    subject: 2, totalAttempted: 18, correct: 16, accuracyPct: 88 },
];

// GET /stats/time
export const MOCK_TIME_PACE: TimePace = {
  avgTotalMin: 87,
  limitMin: 90,
  slowestTopics: [
    { topicName: '서브쿼리',    avgSecPerQuestion: 132 },
    { topicName: 'JOIN',        avgSecPerQuestion: 108 },
    { topicName: '윈도우 함수', avgSecPerQuestion: 95 },
  ],
};

// =====================================================================
// 대시보드 추가 위젯 (레퍼런스 디자인용)
// =====================================================================
export const MOCK_USER = {
  name: '김학습',
  progressPct: 85,
};

export const MOCK_QUICK_STATS = {
  overallAccuracy: 78.4,
  accuracyDelta: 2.1,
  questionsSolved: 1240,
  questionsTotal: 5000,
  studyTimeText: '42h 15m',
  simulatedRank: 142,
  rankPercentile: 4.2,
};

export type ActivityTone = 'success' | 'accent' | 'danger';

export const MOCK_RECENT_ACTIVITY: Array<{
  title: string;
  date: string;
  score: number;
  tone: ActivityTone;
}> = [
  { title: 'Full Mock Exam #12',     date: '2026.04.29', score: 84, tone: 'success' },
  { title: 'Topic: JOIN Operations', date: '2026.04.28', score: 92, tone: 'accent'  },
  { title: 'Full Mock Exam #11',     date: '2026.04.25', score: 58, tone: 'danger'  },
];

export type FocusSeverity = 'critical' | 'warning' | 'neutral';

export const MOCK_FOCUS_TOPICS: Array<{
  title: string;
  description: string;
  accuracyPct: number;
  severity: FocusSeverity;
  icon: string;
}> = [
  {
    title: 'Subqueries & Correlation',
    description: 'EXISTS / IN 연산자와 상관 서브쿼리의 동작 원리 복습.',
    accuracyPct: 42,
    severity: 'warning',
    icon: 'priority_high',
  },
  {
    title: 'Transaction Management',
    description: '격리 수준과 ACID 속성에 대한 이론 정리가 필요합니다.',
    accuracyPct: 31,
    severity: 'critical',
    icon: 'warning',
  },
  {
    title: 'Window Functions',
    description: 'RANK, DENSE_RANK, PARTITION BY 활용 문제 추가 풀이.',
    accuracyPct: 55,
    severity: 'neutral',
    icon: 'lightbulb',
  },
];
