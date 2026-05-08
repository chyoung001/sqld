import type { MockExam, MockExamItem } from '@/types';
import { buildMockExam } from './mockExam';

// =====================================================================
// 데모용 — 사용자가 *틀린* 문항의 displayOrder
// 분포: 1과목 3개 + 2과목 9개 = 12개 오답 (38/50 정답 = 76점)
// =====================================================================
const WRONG_ORDERS = new Set([
  // 1과목 — 정규화 토픽에 집중 (정규화 0/3 = 약점)
  1, 4, 9,
  // 2과목 — 서브쿼리 / 윈도우 / JOIN 위주
  12, 22, 31, // 서브쿼리 3개
  14, 24, // 윈도우 2개
  13, 21, // JOIN 2개
  19, // GROUP_HAVING 1개
  25, // DML 1개
]);

// 다시 볼 문제로 표시한 displayOrder (4개)
const MARKED_ORDERS = new Set([5, 13, 22, 25]);

// =====================================================================
// 채점된 mock 결과 빌드 — GET /mock-exams/:id/result 응답 형태
// =====================================================================
export function buildMockResult(id: number = 8): MockExam {
  const exam = buildMockExam(id);
  if (!exam.items) throw new Error('mock exam without items');

  const items: MockExamItem[] = exam.items.map((item) => {
    const correctOpt = item.question.options.find((o) => o.isCorrect);
    if (!correctOpt) {
      // 정답 정보가 없으면 미답변 처리 — 데이터 일관성 가드
      return { ...item, isCorrect: null };
    }

    const isWrong = WRONG_ORDERS.has(item.displayOrder);
    const wrongOpt = item.question.options.find((o) => !o.isCorrect);

    return {
      ...item,
      selectedOptionId: isWrong && wrongOpt ? wrongOpt.id : correctOpt.id,
      isCorrect: !isWrong,
      marked: MARKED_ORDERS.has(item.displayOrder),
      // 문항당 소요시간 — 데모용으로 다양하게 (60~140초)
      timeSpentSec: 60 + ((item.displayOrder * 13) % 80),
      changeCount: item.displayOrder % 7 === 0 ? 1 : 0,
      inNotebook: false,
    };
  });

  // 점수 계산 — 각 문항 2점 (50문항 = 100점)
  const subj1Correct = items.filter(
    (i) => i.question.topic.subject === 1 && i.isCorrect,
  ).length;
  const subj2Correct = items.filter(
    (i) => i.question.topic.subject === 2 && i.isCorrect,
  ).length;

  return {
    ...exam,
    items,
    submittedAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    status: 'submitted',
    score: (subj1Correct + subj2Correct) * 2,
    scoreSubject1: subj1Correct * 2,
    scoreSubject2: subj2Correct * 2,
  };
}

// =====================================================================
// 컴포넌트에서 쓸 derived 함수들
// =====================================================================

export interface SubjectBreakdown {
  subject: 1 | 2;
  total: number;
  correct: number;
  accuracyPct: number;
  passSafe: boolean; // 40% 이상이면 true
}

export function computeSubjectBreakdown(items: MockExamItem[]): SubjectBreakdown[] {
  const result: SubjectBreakdown[] = [];
  for (const subject of [1, 2] as const) {
    const subjectItems = items.filter((i) => i.question.topic.subject === subject);
    const total = subjectItems.length;
    const correct = subjectItems.filter((i) => i.isCorrect).length;
    const pct = total > 0 ? (correct / total) * 100 : 0;
    result.push({
      subject,
      total,
      correct,
      accuracyPct: pct,
      passSafe: pct >= 40,
    });
  }
  return result;
}

export interface TopicAccuracyEntry {
  topicName: string;
  total: number;
  correct: number;
  accuracyPct: number;
}

export function computeTopicAccuracy(items: MockExamItem[]): TopicAccuracyEntry[] {
  const map = new Map<string, { total: number; correct: number }>();
  for (const item of items) {
    const key = item.question.topic.name;
    const cur = map.get(key) ?? { total: 0, correct: 0 };
    cur.total += 1;
    if (item.isCorrect) cur.correct += 1;
    map.set(key, cur);
  }
  return Array.from(map.entries())
    .map(([topicName, { total, correct }]) => ({
      topicName,
      total,
      correct,
      accuracyPct: total > 0 ? (correct / total) * 100 : 0,
    }))
    .sort((a, b) => a.accuracyPct - b.accuracyPct);
}

/** 합격 판정 — 총점 60+ 그리고 과목별 40%+ */
export function computePassStatus(
  totalScore: number,
  breakdown: SubjectBreakdown[],
): string {
  if (totalScore < 60) return '불합격: 총점 미달';
  for (const b of breakdown) {
    if (!b.passSafe) return `불합격: ${b.subject}과목 과락`;
  }
  return '합격';
}
