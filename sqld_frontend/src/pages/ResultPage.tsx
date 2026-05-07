import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { QuestionReviewSection } from '@/components/result/QuestionReviewSection';
import {
  buildMockResult,
  computeSubjectBreakdown,
  computeTopicAccuracy,
  computePassStatus,
  type SubjectBreakdown,
} from '@/mocks/mockResult';

type MasteryTone = 'success' | 'ink' | 'warning' | 'danger';

function masteryTone(pct: number): MasteryTone {
  if (pct >= 85) return 'success';
  if (pct >= 60) return 'ink';
  if (pct >= 40) return 'warning';
  return 'danger';
}

const TONE_TEXT: Record<MasteryTone, string> = {
  success: 'text-success',
  ink: 'text-ink',
  warning: 'text-warning',
  danger: 'text-danger',
};

const TONE_BG: Record<MasteryTone, string> = {
  success: 'bg-success',
  ink: 'bg-ink',
  warning: 'bg-warning',
  danger: 'bg-danger',
};

export function ResultPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showReview, setShowReview] = useState(false);
  const [showAllTopics, setShowAllTopics] = useState(false);

  const result = useMemo(() => buildMockResult(Number(id) || 8), [id]);
  const items = result.items ?? [];
  const breakdown = useMemo(() => computeSubjectBreakdown(items), [items]);
  const topicAccuracy = useMemo(() => computeTopicAccuracy(items), [items]);
  const passStatus = computePassStatus(result.score ?? 0, breakdown);
  const isPass = passStatus === '합격';
  const score = result.score ?? 0;
  const previousScore = 70; // TODO: API에서 받아오기
  const scoreDelta = score - previousScore;

  const topicsToShow = showAllTopics ? topicAccuracy : topicAccuracy.slice(0, 6);
  const weakest = topicAccuracy.slice(0, 2);

  return (
    <div className="space-y-6">
      {/* ───────── 1. Hero 벤토 (점수 카드 + 메시지 카드) ───────── */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
        {/* 점수 카드 */}
        <div className="md:col-span-8 bg-bg border border-line rounded-lg p-5 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-6 gap-4">
            <div className="min-w-0">
              <h1 className="text-xl md:text-2xl font-medium tracking-tight mb-2">
                Exam Result: Full Mock #{result.id}
              </h1>
              <p className="text-sm text-ink-secondary max-w-md">
                전 과목에 걸친 SQLD 자격검정 성과 분석.
              </p>
            </div>
            <span
              className={cn(
                'px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider shrink-0',
                isPass ? 'bg-success text-bg' : 'bg-danger text-bg',
              )}
            >
              {isPass ? 'PASS' : 'FAIL'}
            </span>
          </div>

          <div className="flex items-baseline gap-3 flex-wrap">
            <span className="text-[64px] font-bold leading-none tabular">{score}</span>
            <span className="text-2xl text-ink-tertiary font-light tabular">/ 100</span>
            <div className="ml-auto text-right">
              <p
                className={cn(
                  'flex items-center justify-end gap-1 text-sm font-medium',
                  scoreDelta >= 0 ? 'text-success' : 'text-danger',
                )}
              >
                <span className="material-symbols-outlined text-[18px]">
                  {scoreDelta >= 0 ? 'trending_up' : 'trending_down'}
                </span>
                {scoreDelta >= 0 ? '+' : ''}
                {scoreDelta}점 vs. 직전
              </p>
              <p className="text-[11px] text-ink-tertiary mt-1 uppercase tracking-widest">
                Passing threshold: 60
              </p>
            </div>
          </div>
        </div>

        {/* 메시지 카드 */}
        <div className="md:col-span-4 bg-ink rounded-lg p-5 text-bg flex flex-col justify-center relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-lg font-medium mb-3">
              {isPass ? 'Well done, Architect!' : 'Keep going, Architect!'}
            </h3>
            <p className="text-sm text-ink-tertiary mb-5 leading-relaxed">
              {isPass
                ? '1과목 완성도가 높습니다. 다음 세션은 2과목의 응용 패턴에 집중해보세요.'
                : '아직 합격선까지 거리가 있습니다. 약점 토픽 복습 후 재도전해보세요.'}
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setShowReview((s) => !s)}
                className="flex-1 bg-bg text-ink py-2 rounded-lg text-[11px] font-bold uppercase tracking-wider hover:bg-bg-secondary transition-colors"
              >
                {showReview ? 'Hide' : 'Review'}
              </button>
              <button
                type="button"
                className="p-2 border border-line-strong/40 rounded-lg hover:bg-ink-secondary transition-colors"
                aria-label="Share"
              >
                <span className="material-symbols-outlined text-[20px]">share</span>
              </button>
            </div>
          </div>
          {/* 데코 아이콘 */}
          <span
            className="material-symbols-outlined absolute -right-4 -bottom-4 opacity-10 text-[120px] pointer-events-none select-none"
            style={{ fontVariationSettings: "'FILL' 1" }}
            aria-hidden
          >
            verified
          </span>
        </div>
      </div>

      {/* ───────── 2. Analysis 벤토 (도넛 + 토픽 테이블) ───────── */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
        {/* Subject Ratio */}
        <div className="md:col-span-4 bg-bg border border-line rounded-lg p-5">
          <h3 className="text-base font-medium mb-6 flex items-center gap-2">
            <span className="material-symbols-outlined text-ink-tertiary text-[20px]">
              pie_chart
            </span>
            Subject Ratio
          </h3>
          <SubjectDonut breakdown={breakdown} avgPct={Math.round(score)} />
          <div className="mt-8 space-y-3">
            {breakdown.map((b) => (
              <div key={b.subject} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      'w-3 h-3 rounded-full',
                      b.subject === 1 ? 'bg-ink' : 'bg-accent',
                    )}
                  />
                  <span className="text-sm text-ink-secondary">Subject {b.subject}</span>
                </div>
                <span className="font-mono font-bold tabular">
                  {Math.round(b.accuracyPct)}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Topic Mastery */}
        <div className="md:col-span-8 bg-bg border border-line rounded-lg p-5">
          <div className="flex justify-between items-center mb-5 flex-wrap gap-3">
            <h3 className="text-base font-medium flex items-center gap-2">
              <span className="material-symbols-outlined text-ink-tertiary text-[20px]">
                analytics
              </span>
              Topic Mastery
            </h3>
            <div className="hidden md:flex gap-4 text-[11px] text-ink-secondary">
              <Legend color="bg-success" label="Excellent" />
              <Legend color="bg-warning" label="Review" />
              <Legend color="bg-danger" label="Critical" />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b border-line">
                  <th className="pb-3 text-[11px] font-bold text-ink-tertiary uppercase tracking-widest">
                    Topic
                  </th>
                  <th className="pb-3 text-[11px] font-bold text-ink-tertiary uppercase tracking-widest">
                    Mastery
                  </th>
                  <th className="pb-3 text-[11px] font-bold text-ink-tertiary uppercase tracking-widest text-right">
                    Accuracy
                  </th>
                </tr>
              </thead>
              <tbody>
                {topicsToShow.map((t) => {
                  const tone = masteryTone(t.accuracyPct);
                  return (
                    <tr key={t.topicName} className="border-b border-bg-secondary last:border-0">
                      <td className="py-3 text-sm font-medium">
                        <span className="flex items-center gap-2">
                          {t.topicName}
                          {tone === 'warning' && (
                            <span className="material-symbols-outlined text-warning text-[16px]">
                              warning
                            </span>
                          )}
                          {tone === 'danger' && (
                            <span className="material-symbols-outlined text-danger text-[16px]">
                              error
                            </span>
                          )}
                        </span>
                      </td>
                      <td className="py-3 w-1/2">
                        <div className="w-full bg-bg-secondary h-1.5 rounded-full overflow-hidden">
                          <div
                            className={cn('h-full transition-all', TONE_BG[tone])}
                            style={{ width: `${Math.min(100, t.accuracyPct)}%` }}
                          />
                        </div>
                      </td>
                      <td
                        className={cn(
                          'py-3 text-right font-mono tabular',
                          TONE_TEXT[tone],
                          (tone === 'warning' || tone === 'danger') && 'font-bold',
                        )}
                      >
                        {Math.round(t.accuracyPct)}%
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {topicAccuracy.length > 6 && (
            <button
              type="button"
              onClick={() => setShowAllTopics((s) => !s)}
              className="w-full mt-4 py-2 text-[11px] text-ink-secondary font-bold uppercase tracking-widest hover:text-ink transition-colors"
            >
              {showAllTopics ? 'Show Less' : `Show All ${topicAccuracy.length} Topics`}
            </button>
          )}
        </div>
      </div>

      {/* ───────── 3. 액션 ───────── */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-3 py-6 border-t border-line">
        <button
          type="button"
          onClick={() => navigate('/dashboard')}
          className="w-full sm:w-auto px-7 py-3 bg-bg-secondary text-ink border border-line-strong rounded-lg text-sm font-medium hover:bg-bg-tertiary transition-colors flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          Back to Dashboard
        </button>
        <button
          type="button"
          onClick={() => navigate(`/mock-exams/${(result.id ?? 0) + 1}`)}
          className="w-full sm:w-auto px-7 py-3 bg-bg-secondary text-ink border border-line-strong rounded-lg text-sm font-medium hover:bg-bg-tertiary transition-colors flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined text-[18px]">replay</span>
          Retry Exam
        </button>
        <button
          type="button"
          onClick={() => setShowReview((s) => !s)}
          className="w-full sm:w-auto px-7 py-3 bg-ink text-bg rounded-lg text-sm font-bold hover:opacity-90 transition-all flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined text-[18px]">fact_check</span>
          {showReview ? 'Hide Review' : 'Review Incorrect Answers'}
        </button>
      </div>

      {/* ───────── 4. 추천 학습 경로 ───────── */}
      {weakest.length > 0 && (
        <div className="bg-accent-soft border border-accent/20 rounded-lg p-5 flex items-start gap-4">
          <div className="bg-accent/15 p-2 rounded-lg text-accent shrink-0">
            <span className="material-symbols-outlined">lightbulb</span>
          </div>
          <div>
            <h4 className="text-base font-medium text-accent-ink mb-1">
              Personalized Study Path
            </h4>
            <p className="text-sm text-ink-secondary leading-relaxed">
              {weakest.map((t, i) => (
                <span key={t.topicName}>
                  <strong className="text-ink">{t.topicName}</strong>
                  {i < weakest.length - 1 ? ', ' : ''}
                </span>
              ))}
              에서 약점이 발견되었습니다. 다음 모의고사 전에 해당 토픽의 핵심 개념을 복습하고
              관련 문항을 다시 풀어보는 것을 권장합니다.
            </p>
          </div>
        </div>
      )}

      {/* ───────── 5. 토글: 상세 문항 리뷰 ───────── */}
      {showReview && (
        <div className="pt-2">
          <QuestionReviewSection items={items} />
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────

function SubjectDonut({
  breakdown,
  avgPct,
}: {
  breakdown: SubjectBreakdown[];
  avgPct: number;
}) {
  const r = 70;
  const c = 2 * Math.PI * r;
  const subj1 = breakdown.find((b) => b.subject === 1);
  const subj2 = breakdown.find((b) => b.subject === 2);

  // 각 과목이 반원(c/2)을 차지. 누적이 아닌 스택형 — 레퍼런스 시각 패턴 유지.
  const subj1Visible = ((subj1?.accuracyPct ?? 0) / 100) * (c / 2);
  const subj2Visible = ((subj2?.accuracyPct ?? 0) / 100) * (c / 2);

  return (
    <div className="flex justify-center">
      <div className="relative h-40 w-40 flex items-center justify-center">
        <svg className="h-full w-full -rotate-90" viewBox="0 0 160 160">
          <circle
            cx="80"
            cy="80"
            r={r}
            fill="none"
            stroke="currentColor"
            strokeWidth="14"
            className="text-bg-secondary"
          />
          {subj1 && (
            <circle
              cx="80"
              cy="80"
              r={r}
              fill="none"
              stroke="currentColor"
              strokeWidth="14"
              strokeDasharray={c}
              strokeDashoffset={c - subj1Visible}
              className="text-ink"
            />
          )}
          {subj2 && (
            <circle
              cx="80"
              cy="80"
              r={r}
              fill="none"
              stroke="currentColor"
              strokeWidth="14"
              strokeDasharray={c}
              strokeDashoffset={c - subj2Visible}
              className="text-accent"
            />
          )}
        </svg>
        <div className="absolute text-center">
          <p className="font-mono text-2xl font-medium tabular">{avgPct}%</p>
          <p className="text-[11px] text-ink-secondary uppercase tracking-wider">Avg</p>
        </div>
      </div>
    </div>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className={cn('w-2 h-2 rounded-full', color)} />
      {label}
    </div>
  );
}
