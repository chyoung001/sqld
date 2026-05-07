import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NotebookFilters, type TopicFilter } from '@/components/notebook/NotebookFilters';
import { NotebookItem } from '@/components/notebook/NotebookItem';
import { buildMockNotebook } from '@/mocks/notebook';
import type { NotebookEntry } from '@/types';

export function NotebookPage() {
  const navigate = useNavigate();

  const [entries, setEntries] = useState<NotebookEntry[]>([]);
  const [search, setSearch] = useState('');
  const [topicFilter, setTopicFilter] = useState<TopicFilter>(null);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  useEffect(() => {
    setEntries(buildMockNotebook());
  }, []);

  // 토픽 칩 — 등장 빈도순
  const topics = useMemo(() => {
    const counts = new Map<string, number>();
    for (const e of entries) {
      const name = e.question.topic.name;
      counts.set(name, (counts.get(name) ?? 0) + 1);
    }
    return Array.from(counts.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([name]) => name)
      .slice(0, 6);
  }, [entries]);

  // 필터링: 검색 + 토픽 (마스터된 항목도 포함, 카드 내에서 배지 표시)
  const visible = useMemo(() => {
    const q = search.trim().toLowerCase();
    return entries.filter((e) => {
      if (topicFilter && e.question.topic.name !== topicFilter) return false;
      if (q) {
        const haystack = [
          e.question.questionText,
          e.question.sqlSnippet ?? '',
          e.question.explanation ?? '',
          e.memo ?? '',
        ]
          .join(' ')
          .toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [entries, search, topicFilter]);

  // ───── 액션 ─────
  const updateEntry = (id: number, patch: Partial<NotebookEntry>) => {
    setEntries((prev) => prev.map((e) => (e.id === id ? { ...e, ...patch } : e)));
    // TODO: 백엔드 연결 시 PATCH /notebook/:id
  };

  const handleMemoChange = (id: number, memo: string) => {
    updateEntry(id, { memo });
  };

  const handleReview = (id: number) => {
    const e = entries.find((x) => x.id === id);
    if (!e) return;
    updateEntry(id, {
      reviewCount: e.reviewCount + 1,
      lastReviewedAt: new Date().toISOString(),
    });
  };

  const handleMaster = (id: number) => {
    updateEntry(id, { mastered: true });
    setExpandedId(null);
  };

  const handleUnmaster = (id: number) => {
    updateEntry(id, { mastered: false });
    setExpandedId(null);
  };

  const handleDelete = (id: number) => {
    setEntries((prev) => prev.filter((e) => e.id !== id));
    setExpandedId(null);
    // TODO: 백엔드 연결 시 DELETE /notebook/:id
  };

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight mb-1">오답 노트</h1>
        <p className="text-sm text-ink-secondary">
          저장한 문제와 자주 틀리는 유형을 복습하세요.
        </p>
      </div>

      {/* 검색 + 필터 */}
      <NotebookFilters
        search={search}
        onSearchChange={setSearch}
        topics={topics}
        topic={topicFilter}
        onTopicChange={setTopicFilter}
      />

      {/* 카운트 */}
      <div className="flex justify-between items-baseline">
        <span className="text-xs text-ink-tertiary tabular">
          {visible.length}개 표시 / 총 {entries.length}개
        </span>
      </div>

      {/* 카드 리스트 */}
      {visible.length === 0 ? (
        <EmptyState
          isFiltered={!!search.trim() || topicFilter !== null}
          onClearFilters={() => {
            setSearch('');
            setTopicFilter(null);
          }}
          onStartExam={() => navigate('/mock-exams/8')}
        />
      ) : (
        <div className="grid gap-3">
          {visible.map((entry) => (
            <NotebookItem
              key={entry.id}
              entry={entry}
              expanded={expandedId === entry.id}
              onToggleExpand={() =>
                setExpandedId((prev) => (prev === entry.id ? null : entry.id))
              }
              onMemoChange={(memo) => handleMemoChange(entry.id, memo)}
              onReview={() => handleReview(entry.id)}
              onMaster={() => handleMaster(entry.id)}
              onUnmaster={() => handleUnmaster(entry.id)}
              onDelete={() => handleDelete(entry.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────

interface EmptyStateProps {
  isFiltered: boolean;
  onClearFilters: () => void;
  onStartExam: () => void;
}

function EmptyState({ isFiltered, onClearFilters, onStartExam }: EmptyStateProps) {
  if (isFiltered) {
    return (
      <div className="bg-bg-secondary border border-line rounded-lg px-5 py-12 text-center">
        <p className="text-sm text-ink-secondary mb-3">검색 결과가 없습니다.</p>
        <button
          type="button"
          onClick={onClearFilters}
          className="text-sm text-accent hover:underline"
        >
          필터 초기화
        </button>
      </div>
    );
  }
  return (
    <div className="bg-bg-secondary border border-line rounded-lg px-5 py-12 text-center">
      <p className="text-sm text-ink-secondary mb-4">오답노트가 비어 있습니다.</p>
      <button
        type="button"
        onClick={onStartExam}
        className="px-5 py-2.5 bg-ink text-bg rounded-md text-sm font-medium hover:opacity-90 transition-opacity"
      >
        새 모의고사 시작하기
      </button>
    </div>
  );
}
