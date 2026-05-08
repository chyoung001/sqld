import { useNavigate } from 'react-router-dom';
import { ScoreLineChart } from '@/components/charts/ScoreLineChart';
import { cn } from '@/lib/utils';
import {
  MOCK_OVERVIEW,
  MOCK_USER,
  MOCK_QUICK_STATS,
  MOCK_RECENT_ACTIVITY,
  MOCK_FOCUS_TOPICS,
  type ActivityTone,
  type FocusSeverity,
} from '@/mocks/dashboard';

const ACTIVITY_TONE: Record<ActivityTone, string> = {
  success: 'text-success',
  accent: 'text-accent',
  danger: 'text-danger',
};

const SEVERITY_BORDER: Record<FocusSeverity, string> = {
  critical: 'border-l-danger',
  warning: 'border-l-warning',
  neutral: 'border-l-ink-secondary',
};

const SEVERITY_ICON: Record<FocusSeverity, string> = {
  critical: 'text-danger',
  warning: 'text-warning',
  neutral: 'text-ink-secondary',
};

export function DashboardPage() {
  const navigate = useNavigate();
  const overview = MOCK_OVERVIEW;
  const stats = MOCK_QUICK_STATS;

  return (
    <div className="space-y-8">
      {/* ───────── 1. 환영 배너 ───────── */}
      <section className="bg-ink text-bg rounded-xl p-8 flex flex-col md:flex-row md:justify-between md:items-center gap-6 relative overflow-hidden">
        <div className="relative z-10 space-y-2">
          <h1 className="text-2xl md:text-[28px] font-bold tracking-tight">
            안녕하세요, {MOCK_USER.name}님.
          </h1>
          <p className="text-sm md:text-base opacity-90">
            SQLD 합격까지 {100 - MOCK_USER.progressPct}% 남았습니다. 오늘의 목표를 달성해보세요.
          </p>
          <div className="mt-4 flex items-center gap-3">
            <div className="h-2 w-48 bg-ink-secondary rounded-full overflow-hidden">
              <div
                className="h-full bg-accent"
                style={{ width: `${MOCK_USER.progressPct}%` }}
              />
            </div>
            <span className="text-[11px] font-mono opacity-90">
              {MOCK_USER.progressPct}% 완료
            </span>
          </div>
        </div>

        {/* 배경 데코 */}
        <span
          className="material-symbols-outlined hidden md:block absolute right-[-30px] bottom-[-30px] opacity-10 text-[180px] pointer-events-none select-none"
          aria-hidden
        >
          school
        </span>

        <button
          type="button"
          onClick={() => navigate('/mock-exams/8')}
          className="relative z-10 px-6 py-3 bg-bg text-ink rounded-lg font-bold text-sm hover:bg-bg-secondary transition-colors shrink-0"
        >
          오늘의 학습 시작
        </button>
      </section>

      {/* ───────── 2. 퀵 스탯 ───────── */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard label="OVERALL ACCURACY">
          <span className="font-mono text-2xl font-bold tabular">
            {stats.overallAccuracy}%
          </span>
          <span className="font-mono text-[11px] text-success flex items-center gap-0.5">
            <span className="material-symbols-outlined text-[14px]">arrow_upward</span>
            {stats.accuracyDelta}%
          </span>
        </StatCard>

        <StatCard label="QUESTIONS SOLVED">
          <span className="font-mono text-2xl font-bold tabular">
            {stats.questionsSolved.toLocaleString()}
          </span>
          <span className="font-mono text-[11px] text-ink-tertiary">
            / {stats.questionsTotal.toLocaleString()}
          </span>
        </StatCard>

        <StatCard label="STUDY TIME">
          <span className="font-mono text-2xl font-bold tabular">{stats.studyTimeText}</span>
          <span className="font-mono text-[11px] text-success flex items-center gap-0.5">
            <span className="material-symbols-outlined text-[14px]">bolt</span>
            Active
          </span>
        </StatCard>

        <StatCard label="SIMULATED RANK">
          <span className="font-mono text-2xl font-bold tabular">
            #{stats.simulatedRank}
          </span>
          <span className="font-mono text-[11px] text-accent font-medium">
            Top {stats.rankPercentile}%
          </span>
        </StatCard>
      </section>

      {/* ───────── 3 & 4. 최근 활동 + 정확도 추이 (벤토) ───────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <section className="lg:col-span-1 space-y-3">
          <h2 className="text-base font-bold flex items-center justify-between">
            Recent Activity
            <a href="#" className="text-[11px] font-normal text-ink-secondary underline">
              View all
            </a>
          </h2>
          <div className="bg-bg border border-line rounded-lg overflow-hidden">
            <div className="p-5 space-y-4">
              {MOCK_RECENT_ACTIVITY.map((act, idx) => (
                <div
                  key={idx}
                  className={cn(
                    'flex justify-between items-center',
                    idx !== MOCK_RECENT_ACTIVITY.length - 1 && 'pb-4 border-b border-bg-secondary',
                  )}
                >
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">{act.title}</p>
                    <p className="font-mono text-[11px] text-ink-secondary">{act.date}</p>
                  </div>
                  <span
                    className={cn(
                      'font-mono text-lg font-bold tabular shrink-0 ml-3',
                      ACTIVITY_TONE[act.tone],
                    )}
                  >
                    {act.score}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Accuracy Trend */}
        <section className="lg:col-span-2 space-y-3">
          <h2 className="text-base font-bold flex items-center justify-between">
            Accuracy Trend
            <span className="text-[11px] font-normal text-ink-secondary">
              최근 {overview.scoreProgression.length}회 모의고사
            </span>
          </h2>
          <div className="bg-bg border border-line rounded-lg p-5">
            <ScoreLineChart data={overview.scoreProgression} />
          </div>
        </section>
      </div>

      {/* ───────── 5. 추천 약점 토픽 ───────── */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold">Recommended Focus Topics</h2>
          <span className="text-[11px] text-ink-secondary">Based on recent errors</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {MOCK_FOCUS_TOPICS.map((topic) => (
            <div
              key={topic.title}
              className={cn(
                'bg-bg-secondary rounded-lg p-5 border-l-4 flex flex-col gap-3',
                SEVERITY_BORDER[topic.severity],
              )}
            >
              <div className="flex justify-between items-start">
                <span
                  className={cn(
                    'material-symbols-outlined text-[22px]',
                    SEVERITY_ICON[topic.severity],
                  )}
                >
                  {topic.icon}
                </span>
                <span className="bg-bg px-2 py-0.5 rounded border border-line font-mono text-[11px] tabular">
                  {topic.accuracyPct}% Acc.
                </span>
              </div>
              <div>
                <h3 className="font-bold text-sm mb-1">{topic.title}</h3>
                <p className="text-xs text-ink-secondary leading-relaxed">
                  {topic.description}
                </p>
              </div>
              <button
                type="button"
                onClick={() => navigate('/notebook')}
                className="mt-1 text-left text-xs font-medium text-accent hover:underline flex items-center gap-1"
              >
                Review Topic
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────

function StatCard({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="bg-bg border border-line rounded-lg p-5 flex flex-col gap-1">
      <span className="text-[11px] text-ink-secondary uppercase tracking-wider">
        {label}
      </span>
      <div className="flex items-baseline gap-2">{children}</div>
    </div>
  );
}
