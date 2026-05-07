import { useMockExamStore, selectCurrentItem } from '@/store/mockExamStore';
import { cn } from '@/lib/utils';

/** SQL 키워드 하이라이트 — paper 디자인에 맞춰 미니멀하게 */
const SQL_KEYWORDS = new Set([
  'SELECT', 'FROM', 'WHERE', 'AND', 'OR', 'NOT', 'IN', 'EXISTS', 'IS', 'NULL',
  'JOIN', 'LEFT', 'RIGHT', 'INNER', 'OUTER', 'ON', 'GROUP', 'BY', 'HAVING',
  'ORDER', 'ASC', 'DESC', 'LIMIT', 'INSERT', 'INTO', 'VALUES', 'UPDATE', 'SET',
  'DELETE', 'MERGE', 'WHEN', 'MATCHED', 'THEN', 'ROLLUP', 'CUBE', 'AS', 'CASE',
  'PARTITION', 'OVER',
]);

function HighlightedSQL({ source }: { source: string }) {
  // 토큰화: 단어 / 문자열 / 숫자 / 그 외
  const tokens = source.split(/('[^']*'|\b\d+\b|\w+|\s+|[^\w\s])/g).filter(Boolean);

  return (
    <pre className="bg-bg-secondary rounded-lg p-5 border border-line font-mono text-sm leading-6 overflow-x-auto">
      <code>
        {tokens.map((tok, i) => {
          if (/^'[^']*'$/.test(tok) || /^\d+$/.test(tok)) {
            return (
              <span key={i} className="text-success">
                {tok}
              </span>
            );
          }
          if (SQL_KEYWORDS.has(tok.toUpperCase())) {
            return (
              <span key={i} className="text-accent">
                {tok}
              </span>
            );
          }
          return <span key={i}>{tok}</span>;
        })}
      </code>
    </pre>
  );
}

export function QuestionCard() {
  const currentItem = useMockExamStore(selectCurrentItem);
  const selectOption = useMockExamStore((s) => s.selectOption);

  if (!currentItem) {
    return <div className="text-sm text-ink-secondary">문제를 불러오는 중…</div>;
  }

  const { question, selectedOptionId, displayOrder } = currentItem;

  return (
    <div className="space-y-7">
      {/* 메타 + 본문 */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="bg-ink text-bg font-mono text-[11px] font-medium px-2 py-1 rounded">
            QUESTION {String(displayOrder).padStart(2, '0')}
          </span>
          <span className="text-xs text-ink-secondary">배점 2.0</span>
          <span className="text-xs text-ink-tertiary">·</span>
          <span className="text-xs text-ink-secondary">
            난이도{' '}
            {question.difficulty === 'easy' ? '하' : question.difficulty === 'hard' ? '상' : '중'}
          </span>
        </div>
        <h2 className="text-xl md:text-2xl font-medium leading-relaxed text-ink">
          {question.questionText}
        </h2>
      </div>

      {/* SQL 코드 */}
      {question.sqlSnippet && <HighlightedSQL source={question.sqlSnippet} />}

      {/* 선택지 */}
      <div className="space-y-3">
        {question.options.map((opt) => {
          const isSelected = selectedOptionId === opt.id;
          return (
            <label
              key={opt.id}
              className={cn(
                'group flex items-start gap-4 p-5 rounded-lg cursor-pointer transition-all active:scale-[0.99]',
                isSelected
                  ? 'border-2 border-ink bg-bg'
                  : 'border border-line hover:border-ink bg-bg/60 hover:bg-bg',
              )}
            >
              <input
                type="radio"
                name={`question-${question.id}`}
                checked={isSelected}
                onChange={() => selectOption(opt.id)}
                className="mt-1 w-4 h-4 accent-ink border-line shrink-0"
              />
              <span
                className={cn(
                  'text-[15px] leading-relaxed',
                  isSelected ? 'font-medium text-ink' : 'text-ink',
                )}
              >
                {opt.displayOrder}. {opt.optionText}
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
}
