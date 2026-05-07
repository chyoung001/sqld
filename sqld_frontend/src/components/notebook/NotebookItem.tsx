import { useState } from 'react';
import { cn } from '@/lib/utils';
import type { NotebookEntry } from '@/types';

const OPTION_LABELS = ['①', '②', '③', '④', '⑤'];

interface Props {
  entry: NotebookEntry;
  expanded: boolean;
  onToggleExpand: () => void;
  onMemoChange: (memo: string) => void;
  onReview: () => void;
  onMaster: () => void;
  onUnmaster: () => void;
  onDelete: () => void;
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}.${mm}.${dd}`;
}

export function NotebookItem({
  entry,
  expanded,
  onToggleExpand,
  onMemoChange,
  onReview,
  onMaster,
  onUnmaster,
  onDelete,
}: Props) {
  const { question, firstAddedAt, mastered, memo } = entry;
  const [revealed, setRevealed] = useState(false);

  const handleDelete = () => {
    if (confirm('이 문항을 오답노트에서 제거할까요?')) onDelete();
  };

  return (
    <div className="bg-bg border border-line rounded-lg p-5 hover:border-line-strong transition-colors flex flex-col gap-4">
      {/* 헤더: 토픽 칩 + 저장일 + 삭제 */}
      <div className="flex justify-between items-start gap-3">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="px-2 py-0.5 rounded bg-accent-soft text-accent text-[11px] font-bold uppercase tracking-wider">
            {question.topic.name}
          </span>
          <span className="text-[11px] text-ink-secondary font-mono">
            Saved on {formatDate(firstAddedAt)}
          </span>
          {mastered && (
            <span className="px-2 py-0.5 rounded bg-success-soft text-success text-[11px] font-bold uppercase tracking-wider">
              Mastered
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={handleDelete}
          aria-label="삭제"
          className="text-ink-secondary hover:text-danger transition-colors"
        >
          <span className="material-symbols-outlined text-[20px]">delete</span>
        </button>
      </div>

      {/* 질문 + (SQL 또는 본문 미리보기) */}
      <div>
        <p className="text-base font-medium text-ink mb-2 leading-relaxed">
          {question.questionText}
        </p>
        {question.sqlSnippet ? (
          <pre className="bg-bg-secondary border border-line rounded p-3 font-mono text-xs leading-relaxed overflow-x-auto">
            {question.sqlSnippet}
          </pre>
        ) : (
          question.explanation && (
            <p className="text-sm text-ink-secondary line-clamp-2 leading-relaxed">
              {question.explanation}
            </p>
          )
        )}
      </div>

      {/* 개인 메모 박스 */}
      <div className="bg-bg-secondary border-l-2 border-line-strong p-4 rounded-r">
        <div className="flex items-center gap-2 mb-2 text-ink-secondary">
          <span className="material-symbols-outlined text-[18px]">edit_note</span>
          <span className="text-[11px] font-bold uppercase tracking-wider">Personal Memo</span>
        </div>
        <textarea
          value={memo ?? ''}
          onChange={(e) => onMemoChange(e.target.value)}
          placeholder="이곳에 오답 이유를 적어보세요..."
          rows={Math.max(2, Math.ceil((memo?.length ?? 0) / 60))}
          className="w-full bg-transparent border-none focus:outline-none focus:ring-0 text-sm text-ink-secondary italic resize-none p-0 leading-relaxed placeholder:not-italic placeholder:text-ink-tertiary"
        />
      </div>

      {/* 펼침 컨텐츠 — View Detail 토글 시 */}
      {expanded && (
        <div className="border-t border-bg-secondary pt-4 space-y-4">
          {/* 옵션 */}
          <div className="space-y-2">
            {question.options.map((opt, idx) => {
              const showCorrect = revealed && opt.isCorrect === true;
              return (
                <div
                  key={opt.id}
                  className={cn(
                    'flex items-start gap-3 px-4 py-3 rounded-md border text-sm',
                    showCorrect
                      ? 'bg-success-soft border-success'
                      : 'bg-bg border-line',
                  )}
                >
                  <span
                    className={cn(
                      'font-medium shrink-0',
                      showCorrect ? 'text-success' : 'text-ink-secondary',
                    )}
                  >
                    {OPTION_LABELS[idx]}
                  </span>
                  <span className={cn('flex-1 leading-relaxed', showCorrect && 'text-success')}>
                    {opt.optionText}
                  </span>
                  {showCorrect && (
                    <span className="text-[11px] font-medium text-success shrink-0">정답</span>
                  )}
                </div>
              );
            })}
          </div>

          {/* 정답 / 해설 */}
          {!revealed ? (
            <button
              type="button"
              onClick={() => setRevealed(true)}
              className="w-full py-2.5 border border-line-strong rounded-md text-sm font-medium text-ink-secondary hover:text-ink hover:bg-bg-secondary transition-colors"
            >
              정답 확인 ↓
            </button>
          ) : (
            question.explanation && (
              <div className="bg-bg-secondary rounded-md px-4 py-3">
                <p className="text-[11px] font-bold text-ink-secondary uppercase tracking-wider mb-1.5">
                  해설
                </p>
                <p className="text-sm leading-relaxed">{question.explanation}</p>
              </div>
            )
          )}

          {/* 학습 액션 */}
          <div className="flex gap-2 flex-wrap">
            {!mastered ? (
              <>
                <button
                  type="button"
                  onClick={onReview}
                  className="flex-1 py-2.5 border border-line-strong rounded-md text-sm font-medium hover:bg-bg-secondary transition-colors"
                >
                  복습 완료
                </button>
                <button
                  type="button"
                  onClick={onMaster}
                  className="flex-1 py-2.5 bg-success-soft border border-success rounded-md text-sm font-medium text-success hover:bg-success hover:text-bg transition-colors"
                >
                  마스터
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={onUnmaster}
                className="flex-1 py-2.5 border border-line-strong rounded-md text-sm font-medium hover:bg-bg-secondary transition-colors"
              >
                다시 활성으로
              </button>
            )}
          </div>
        </div>
      )}

      {/* 푸터 — View Detail */}
      <div className="flex justify-end pt-2 border-t border-bg-secondary">
        <button
          type="button"
          onClick={() => {
            if (expanded) setRevealed(false);
            onToggleExpand();
          }}
          className="text-ink font-bold text-sm flex items-center gap-1 hover:underline"
        >
          {expanded ? 'Hide Detail' : 'View Detail'}
          <span className="material-symbols-outlined text-[18px]">
            {expanded ? 'arrow_drop_up' : 'arrow_forward'}
          </span>
        </button>
      </div>
    </div>
  );
}
