import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

export function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-bg text-ink">
      {/* ───────── 헤더 ───────── */}
      <header className="sticky top-0 z-50 bg-bg border-b border-line">
        <div className="max-w-6xl mx-auto px-6 md:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <span className="text-lg font-bold tracking-tight">SQLD.lab</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="px-4 py-1.5 text-sm font-medium text-ink-secondary hover:text-ink transition-colors"
            >
              로그인
            </button>
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="px-5 py-1.5 bg-ink text-bg text-sm font-medium rounded-md hover:opacity-90 active:scale-95 transition-all"
            >
              회원가입
            </button>
          </div>
        </div>
      </header>

      <main>
        {/* ───────── 히어로 ───────── */}
        <section className="max-w-5xl mx-auto px-6 md:px-8 py-20 md:py-24 flex flex-col items-center text-center">
          <div className="mb-6 px-3 py-1 bg-bg-secondary border border-line rounded-full inline-flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-success" />
            <span className="text-[11px] font-mono uppercase tracking-widest text-ink-secondary">
              Latest Batch · 2026 Exam Prep Active
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.15] max-w-4xl mb-8">
            SQLD 자격증 취득을 위한
            <br className="hidden md:block" /> 가장 정교한 연습
          </h1>

          <p className="text-ink-secondary text-base md:text-lg max-w-2xl mb-12 leading-relaxed">
            최신 기출 분석을 바탕으로 한 무제한 모의고사와 실시간 오답 분석 리포트.
            전문적인 커리큘럼을 통해 데이터베이스 실무 능력과 합격 가능성을 정밀하게 측정하세요.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="px-7 py-3.5 bg-ink text-bg font-bold rounded-md hover:bg-ink-secondary transition-colors flex items-center justify-center gap-2"
            >
              지금 시작하기
              <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
            </button>
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="px-7 py-3.5 bg-bg border border-line-strong text-ink font-bold rounded-md hover:bg-bg-secondary transition-colors"
            >
              체험판 문제 풀기
            </button>
          </div>
        </section>

        {/* ───────── 피처 카드 ───────── */}
        <section id="features" className="bg-bg-secondary border-y border-line py-20 md:py-24">
          <div className="max-w-6xl mx-auto px-6 md:px-8">
            <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 mb-12">
              <div className="max-w-xl">
                <h2 className="text-2xl md:text-3xl font-medium tracking-tight mb-3">
                  정교하게 설계된 학습 모드
                </h2>
                <p className="text-ink-secondary text-sm">
                  단순한 암기가 아닌 데이터베이스의 논리적 이해를 돕는 네 가지 핵심 모드를 제공합니다.
                </p>
              </div>
              <div className="flex items-center gap-2 text-accent text-[11px] font-mono uppercase tracking-widest">
                <span className="material-symbols-outlined text-[16px]">verified</span>
                Data Analyst Certified Content
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              <FeatureCard
                icon="timer"
                tag="EXAM READY"
                tagColor="text-accent"
                title="Full-length Mode"
                body="실제 시험과 동일한 문항 수와 제한 시간을 통해 실전 감각을 극대화합니다."
              />
              <FeatureCard
                icon="category"
                tag="FOCUSED"
                tagColor="text-ink-secondary"
                title="Topic-based"
                body="데이터 모델링, SQL 기본/활용 등 취약한 단원만 집중적으로 학습합니다."
              />
              <FeatureCard
                icon="query_stats"
                tag="ADAPTIVE"
                tagColor="text-danger"
                title="Weakness Discovery"
                body="AI가 분석한 오답 패턴을 기반으로 당신이 놓치기 쉬운 문항을 우선 배치합니다."
              />
              <FeatureCard
                icon="auto_stories"
                tag="REVIEW"
                tagColor="text-success"
                title="Review Mode"
                body="풀이한 모든 문제에 대한 상세 해설과 SQL 쿼리 실행 계획 설명을 제공합니다."
              />
            </div>
          </div>
        </section>

        {/* ───────── 스탯 (벤토 그리드) ───────── */}
        <section id="stats" className="max-w-6xl mx-auto px-6 md:px-8 py-20 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5">
              <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-6 leading-tight">
                데이터로 증명되는
                <br />
                학습 성장의 궤적
              </h2>
              <p className="text-ink-secondary mb-8 leading-relaxed">
                단순히 점수를 확인하는 것을 넘어, 주제별 이해도와 문제 풀이 속도 변화를 시각화하여
                보여줍니다. SQLD.lab의 대시보드는 당신의 학습 효율을 정밀하게 가이드합니다.
              </p>
              <ul className="space-y-3 text-sm">
                <BulletItem>단원별 정답률 추이 분석</BulletItem>
                <BulletItem>합격 안정권 진입 여부 실시간 예측</BulletItem>
                <BulletItem>전체 사용자 대비 나의 위치 (Percentile)</BulletItem>
              </ul>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Weekly Progress */}
              <div className="bg-bg p-6 border border-line rounded-lg flex flex-col justify-between">
                <div>
                  <p className="text-[11px] font-mono uppercase text-ink-tertiary mb-1">
                    Weekly Progress
                  </p>
                  <h4 className="font-mono text-3xl font-medium tabular">+15.4%</h4>
                </div>
                <div className="mt-8 flex items-end gap-1 h-20">
                  <div className="flex-1 bg-bg-secondary rounded-t" style={{ height: '40%' }} />
                  <div className="flex-1 bg-bg-secondary rounded-t" style={{ height: '60%' }} />
                  <div className="flex-1 bg-bg-tertiary rounded-t" style={{ height: '80%' }} />
                  <div className="flex-1 bg-bg-secondary rounded-t" style={{ height: '50%' }} />
                  <div className="flex-1 bg-ink rounded-t" style={{ height: '100%' }} />
                </div>
              </div>

              {/* Total Accuracy */}
              <div className="bg-bg p-6 border border-line rounded-lg">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <p className="text-[11px] font-mono uppercase text-ink-tertiary mb-1">
                      Total Accuracy
                    </p>
                    <h4 className="font-mono text-3xl font-medium tabular">82%</h4>
                  </div>
                  <span className="material-symbols-outlined text-accent text-[40px]">
                    track_changes
                  </span>
                </div>
                <div className="w-full bg-bg-secondary h-2 rounded-full overflow-hidden">
                  <div className="bg-accent h-full" style={{ width: '82%' }} />
                </div>
                <p className="mt-4 text-[11px] text-ink-secondary font-medium">
                  합격 기준(60%) 보다 22% 높음
                </p>
              </div>

              {/* Learning Time + Rank */}
              <div className="bg-ink p-6 rounded-lg sm:col-span-2 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="text-center sm:text-left">
                  <p className="text-[11px] font-mono uppercase text-ink-tertiary opacity-80 mb-1">
                    Learning Time
                  </p>
                  <h4 className="font-mono text-2xl font-medium text-bg tabular">124h 45m</h4>
                </div>
                <div className="hidden sm:block w-px h-12 bg-bg/20" />
                <div className="text-center sm:text-left">
                  <p className="text-[11px] font-mono uppercase text-ink-tertiary opacity-80 mb-1">
                    Simulated Rank
                  </p>
                  <h4 className="font-mono text-2xl font-medium text-bg tabular">Top 4.2%</h4>
                </div>
                <button
                  type="button"
                  onClick={() => navigate('/dashboard')}
                  className="w-full sm:w-auto px-5 py-2.5 bg-bg text-ink text-sm font-bold rounded-md hover:bg-bg-secondary transition-colors"
                >
                  전체 분석 리포트 보기
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ───────── 최종 CTA ───────── */}
        <section className="bg-bg-secondary border-t border-line py-20 md:py-24 text-center px-6">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
            지금 SQL 전문 지식의 여정을 시작하세요
          </h2>
          <p className="text-ink-secondary max-w-xl mx-auto mb-10 leading-relaxed">
            수천 명의 합격생이 증명한 체계적인 SQLD 학습 시스템.
            <br className="hidden sm:block" />
            복잡한 SQL 구문도 원리부터 차근차근 학습할 수 있습니다.
          </p>
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="px-10 py-4 bg-ink text-bg font-bold rounded-md hover:bg-ink-secondary shadow-subtle active:scale-[0.98] transition-all"
          >
            무료 계정 생성하기
          </button>
        </section>
      </main>

      {/* ───────── 푸터 ───────── */}
      <footer className="bg-bg border-t border-line">
        <div className="max-w-6xl mx-auto px-6 md:px-8 py-8 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div className="flex flex-col gap-1.5 text-center md:text-left">
            <span className="font-bold">SQLD.lab</span>
            <p className="text-xs text-ink-tertiary">
              © 2026 SQLD.lab. Scholarly Minimalism for Database Professionals.
            </p>
          </div>
          <div className="flex justify-center gap-6 text-xs text-ink-secondary">
            <a href="#" className="hover:text-ink transition-colors">Terms</a>
            <a href="#" className="hover:text-ink transition-colors underline">Privacy</a>
            <a href="#" className="hover:text-ink transition-colors">Support</a>
            <a href="#" className="hover:text-ink transition-colors">API</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────

interface FeatureCardProps {
  icon: string;
  tag: string;
  tagColor: string;
  title: string;
  body: string;
}

function FeatureCard({ icon, tag, tagColor, title, body }: FeatureCardProps) {
  return (
    <div className="bg-bg p-5 border border-line rounded-lg hover:border-ink transition-colors group">
      <div className="w-10 h-10 bg-bg-secondary rounded flex items-center justify-center mb-6 text-ink group-hover:bg-ink group-hover:text-bg transition-all">
        <span className="material-symbols-outlined text-[22px]">{icon}</span>
      </div>
      <span
        className={cn(
          'inline-block px-2 py-0.5 bg-bg-secondary text-[10px] font-bold rounded mb-3 tracking-wider',
          tagColor,
        )}
      >
        {tag}
      </span>
      <h3 className="font-medium mb-2">{title}</h3>
      <p className="text-ink-secondary text-sm leading-relaxed">{body}</p>
    </div>
  );
}

function BulletItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2.5">
      <span className="material-symbols-outlined text-success text-[18px] mt-0.5">
        check_circle
      </span>
      <span className="text-ink">{children}</span>
    </li>
  );
}
