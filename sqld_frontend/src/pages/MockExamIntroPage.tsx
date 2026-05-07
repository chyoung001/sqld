import { useNavigate } from 'react-router-dom';

const EXAM_META = {
  id: 8,
  title: 'SQLD 정기 모의고사 #8',
  totalQuestions: 50,
  timeLimitMin: 90,
  passScore: 60,
  subjects: [
    { name: '1과목 · 데이터 모델링의 이해', count: 10 },
    { name: '2과목 · SQL 기본 및 활용', count: 40 },
  ],
};

const EXAM_RULES = [
  '시험 시작 후에는 일시정지가 불가능합니다.',
  '제한 시간이 종료되면 자동으로 답안이 제출됩니다.',
  '검토 표시한 문항은 우측 네비게이터에서 빠르게 이동할 수 있습니다.',
  '브라우저를 닫거나 새로고침하면 진행 상황이 초기화될 수 있습니다.',
];

export function MockExamIntroPage() {
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      {/* ───────── 헤더 ───────── */}
      <section className="space-y-2">
        <span className="text-[11px] font-mono uppercase tracking-widest text-ink-secondary">
          Mock Exams
        </span>
        <h1 className="text-2xl md:text-[28px] font-bold tracking-tight">
          {EXAM_META.title}
        </h1>
        <p className="text-sm text-ink-secondary">
          실제 시험과 동일한 환경에서 응시할 준비가 되셨다면 아래에서 시작하세요.
        </p>
      </section>

      {/* ───────── 시험 개요 ───────── */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <MetaCard label="QUESTIONS" value={`${EXAM_META.totalQuestions}`} suffix="문항" />
        <MetaCard label="TIME LIMIT" value={`${EXAM_META.timeLimitMin}`} suffix="분" />
        <MetaCard label="PASS SCORE" value={`${EXAM_META.passScore}`} suffix="점 이상" />
        <MetaCard label="ATTEMPTS" value="∞" suffix="무제한" />
      </section>

      {/* ───────── 과목 구성 + 유의사항 ───────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <section className="space-y-3">
          <h2 className="text-base font-bold">과목 구성</h2>
          <div className="bg-bg border border-line rounded-lg overflow-hidden">
            <div className="p-5 space-y-4">
              {EXAM_META.subjects.map((subj, idx) => (
                <div
                  key={subj.name}
                  className={
                    idx !== EXAM_META.subjects.length - 1
                      ? 'flex justify-between items-center pb-4 border-b border-bg-secondary'
                      : 'flex justify-between items-center'
                  }
                >
                  <p className="text-sm font-medium">{subj.name}</p>
                  <span className="font-mono text-sm font-bold tabular text-ink-secondary shrink-0 ml-3">
                    {subj.count}문항
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold">응시 전 확인사항</h2>
          <div className="bg-bg-secondary border-l-4 border-l-warning rounded-lg p-5">
            <ul className="space-y-2.5">
              {EXAM_RULES.map((rule) => (
                <li key={rule} className="flex items-start gap-2.5 text-sm">
                  <span className="material-symbols-outlined text-warning text-[18px] mt-0.5 shrink-0">
                    info
                  </span>
                  <span className="text-ink-secondary leading-relaxed">{rule}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>

      {/* ───────── CTA ───────── */}
      <section className="bg-ink text-bg rounded-xl p-8 flex flex-col md:flex-row md:justify-between md:items-center gap-6">
        <div className="space-y-1">
          <h3 className="text-lg font-bold">시험을 시작하시겠습니까?</h3>
          <p className="text-sm opacity-90">
            시작 버튼을 누르면 즉시 타이머가 작동하며 풀스크린 응시 모드로 전환됩니다.
          </p>
        </div>
        <div className="flex gap-3 shrink-0">
          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            className="px-5 py-3 bg-transparent border border-bg/30 text-bg rounded-lg text-sm font-medium hover:bg-bg/10 transition-colors"
          >
            나중에 응시
          </button>
          <button
            type="button"
            onClick={() => navigate(`/mock-exams/${EXAM_META.id}`)}
            className="px-6 py-3 bg-bg text-ink rounded-lg text-sm font-bold hover:bg-bg-secondary transition-colors flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[18px]">play_arrow</span>
            시험 시작하기
          </button>
        </div>
      </section>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────

interface MetaCardProps {
  label: string;
  value: string;
  suffix: string;
}

function MetaCard({ label, value, suffix }: MetaCardProps) {
  return (
    <div className="bg-bg border border-line rounded-lg p-5 flex flex-col gap-1">
      <span className="text-[11px] text-ink-secondary uppercase tracking-wider">
        {label}
      </span>
      <div className="flex items-baseline gap-1.5">
        <span className="font-mono text-2xl font-bold tabular">{value}</span>
        <span className="font-mono text-[11px] text-ink-tertiary">{suffix}</span>
      </div>
    </div>
  );
}
