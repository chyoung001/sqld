import { useState, useMemo } from 'react';
import { Card, SectionTitle } from '@/components/ui/Card';
import { QuestionReviewItem } from './QuestionReviewItem';
import { cn } from '@/lib/utils';
import type { MockExamItem } from '@/types';

type Filter = 'all' | 'wrong' | 'marked';

interface Props {
  items: MockExamItem[];
}

export function QuestionReviewSection({ items }: Props) {
  const [filter, setFilter] = useState<Filter>('wrong');
  const [expandedOrder, setExpandedOrder] = useState<number | null>(null);
  const [notebookSet, setNotebookSet] = useState<Set<number>>(new Set());

  // 카운트는 필터와 무관하게 고정
  const counts = useMemo(
    () => ({
      all: items.length,
      wrong: items.filter((i) => i.isCorrect === false).length,
      marked: items.filter((i) => i.marked).length,
    }),
    [items],
  );

  const filtered = useMemo(() => {
    if (filter === 'wrong') return items.filter((i) => i.isCorrect === false);
    if (filter === 'marked') return items.filter((i) => i.marked);
    return items;
  }, [filter, items]);

  const toggleNotebook = (questionId: number) => {
    setNotebookSet((prev) => {
      const next = new Set(prev);
      if (next.has(questionId)) next.delete(questionId);
      else next.add(questionId);
      return next;
    });
    // TODO: 백엔드 연결 시 POST /notebook 또는 DELETE /notebook/:id
  };

  return (
    <Card className="mb-3">
      <div className="flex justify-between items-center mb-3.5">
        <SectionTitle>문항 리뷰</SectionTitle>
        <div className="flex gap-1">
          {(
            [
              ['all', `전체 ${counts.all}`],
              ['wrong', `오답 ${counts.wrong}`],
              ['marked', `표시 ${counts.marked}`],
            ] as Array<[Filter, string]>
          ).map(([key, label]) => (
            <button
              key={key}
              type="button"
              onClick={() => setFilter(key)}
              className={cn(
                'px-3 py-1 rounded text-xs transition-colors',
                filter === key
                  ? 'bg-bg-secondary text-ink font-medium'
                  : 'text-ink-secondary hover:text-ink',
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="text-sm text-ink-secondary text-center py-6">
          이 필터에 해당하는 문항이 없습니다.
        </p>
      ) : (
        <div className="flex flex-col gap-2">
          {filtered.map((item) => (
            <QuestionReviewItem
              key={item.displayOrder}
              item={item}
              expanded={expandedOrder === item.displayOrder}
              inNotebook={notebookSet.has(item.question.id)}
              onToggleExpand={() =>
                setExpandedOrder((prev) =>
                  prev === item.displayOrder ? null : item.displayOrder,
                )
              }
              onToggleNotebook={() => toggleNotebook(item.question.id)}
            />
          ))}
        </div>
      )}
    </Card>
  );
}
