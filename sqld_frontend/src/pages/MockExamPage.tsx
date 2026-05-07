import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMockExamStore, selectStats } from '@/store/mockExamStore';
import { buildMockExam } from '@/mocks/mockExam';
import { ExamTopBar } from '@/components/mockexam/ExamTopBar';
import { QuestionCard } from '@/components/mockexam/QuestionCard';
import { QuestionNavigator } from '@/components/mockexam/QuestionNavigator';
import { SubmitConfirmModal } from '@/components/mockexam/SubmitConfirmModal';
import { cn } from '@/lib/utils';

export function MockExamPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const exam = useMockExamStore((s) => s.exam);
  const loadExam = useMockExamStore((s) => s.loadExam);
  const tickTimer = useMockExamStore((s) => s.tickTimer);
  const goPrev = useMockExamStore((s) => s.goPrev);
  const goNext = useMockExamStore((s) => s.goNext);
  const currentDisplayOrder = useMockExamStore((s) => s.currentDisplayOrder);
  const total = useMockExamStore((s) => s.exam?.items?.length ?? 50);
  const openSubmitModal = useMockExamStore((s) => s.openSubmitModal);
  const submitExam = useMockExamStore((s) => s.submitExam);
  const isSubmitted = useMockExamStore((s) => s.isSubmitted);
  const toggleMarked = useMockExamStore((s) => s.toggleMarked);
  const stats = useMockExamStore(selectStats);

  const currentItem = exam?.items?.find((i) => i.displayOrder === currentDisplayOrder);
  const isMarked = currentItem?.marked ?? false;

  // 시험 로드
  useEffect(() => {
    if (!exam || exam.id !== Number(id)) {
      loadExam(buildMockExam(Number(id) || 8));
    }
  }, [id, exam, loadExam]);

  // 1초 타이머
  useEffect(() => {
    const interval = setInterval(() => tickTimer(), 1000);
    return () => clearInterval(interval);
  }, [tickTimer]);

  // 제출 → 결과 페이지
  useEffect(() => {
    if (isSubmitted && exam) {
      navigate(`/mock-exams/${exam.id}/result`);
    }
  }, [isSubmitted, exam, navigate]);

  // 새로고침/탭 닫기 경고
  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      if (exam && !isSubmitted) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, [exam, isSubmitted]);

  if (!exam) {
    return (
      <div className="min-h-screen flex items-center justify-center text-sm text-ink-secondary">
        시험 불러오는 중…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg flex flex-col">
      <ExamTopBar />

      {/* 본문 — 헤더 제외 풀 높이, 좌(문제)+우(네비게이터) */}
      <main className="flex-1 max-w-[1440px] mx-auto w-full flex flex-col md:flex-row md:h-[calc(100vh-4rem)] md:overflow-hidden">
        {/* 좌측: 문제 뷰어 */}
        <section className="flex-1 overflow-y-auto bg-bg-secondary/30 px-6 md:px-10 py-10">
          <div className="max-w-3xl mx-auto">
            <QuestionCard />

            {/* 하단 네비게이션 */}
            <div className="flex items-center justify-between pt-10 pb-24">
              <button
                type="button"
                onClick={goPrev}
                disabled={currentDisplayOrder === 1}
                className="flex items-center gap-1.5 px-5 py-3 text-sm font-medium text-ink-secondary hover:text-ink border border-line-strong rounded-lg bg-bg hover:bg-bg-secondary transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <span className="material-symbols-outlined text-[18px]">chevron_left</span>
                이전 문제
              </button>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={toggleMarked}
                  className={cn(
                    'flex items-center gap-1.5 px-4 py-3 text-sm font-medium rounded-lg transition-colors',
                    isMarked
                      ? 'bg-warning-soft text-warning hover:bg-warning/15'
                      : 'text-warning hover:bg-warning-soft',
                  )}
                >
                  <span
                    className="material-symbols-outlined text-[18px]"
                    style={{
                      fontVariationSettings: isMarked ? "'FILL' 1" : "'FILL' 0",
                    }}
                  >
                    bookmark
                  </span>
                  {isMarked ? '검토 표시됨' : '검토 표시'}
                </button>

                <button
                  type="button"
                  onClick={goNext}
                  disabled={currentDisplayOrder === total}
                  className="flex items-center gap-1.5 px-7 py-3 text-sm font-medium text-bg bg-ink rounded-lg hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  다음 문제
                  <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 우측: 네비게이터 */}
        <QuestionNavigator />
      </main>

      {/* 플로팅 제출 FAB */}
      <div className="fixed bottom-6 right-6 z-[60] pointer-events-none">
        <div className="bg-bg border border-line shadow-lg p-4 rounded-xl flex items-center gap-4 pointer-events-auto">
          <div className="hidden md:flex flex-col text-right">
            <span className="text-[11px] text-ink-secondary">
              총 {stats.total}문항 중 {stats.answered}문항 완료
            </span>
            <span className="text-sm font-bold">시험을 종료하시겠습니까?</span>
          </div>
          <button
            type="button"
            onClick={openSubmitModal}
            className="bg-danger text-bg px-5 py-3 rounded-lg text-sm font-bold hover:brightness-110 active:scale-95 transition-all flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[18px]">check_circle</span>
            최종 답안 제출
          </button>
        </div>
      </div>

      <SubmitConfirmModal onConfirm={submitExam} />
    </div>
  );
}
