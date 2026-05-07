import { useMockExamStore, selectCurrentItem } from '@/store/mockExamStore';
import { formatTimer, cn } from '@/lib/utils';

/**
 * 타이머 색상 — 남은 시간대별로 변화
 *  > 30분: 기본
 *  10–30분: warning
 *  < 10분: danger (pulse)
 */
function timerTone(remainingSec: number): 'default' | 'warning' | 'danger' {
  if (remainingSec < 600) return 'danger';
  if (remainingSec < 1800) return 'warning';
  return 'default';
}

export function ExamTopBar() {
  const remainingSec = useMockExamStore((s) => s.remainingSec);
  const currentItem = useMockExamStore(selectCurrentItem);

  const tone = timerTone(remainingSec);
  const subjectLabel = currentItem
    ? `${currentItem.question.topic.subject}과목 · ${currentItem.question.topic.name}`
    : '시험 진행 중';

  return (
    <header className="sticky top-0 z-50 w-full bg-bg border-b border-line h-16 flex items-center justify-between px-6 md:px-8">
      <div className="flex items-center gap-6 md:gap-8 min-w-0">
        <span className="text-xl font-bold tracking-tight shrink-0">SQLD.lab</span>
        <div className="hidden md:flex flex-col min-w-0">
          <span className="text-sm font-medium truncate">SQLD 제 38회 기출 변형</span>
          <span className="text-[11px] text-ink-secondary truncate">{subjectLabel}</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div
          className={cn(
            'flex items-center gap-2 px-4 py-2 rounded-lg border bg-bg-secondary',
            tone === 'default' && 'border-line',
            tone === 'warning' && 'border-warning/40 bg-warning-soft',
            tone === 'danger' && 'border-danger/40 bg-danger-soft',
          )}
        >
          <span className="material-symbols-outlined text-[20px] text-ink-secondary">
            timer
          </span>
          <span
            className={cn(
              'font-mono text-base font-bold tracking-wider tabular',
              tone === 'default' && 'text-ink',
              tone === 'warning' && 'text-warning',
              tone === 'danger' && 'text-danger animate-pulse',
            )}
          >
            {formatTimer(remainingSec)}
          </span>
        </div>
      </div>
    </header>
  );
}
