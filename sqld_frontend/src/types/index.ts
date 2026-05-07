// API 응답 타입 — 백엔드 명세와 동기화 유지
// 새 엔드포인트 추가 시 여기에 타입 추가 후 페이지에서 import

export type Subject = 1 | 2;
export type Difficulty = 'easy' | 'medium' | 'hard';
export type ExamStatus = 'in_progress' | 'submitted' | 'expired';
export type PassPredictionLabel = '합격권' | '경계' | '위험';

export interface Topic {
  id: number;
  subject: Subject;
  name: string;
  displayOrder: number;
}

export interface QuestionOption {
  id: number;
  displayOrder: number;
  optionText: string;
  isCorrect?: boolean; // 채점 후에만 노출
}

export interface Question {
  id: number;
  topic: Pick<Topic, 'id' | 'subject' | 'name'>;
  difficulty: Difficulty;
  questionText: string;
  /** SQL 코드 블록 (있을 때만 렌더링) */
  sqlSnippet?: string;
  explanation?: string; // 채점 후에만 노출
  options: QuestionOption[];
}

export interface MockExamItem {
  displayOrder: number;
  question: Question;
  selectedOptionId: number | null;
  isCorrect?: boolean | null;
  marked: boolean;
  timeSpentSec: number;
  changeCount: number;
  inNotebook?: boolean;
}

export interface MockExam {
  id: number;
  startedAt: string;
  submittedAt?: string;
  timeLimitSec: number;
  remainingSec: number;
  status: ExamStatus;
  score?: number;
  scoreSubject1?: number;
  scoreSubject2?: number;
  items?: MockExamItem[];
}

// 대시보드 응답 (GET /stats/overview)
export interface DashboardOverview {
  passPrediction: {
    label: PassPredictionLabel;
    recentAvg: number;
    sampleSize: number;
  };
  recentAvg: { value: number; delta: number };
  totalExams: number;
  studyTime: { totalSec: number; avgPerExamSec: number };
  scoreProgression: Array<{
    id: number;
    submittedAt: string;
    score: number;
    movingAvg3: number;
  }>;
  weakTopicHint: { topicName: string; accuracyPct: number };
}

export interface TopicAccuracy {
  topicId: number;
  topicName: string;
  subject: Subject;
  totalAttempted: number;
  correct: number;
  accuracyPct: number;
}

export interface TimePace {
  avgTotalMin: number;
  limitMin: number;
  slowestTopics: Array<{ topicName: string; avgSecPerQuestion: number }>;
}

// =====================================================================
// 오답노트 (GET /notebook)
// =====================================================================
export interface NotebookEntry {
  /** notebook entry id (백엔드 PK) */
  id: number;
  /** 정답·해설 포함된 풀 Question */
  question: Question;
  firstAddedAt: string;
  lastReviewedAt: string | null;
  reviewCount: number;
  /** TRUE면 망각곡선 큐에서 제외 */
  mastered: boolean;
  /** 사용자 개인 메모 (오답 이유, 핵심 포인트 등) */
  memo?: string;
}
