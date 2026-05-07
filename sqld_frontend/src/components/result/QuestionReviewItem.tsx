import { Chip } from '@/components/ui/Chip';
import { cn, formatSeconds } from '@/lib/utils';
import type { MockExamItem } from '@/types';

const OPTION_LABELS = ['①', '②', '③', '④', '⑤'];

interface Props {
  item: MockExamItem;
  expanded: boolean;
  inNotebook: boolean;
  onToggleExpand: () => void;
  onToggleNotebook: () => void;
}

export function QuestionReviewItem({
  item,
  expanded,
  inNotebook,
  onToggleExpand,
  onToggleNotebook,
}: Props) {
  const { question, selectedOptionId, isCorrect, marked, timeSpentSec } = item;

  return (
    <div
      className={cn(
        'rounded-md border transition-colors',
        expanded ? 'border-line-strong bg-bg' : 'border-line bg-bg',
      )}
    >
      {/* 헤더 — 항상 보임, 클릭 시 토글 */}
      <button
        type="button"
        onClick={onToggleExpand}
        className="w-full px-3 py-2.5 flex flex-col gap-1.5 text-left hover:bg-bg-secondary transition-colors"
        aria-expanded={expanded}
      >
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm font-medium tabular">Q{item.displayOrder}</span>
          <Chip tone={isCorrect ? 'success' : 'danger'}>
            {isCorrect ? '정답' : '오답'}
          </Chip>
          <Chip tone="accent">
            {question.topic.subject}과목 · {question.topic.name}
          </Chip>
          <div className="ml-auto flex items-center gap-2 text-ink-tertiary">
            {marked && (
              <span
                className="w-1.5 h-1.5 rounded-full bg-warning"
                aria-label="다시 볼 문제 표시됨"
              />
            )}
            {expanded && (
              <span className="text-[11px] tabular">
                소요 {formatSeconds(timeSpentSec)}
              </span>
            )}
            <span className="text-xs">{expanded ? '▴' : '▾'}</span>
          </div>
        </div>
        {!expanded && (
          <p className="text-xs text-ink-secondary truncate pl-9">
            {question.questionText}
          </p>
        )}
      </button>

      {/* 펼침 컨텐츠 */}
      {expanded && (
        <div className="px-4 pb-4 pt-2">
          <p className="text-sm leading-relaxed mb-3">{question.questionText}</p>

          {question.sqlSnippet && (
            <pre className="bg-bg-secondary rounded px-3 py-2.5 text-xs leading-relaxed mb-3 overflow-x-auto">
              {question.sqlSnippet}
            </pre>
          )}

          {/* 옵션 — 내 답 / 정답 강조 */}
          <div className="flex flex-col gap-1.5 mb-3">
            {question.options.map((opt, idx) => {
              const isUserAnswer = opt.id === selectedOptionId;
              const isCorrectOpt = opt.isCorrect === true;

              return (
                <div
                  key={opt.id}
                  className={cn(
                    'flex items-start gap-3 px-3 py-2 rounded-md border text-sm',
                    isCorrectOpt && 'bg-success-soft border-success',
                    isUserAnswer && !isCorrectOpt && 'bg-danger-soft border-danger',
                    !isCorrectOpt && !isUserAnswer && 'bg-bg border-line',
                  )}
                >
                  <span
                    className={cn(
                      'font-medium shrink-0',
                      isCorrectOpt ? 'text-success' : isUserAnswer ? 'text-danger' : 'text-ink-secondary',
                    )}
                  >
                    {OPTION_LABELS[idx]}
                  </span>
                  <span
                    className={cn(
                      'flex-1 leading-relaxed',
                      isCorrectOpt && 'text-success',
                      isUserAnswer && !isCorrectOpt && 'text-danger',
                    )}
                  >
                    {opt.optionText}
                  </span>
                  {isUserAnswer && !isCorrectOpt && (
                    <span className="text-[11px] font-medium text-danger shrink-0">
                      내 답
                    </span>
                  )}
                  {isCorrectOpt && (
                    <span className="text-[11px] font-medium text-success shrink-0">
                      정답
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {/* 해설 */}
          {question.explanation && (
            <div className="bg-bg-secondary rounded-md px-3.5 py-3 mb-3">
              <p className="text-[11px] font-medium text-ink-secondary tracking-wide mb-1.5">
                해설
              </p>
              <p className="text-sm leading-relaxed">{question.explanation}</p>
            </div>
          )}

          {/* 액션 */}
          <div className="flex gap-2">
            <button
              type="button"
              className={cn(
                'btn flex-1',
                inNotebook && 'bg-warning-soft border-warning text-warning',
              )}
              onClick={(e) => {
                e.stopPropagation();
                onToggleNotebook();
              }}
            >
              {inNotebook ? '오답노트에 있음 ✓' : '오답노트 추가 ↗'}
            </button>
            <button type="button" className="btn flex-1">
              비슷한 유형 풀기 ↗
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
