import { create } from 'zustand';
import type { MockExam, MockExamItem } from '@/types';

// =====================================================================
// 자동저장 디바운스 — 500ms
// =====================================================================
// 답 변경 / 표시 토글이 일어나면 saving 상태로 전환
// 마지막 변경 후 500ms 동안 추가 변경이 없으면 saved + 타임스탬프
// 실제 백엔드 연결 시 setTimeout 자리에 PATCH 호출
// =====================================================================
const SAVE_DEBOUNCE_MS = 500;

type SaveStatus = 'idle' | 'saving' | 'saved';

interface MockExamState {
  exam: MockExam | null;
  currentDisplayOrder: number;

  // 타이머 — 매초 tickTimer로 감소
  remainingSec: number;

  // 자동저장 상태
  saveStatus: SaveStatus;
  lastSavedAt: number | null;

  // 모달
  submitModalOpen: boolean;
  isSubmitted: boolean;

  // 시간 추적 — 현재 문제에 진입한 시각 (ms)
  questionEnteredAt: number;

  // ───── Actions ─────
  loadExam: (exam: MockExam) => void;
  setCurrent: (displayOrder: number) => void;
  goNext: () => void;
  goPrev: () => void;
  selectOption: (optionId: number) => void;
  toggleMarked: () => void;
  tickTimer: () => void;
  openSubmitModal: () => void;
  closeSubmitModal: () => void;
  submitExam: () => void;
  reset: () => void;
}

let saveDebounceTimer: ReturnType<typeof setTimeout> | null = null;

export const useMockExamStore = create<MockExamState>((set, get) => {
  // ───── 헬퍼: 자동저장 트리거 ─────
  function triggerAutoSave() {
    if (saveDebounceTimer) clearTimeout(saveDebounceTimer);
    set({ saveStatus: 'saving' });
    saveDebounceTimer = setTimeout(() => {
      // TODO: 실제 백엔드 연결 시 PATCH /mock-exams/:id/items/:displayOrder
      set({ saveStatus: 'saved', lastSavedAt: Date.now() });
    }, SAVE_DEBOUNCE_MS);
  }

  // ───── 헬퍼: 현재 문제 시간 누적 ─────
  function commitTimeSpent(state: MockExamState): MockExamItem[] | undefined {
    if (!state.exam?.items) return undefined;
    const elapsed = Math.max(0, Math.floor((Date.now() - state.questionEnteredAt) / 1000));
    if (elapsed === 0) return state.exam.items;

    return state.exam.items.map((item) =>
      item.displayOrder === state.currentDisplayOrder
        ? { ...item, timeSpentSec: item.timeSpentSec + elapsed }
        : item,
    );
  }

  // ───── 헬퍼: 현재 문제의 item 변경 ─────
  function updateCurrentItem(updater: (item: MockExamItem) => MockExamItem) {
    const state = get();
    if (!state.exam?.items) return;
    set({
      exam: {
        ...state.exam,
        items: state.exam.items.map((item) =>
          item.displayOrder === state.currentDisplayOrder ? updater(item) : item,
        ),
      },
    });
  }

  return {
    exam: null,
    currentDisplayOrder: 1,
    remainingSec: 0,
    saveStatus: 'idle',
    lastSavedAt: null,
    submitModalOpen: false,
    isSubmitted: false,
    questionEnteredAt: Date.now(),

    loadExam: (exam) =>
      set({
        exam,
        currentDisplayOrder: 1,
        remainingSec: exam.remainingSec,
        saveStatus: 'idle',
        lastSavedAt: null,
        submitModalOpen: false,
        isSubmitted: false,
        questionEnteredAt: Date.now(),
      }),

    setCurrent: (displayOrder) => {
      const state = get();
      const updated = commitTimeSpent(state);
      set({
        exam: state.exam && updated ? { ...state.exam, items: updated } : state.exam,
        currentDisplayOrder: displayOrder,
        questionEnteredAt: Date.now(),
      });
    },

    goNext: () => {
      const { currentDisplayOrder, exam } = get();
      const total = exam?.items?.length ?? 50;
      if (currentDisplayOrder < total) get().setCurrent(currentDisplayOrder + 1);
    },

    goPrev: () => {
      const { currentDisplayOrder } = get();
      if (currentDisplayOrder > 1) get().setCurrent(currentDisplayOrder - 1);
    },

    selectOption: (optionId) => {
      updateCurrentItem((item) => ({
        ...item,
        selectedOptionId: optionId,
        // 답을 *변경*한 경우에만 카운트 (첫 답변은 0 유지)
        changeCount:
          item.selectedOptionId !== null && item.selectedOptionId !== optionId
            ? item.changeCount + 1
            : item.changeCount,
      }));
      triggerAutoSave();
    },

    toggleMarked: () => {
      updateCurrentItem((item) => ({ ...item, marked: !item.marked }));
      triggerAutoSave();
    },

    tickTimer: () => {
      const { remainingSec, isSubmitted } = get();
      if (isSubmitted) return;
      if (remainingSec <= 0) {
        get().submitExam();
        return;
      }
      set({ remainingSec: remainingSec - 1 });
    },

    openSubmitModal: () => set({ submitModalOpen: true }),
    closeSubmitModal: () => set({ submitModalOpen: false }),

    submitExam: () => {
      // 마지막 문제 시간도 commit
      const state = get();
      const updated = commitTimeSpent(state);
      set({
        exam: state.exam && updated ? { ...state.exam, items: updated } : state.exam,
        submitModalOpen: false,
        isSubmitted: true,
      });
      // TODO: 실제 백엔드 연결 시 POST /mock-exams/:id/submit
    },

    reset: () =>
      set({
        exam: null,
        currentDisplayOrder: 1,
        remainingSec: 0,
        saveStatus: 'idle',
        lastSavedAt: null,
        submitModalOpen: false,
        isSubmitted: false,
        questionEnteredAt: Date.now(),
      }),
  };
});

// =====================================================================
// 셀렉터 — 컴포넌트에서 useMockExamStore(...)로 사용
// =====================================================================
export const selectCurrentItem = (s: MockExamState): MockExamItem | undefined =>
  s.exam?.items?.find((i) => i.displayOrder === s.currentDisplayOrder);

export const selectStats = (s: MockExamState) => {
  const items = s.exam?.items ?? [];
  const answered = items.filter((i) => i.selectedOptionId !== null).length;
  const marked = items.filter((i) => i.marked).length;
  const unanswered = items.length - answered;
  return { answered, marked, unanswered, total: items.length };
};
