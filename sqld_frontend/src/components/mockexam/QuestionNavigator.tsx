import { useMockExamStore, selectStats } from '@/store/mockExamStore';
import { cn } from '@/lib/utils';
import type { MockExamItem } from '@/types';

interface CellProps {
  item: MockExamItem;
  isCurrent: boolean;
  onClick: () => void;
}

function Cell({ item, isCurrent, onClick }: CellProps) {
  const answered = item.selectedOptionId !== null;
  const marked = item.marked;

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'aspect-square flex items-center justify-center font-mono text-[11px] rounded transition-colors',
        // 우선순위: 현재 > 표시 > 답변완료 > 미답변
        isCurrent && 'bg-bg text-ink border-2 border-ink font-bold',
        !isCurrent && marked && 'bg-warning text-ink font-bold',
        !isCurrent && !marked && answered && 'bg-ink-secondary text-bg',
        !isCurrent && !marked && !answered && 'bg-bg text-ink-secondary border border-line hover:border-ink',
      )}
      aria-current={isCurrent ? 'true' : undefined}
      aria-label={`문제 ${item.displayOrder}${answered ? ' 답변 완료' : ' 미답변'}${marked ? ', 검토 표시됨' : ''}`}
    >
      {String(item.displayOrder).padStart(2, '0')}
    </button>
  );
}

export function QuestionNavigator() {
  const exam = useMockExamStore((s) => s.exam);
  const currentDisplayOrder = useMockExamStore((s) => s.currentDisplayOrder);
  const setCurrent = useMockExamStore((s) => s.setCurrent);
  const stats = useMockExamStore(selectStats);

  if (!exam?.items) return null;

  const progressPct = stats.total > 0 ? Math.round((stats.answered / stats.total) * 100) : 0;

  return (
    <aside className="w-full md:w-80 shrink-0 border-l border-line bg-bg-secondary flex flex-col">
      {/* 답안 현황 헤더 */}
      <div className="p-6 border-b border-line">
        <h3 className="text-base font-bold mb-4">답안 현황</h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2 px-3 py-2 bg-bg rounded border border-line">
            <span className="w-3 h-3 rounded-full bg-success shrink-0" />
            <span className="text-[11px] text-ink-secondary">
              푼 문제: <span className="text-ink font-medium tabular">{stats.answered}</span>
            </span>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 bg-bg rounded border border-line">
            <span className="w-3 h-3 rounded-full bg-warning shrink-0" />
            <span className="text-[11px] text-ink-secondary">
              검토: <span className="text-ink font-medium tabular">{stats.marked}</span>
            </span>
          </div>
        </div>
      </div>

      {/* 문항 그리드 */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="grid grid-cols-5 gap-2">
          {exam.items.map((item) => (
            <Cell
              key={item.displayOrder}
              item={item}
              isCurrent={item.displayOrder === currentDisplayOrder}
              onClick={() => setCurrent(item.displayOrder)}
            />
          ))}
        </div>
      </div>

      {/* 진행률 푸터 */}
      <div className="p-6 bg-bg-tertiary/40 border-t border-line space-y-2">
        <div className="flex justify-between items-center text-[11px] text-ink-secondary">
          <span>진행률</span>
          <span className="tabular">
            {stats.answered} / {stats.total} ({progressPct}%)
          </span>
        </div>
        <div className="w-full bg-line h-1 rounded-full overflow-hidden">
          <div
            className="bg-ink h-full transition-all duration-300"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>
    </aside>
  );
}
