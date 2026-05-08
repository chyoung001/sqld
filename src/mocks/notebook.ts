import type { NotebookEntry } from '@/types';
import { getMockQuestionById } from './mockExam';

function daysAgo(days: number): string {
  return new Date(Date.now() - days * 24 * 3600 * 1000).toISOString();
}

interface Spec {
  qId: number;
  addedDaysAgo: number;
  reviewedDaysAgo: number | null;
  reviewCount: number;
  mastered?: boolean;
  memo?: string;
}

const SPECS: Spec[] = [
  // 활성 — 정규화/JOIN/서브쿼리 약점 위주
  {
    qId: 106,
    addedDaysAgo: 5,
    reviewedDaysAgo: null,
    reviewCount: 0,
    memo:
      "Oracle 전용 (+) 표기법이 LEFT/RIGHT 어느 쪽 기준인지 계속 헷갈림. (+)가 붙은 쪽이 '데이터가 부족한 쪽(비어있는 쪽)' 임을 명심할 것.",
  },
  {
    qId: 110,
    addedDaysAgo: 7,
    reviewedDaysAgo: 3,
    reviewCount: 1,
    memo:
      '이행적 함수 종속의 정의: A→B, B→C 일 때 A→C가 성립하는 것. 3NF는 이를 제거하는 과정.',
  },
  {
    qId: 105,
    addedDaysAgo: 9,
    reviewedDaysAgo: 1,
    reviewCount: 2,
    memo: 'ANY(OR 조건)와 ALL(AND 조건) 차이점 명확히 하기. > ALL 은 최대값보다 커야 함.',
  },
  { qId: 101, addedDaysAgo: 3, reviewedDaysAgo: null, reviewCount: 0 },
  { qId: 107, addedDaysAgo: 1, reviewedDaysAgo: null, reviewCount: 0 },
  { qId: 108, addedDaysAgo: 6, reviewedDaysAgo: null, reviewCount: 0 },
  { qId: 109, addedDaysAgo: 8, reviewedDaysAgo: 4, reviewCount: 1 },
  { qId: 102, addedDaysAgo: 12, reviewedDaysAgo: 5, reviewCount: 3 },

  // 마스터됨
  { qId: 104, addedDaysAgo: 14, reviewedDaysAgo: 1, reviewCount: 5, mastered: true },
];

export function buildMockNotebook(): NotebookEntry[] {
  return SPECS.map((spec, idx): NotebookEntry => {
    const question = getMockQuestionById(spec.qId);
    if (!question) {
      throw new Error(`Mock question ${spec.qId} not found in pool`);
    }
    return {
      id: idx + 1,
      question,
      firstAddedAt: daysAgo(spec.addedDaysAgo),
      lastReviewedAt: spec.reviewedDaysAgo != null ? daysAgo(spec.reviewedDaysAgo) : null,
      reviewCount: spec.reviewCount,
      mastered: spec.mastered ?? false,
      memo: spec.memo,
    };
  });
}
