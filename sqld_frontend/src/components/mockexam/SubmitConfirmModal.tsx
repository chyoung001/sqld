import { useEffect } from 'react';
import { useMockExamStore, selectStats } from '@/store/mockExamStore';

interface Props {
  onConfirm: () => void;
}

export function SubmitConfirmModal({ onConfirm }: Props) {
  const open = useMockExamStore((s) => s.submitModalOpen);
  const closeSubmitModal = useMockExamStore((s) => s.closeSubmitModal);
  const stats = useMockExamStore(selectStats);

  // ESC로 닫기
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeSubmitModal();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, closeSubmitModal]);

  if (!open) return null;

  return (
    <>
      {/* 백드롭 */}
      <div
        className="fixed inset-0 bg-ink/30 z-40"
        onClick={closeSubmitModal}
        aria-hidden
      />

      {/* 본체 */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="submit-modal-title"
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50
                   w-full max-w-sm bg-bg rounded-lg border border-line shadow-subtle
                   px-5 py-5"
      >
        <h2 id="submit-modal-title" className="text-base font-medium mb-1">
          시험을 제출하시겠습니까?
        </h2>
        <p className="text-xs text-ink-secondary mb-4">
          제출 후에는 답안을 수정할 수 없습니다.
        </p>

        <div className="bg-bg-secondary rounded-md px-4 py-3 mb-4 flex flex-col gap-1.5 text-sm">
          <div className="flex justify-between">
            <span className="text-ink-secondary">답변 완료</span>
            <span className="font-medium tabular">{stats.answered} / {stats.total}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-ink-secondary">다시 볼 문제 표시</span>
            <span className="font-medium tabular">{stats.marked}</span>
          </div>
          {stats.unanswered > 0 && (
            <div className="flex justify-between">
              <span className="text-danger">미답변</span>
              <span className="font-medium tabular text-danger">{stats.unanswered}</span>
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            className="btn flex-1"
            onClick={closeSubmitModal}
          >
            계속 풀기
          </button>
          <button
            type="button"
            className="btn btn-danger flex-1"
            onClick={onConfirm}
          >
            제출
          </button>
        </div>
      </div>
    </>
  );
}
