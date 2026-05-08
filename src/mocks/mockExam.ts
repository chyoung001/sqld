import type { MockExam, MockExamItem, Question } from '@/types';

// =====================================================================
// 토픽 매핑 (스키마 seed_topics.sql과 일치)
// =====================================================================
const TOPIC = {
  // 1과목
  엔터티:        { id: 2,  subject: 1 as const, name: '엔터티' },
  속성:          { id: 3,  subject: 1 as const, name: '속성' },
  관계:          { id: 4,  subject: 1 as const, name: '관계' },
  식별자:        { id: 5,  subject: 1 as const, name: '식별자' },
  정규화:        { id: 6,  subject: 1 as const, name: '정규화' },
  반정규화:      { id: 7,  subject: 1 as const, name: '반정규화' },
  // 2과목
  SELECT:        { id: 12, subject: 2 as const, name: 'SELECT 문' },
  WHERE:         { id: 14, subject: 2 as const, name: 'WHERE 절' },
  GROUP_HAVING:  { id: 15, subject: 2 as const, name: 'GROUP BY/HAVING' },
  ORDER:         { id: 16, subject: 2 as const, name: 'ORDER BY 절' },
  JOIN:          { id: 17, subject: 2 as const, name: 'JOIN' },
  서브쿼리:      { id: 19, subject: 2 as const, name: '서브쿼리' },
  그룹함수:      { id: 21, subject: 2 as const, name: '그룹 함수' },
  윈도우함수:    { id: 22, subject: 2 as const, name: '윈도우 함수' },
  DML:           { id: 25, subject: 2 as const, name: 'DML' },
};

// =====================================================================
// 디테일 문항 — 실제 SQLD 스타일
// =====================================================================
const DETAILED: Question[] = [
  {
    id: 101,
    topic: TOPIC.정규화,
    difficulty: 'medium',
    questionText: '다음 중 제3정규형(3NF)을 만족하지 않는 테이블의 예시로 가장 적절한 것은?',
    options: [
      { id: 1011, displayOrder: 1, optionText: '주문(주문번호, 고객번호, 주문일자)' },
      { id: 1012, displayOrder: 2, optionText: '사원(사번, 이름, 부서코드, 부서명)' },
      { id: 1013, displayOrder: 3, optionText: '제품(제품코드, 제품명, 단가)' },
      { id: 1014, displayOrder: 4, optionText: '고객(고객번호, 이름, 전화번호)' },
    ],
    explanation:
      '② 사원 테이블에서 부서명은 부서코드에 종속되므로 이행적 종속이 발생함. 이를 제거하려면 부서 테이블을 분리해야 3NF 만족.',
  },
  {
    id: 102,
    topic: TOPIC.식별자,
    difficulty: 'medium',
    questionText: '본질식별자와 인조식별자에 대한 설명으로 옳지 않은 것은?',
    options: [
      { id: 1021, displayOrder: 1, optionText: '본질식별자는 업무에 의해 만들어지는 식별자이다' },
      { id: 1022, displayOrder: 2, optionText: '인조식별자는 시스템에서 임의로 부여한 일련번호이다' },
      { id: 1023, displayOrder: 3, optionText: '인조식별자가 본질식별자보다 항상 좋은 선택이다' },
      { id: 1024, displayOrder: 4, optionText: '본질식별자는 업무 변경 시 변경될 가능성이 있다' },
    ],
    explanation:
      '③ 인조식별자가 항상 더 좋은 것은 아님. 업무적 의미가 사라지고 인덱스 추가 비용 발생. 상황에 따라 선택.',
  },
  {
    id: 103,
    topic: TOPIC.엔터티,
    difficulty: 'easy',
    questionText: '엔터티가 가져야 할 특성으로 옳지 않은 것은?',
    options: [
      { id: 1031, displayOrder: 1, optionText: '두 개 이상의 인스턴스를 가져야 한다' },
      { id: 1032, displayOrder: 2, optionText: '반드시 속성을 가져야 한다' },
      { id: 1033, displayOrder: 3, optionText: '다른 엔터티와 최소 한 개 이상의 관계를 가져야 한다' },
      { id: 1034, displayOrder: 4, optionText: '식별자가 반드시 한 개여야 한다' },
    ],
    explanation:
      '④ 엔터티는 식별자가 반드시 *한 개여야* 하는 것이 아니라 *유일한 식별자가 있어야* 함 (복합 식별자 가능).',
  },
  {
    id: 104,
    topic: TOPIC.GROUP_HAVING,
    difficulty: 'medium',
    questionText: 'WHERE 절과 HAVING 절에 대한 설명으로 옳은 것은?',
    options: [
      { id: 1041, displayOrder: 1, optionText: 'WHERE는 그룹화 후 조건, HAVING은 그룹화 전 조건이다' },
      { id: 1042, displayOrder: 2, optionText: 'HAVING 절에는 집계 함수를 사용할 수 없다' },
      { id: 1043, displayOrder: 3, optionText: 'WHERE 절은 GROUP BY 이전 단계에서 행을 필터링한다' },
      { id: 1044, displayOrder: 4, optionText: '두 절은 서로 동일한 의미이며 교환 가능하다' },
    ],
    explanation:
      '③ WHERE는 GROUP BY 전에 행을 필터링, HAVING은 GROUP BY 후 그룹에 대한 조건. ②는 반대 (HAVING에서 집계함수 사용 가능).',
  },
  {
    id: 105,
    topic: TOPIC.서브쿼리,
    difficulty: 'medium',
    questionText:
      '다음 SQL의 결과 행 수로 옳은 것은? (EMPLOYEE 100행, DEPARTMENT 10행 중 서울 소재 부서 3개, 서울 부서 소속 사원 25명)',
    sqlSnippet: `SELECT EMP_NO
FROM EMPLOYEE
WHERE DEPT_NO IN (
  SELECT DEPT_NO
  FROM DEPARTMENT
  WHERE LOCATION = 'SEOUL'
);`,
    options: [
      { id: 1051, displayOrder: 1, optionText: '3' },
      { id: 1052, displayOrder: 2, optionText: '10' },
      { id: 1053, displayOrder: 3, optionText: '25' },
      { id: 1054, displayOrder: 4, optionText: '100' },
    ],
    explanation:
      'IN 서브쿼리는 메인 쿼리의 DEPT_NO가 서브쿼리 결과(서울 부서 3개의 DEPT_NO)에 포함되는 행을 반환. 서울 부서 소속 사원 25명이 출력.',
  },
  {
    id: 106,
    topic: TOPIC.JOIN,
    difficulty: 'medium',
    questionText:
      '다음 SQL의 결과 행 수는? (A 테이블 5행, B 테이블 3행, A.id = B.a_id로 매칭되는 행 2쌍)',
    sqlSnippet: `SELECT *
FROM A LEFT OUTER JOIN B
  ON A.id = B.a_id;`,
    options: [
      { id: 1061, displayOrder: 1, optionText: '2' },
      { id: 1062, displayOrder: 2, optionText: '3' },
      { id: 1063, displayOrder: 3, optionText: '5' },
      { id: 1064, displayOrder: 4, optionText: '15' },
    ],
    explanation:
      'LEFT OUTER JOIN은 좌측(A) 모든 행을 보존. 매칭 안 되는 A의 3행은 B 컬럼이 NULL로 채워짐. 총 5행.',
  },
  {
    id: 107,
    topic: TOPIC.윈도우함수,
    difficulty: 'medium',
    questionText: 'RANK()와 DENSE_RANK()의 차이로 옳은 것은?',
    options: [
      { id: 1071, displayOrder: 1, optionText: 'RANK는 동순위 시 다음 순위를 건너뛰지 않고, DENSE_RANK는 건너뛴다' },
      { id: 1072, displayOrder: 2, optionText: 'RANK는 동순위 시 다음 순위를 건너뛰고, DENSE_RANK는 건너뛰지 않는다' },
      { id: 1073, displayOrder: 3, optionText: '두 함수는 동일한 결과를 반환한다' },
      { id: 1074, displayOrder: 4, optionText: 'DENSE_RANK는 NULL 값을 처리할 수 있다' },
    ],
    explanation: '② RANK는 1, 1, 3 식 (2를 건너뜀). DENSE_RANK는 1, 1, 2 식 (건너뛰지 않음).',
  },
  {
    id: 108,
    topic: TOPIC.그룹함수,
    difficulty: 'hard',
    questionText: '다음 SQL의 결과로 옳은 것은?',
    sqlSnippet: `SELECT DEPT, JOB, SUM(SAL)
FROM EMPLOYEE
GROUP BY ROLLUP(DEPT, JOB);`,
    options: [
      { id: 1081, displayOrder: 1, optionText: '(DEPT, JOB) 조합과 DEPT 소계, 전체 합계' },
      { id: 1082, displayOrder: 2, optionText: '(DEPT, JOB) 조합과 JOB 소계, 전체 합계' },
      { id: 1083, displayOrder: 3, optionText: '모든 가능한 조합의 소계' },
      { id: 1084, displayOrder: 4, optionText: 'DEPT와 JOB의 단순 GROUP BY와 동일' },
    ],
    explanation:
      '① ROLLUP(A, B)는 (A, B), (A), () 단계의 소계 생성. 즉 부서×직무, 부서별 소계, 전체 합계.',
  },
  {
    id: 109,
    topic: TOPIC.DML,
    difficulty: 'medium',
    questionText: 'MERGE 문에 대한 설명으로 옳지 않은 것은?',
    options: [
      { id: 1091, displayOrder: 1, optionText: 'INSERT, UPDATE, DELETE를 한 번에 처리할 수 있다' },
      { id: 1092, displayOrder: 2, optionText: 'WHEN MATCHED THEN과 WHEN NOT MATCHED THEN으로 분기한다' },
      { id: 1093, displayOrder: 3, optionText: 'MERGE는 항상 새 행을 INSERT만 수행한다' },
      { id: 1094, displayOrder: 4, optionText: 'ON 절로 매칭 조건을 지정한다' },
    ],
    explanation:
      '③ MERGE는 매칭 여부에 따라 INSERT 또는 UPDATE를 선택적으로 수행. INSERT만 하는 것이 아님.',
  },
  {
    id: 110,
    topic: TOPIC.정규화,
    difficulty: 'medium',
    questionText: '제2정규형(2NF)이 위반되는 경우에 해당하는 것은?',
    options: [
      { id: 1101, displayOrder: 1, optionText: '비식별자 속성이 기본키 일부에만 종속되는 경우 (부분 함수 종속)' },
      { id: 1102, displayOrder: 2, optionText: '비식별자 속성이 다른 비식별자에 종속되는 경우 (이행적 종속)' },
      { id: 1103, displayOrder: 3, optionText: '같은 값이 여러 행에 반복되는 경우' },
      { id: 1104, displayOrder: 4, optionText: '하나의 속성이 여러 값을 가지는 경우 (다치 종속)' },
    ],
    explanation:
      '① 2NF는 부분 함수 종속 제거. ②는 3NF, ④는 4NF 위반.',
  },
];

// =====================================================================
// 스텁 문항 자동 생성 — 모자라는 만큼 채움
// =====================================================================
function makeStub(id: number, topic: typeof TOPIC[keyof typeof TOPIC]): Question {
  return {
    id,
    topic,
    difficulty: 'medium',
    questionText: `[샘플] ${topic.name}에 관한 설명으로 옳은 것은?`,
    options: [
      { id: id * 10 + 1, displayOrder: 1, optionText: `${topic.name} 관련 보기 1`, isCorrect: false },
      { id: id * 10 + 2, displayOrder: 2, optionText: `${topic.name} 관련 보기 2 (정답)`, isCorrect: true },
      { id: id * 10 + 3, displayOrder: 3, optionText: `${topic.name} 관련 보기 3`, isCorrect: false },
      { id: id * 10 + 4, displayOrder: 4, optionText: `${topic.name} 관련 보기 4`, isCorrect: false },
    ],
    explanation: `${topic.name} 토픽 샘플 해설입니다.`,
  };
}

// =====================================================================
// 디테일 문제 정답 키 — questionId → 정답 옵션 displayOrder
// =====================================================================
const ANSWER_KEY: Record<number, number> = {
  101: 2, // 정규화: ② 사원 테이블
  102: 3, // 식별자: ③ 인조식별자가 항상 좋다 = 잘못된 설명
  103: 4, // 엔터티: ④ 식별자 한 개
  104: 3, // GROUP BY/HAVING: ③ WHERE는 GROUP BY 전
  105: 3, // 서브쿼리: ③ 25
  106: 3, // JOIN: ③ 5 (LEFT OUTER JOIN, 좌측 보존)
  107: 2, // 윈도우: ② RANK는 건너뜀, DENSE_RANK는 안 건너뜀
  108: 1, // 그룹함수: ① ROLLUP
  109: 3, // DML: ③ MERGE는 INSERT만 = 틀림
  110: 1, // 정규화: ① 부분 함수 종속
};

// =====================================================================
// 50문항 빌드 — 1과목 10 + 2과목 40
// =====================================================================
function applyAnswerKey(q: Question): Question {
  // 스텁은 makeStub에서 이미 isCorrect 세팅됨, 디테일만 후처리
  if (q.options.some((o) => o.isCorrect)) return q;
  const correctOrder = ANSWER_KEY[q.id];
  if (!correctOrder) return q;
  return {
    ...q,
    options: q.options.map((o) => ({
      ...o,
      isCorrect: o.displayOrder === correctOrder,
    })),
  };
}

function buildQuestionPool(): Question[] {
  const subj1Detailed = DETAILED.filter((q) => q.topic.subject === 1).map(applyAnswerKey);
  const subj2Detailed = DETAILED.filter((q) => q.topic.subject === 2).map(applyAnswerKey);

  // 1과목 10문항 = 디테일(4) + 스텁(6)
  const subj1Stubs = [TOPIC.엔터티, TOPIC.속성, TOPIC.관계, TOPIC.식별자, TOPIC.정규화, TOPIC.반정규화]
    .map((t, i) => makeStub(200 + i, t));
  const subj1: Question[] = [...subj1Detailed, ...subj1Stubs].slice(0, 10);

  // 2과목 40문항 = 디테일(6) + 스텁(34)
  const subj2Topics = [
    TOPIC.SELECT, TOPIC.WHERE, TOPIC.GROUP_HAVING, TOPIC.ORDER,
    TOPIC.JOIN, TOPIC.서브쿼리, TOPIC.그룹함수, TOPIC.윈도우함수, TOPIC.DML,
  ];
  const subj2Stubs: Question[] = [];
  for (let i = 0; i < 34; i++) {
    subj2Stubs.push(makeStub(300 + i, subj2Topics[i % subj2Topics.length]));
  }
  const subj2: Question[] = [...subj2Detailed, ...subj2Stubs].slice(0, 40);

  return [...subj1, ...subj2];
}

// =====================================================================
// 진행 중 모의고사 — GET /mock-exams/:id 응답 형태로
// =====================================================================
let _cachedPool: Question[] | null = null;

/** 다른 mock에서 question을 ID로 참조할 때 사용 (notebook 등) */
export function getMockQuestionById(id: number): Question | undefined {
  if (!_cachedPool) _cachedPool = buildQuestionPool();
  return _cachedPool.find((q) => q.id === id);
}

export function buildMockExam(id: number = 8): MockExam {
  const questions = _cachedPool ?? (_cachedPool = buildQuestionPool());

  const items: MockExamItem[] = questions.map((q, idx) => ({
    displayOrder: idx + 1,
    question: q,
    selectedOptionId: null,
    marked: false,
    timeSpentSec: 0,
    changeCount: 0,
  }));

  return {
    id,
    startedAt: new Date(Date.now() - 42 * 60 * 1000).toISOString(),
    timeLimitSec: 5400, // 90분
    remainingSec: 2853, // 47:33 남음 (데모용 의도적 시작점)
    status: 'in_progress',
    items,
  };
}
