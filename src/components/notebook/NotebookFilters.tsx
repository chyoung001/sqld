import { cn } from '@/lib/utils';

export type TopicFilter = string | null; // null = All

interface Props {
  search: string;
  onSearchChange: (s: string) => void;
  topics: string[];
  topic: TopicFilter;
  onTopicChange: (t: TopicFilter) => void;
}

export function NotebookFilters({
  search,
  onSearchChange,
  topics,
  topic,
  onTopicChange,
}: Props) {
  return (
    <div className="bg-bg border border-line rounded-lg p-4 flex flex-col md:flex-row gap-4 md:items-center">
      {/* 검색 */}
      <div className="relative w-full md:w-80 shrink-0">
        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-ink-secondary text-[20px] pointer-events-none">
          search
        </span>
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="키워드로 검색"
          className="w-full pl-10 pr-4 py-2 border border-line-strong rounded-md text-sm bg-bg-secondary
                     focus:outline-none focus:border-ink transition-colors"
        />
      </div>

      {/* 토픽 칩 */}
      <div className="flex flex-wrap gap-2 items-center min-w-0">
        <Pill active={topic === null} onClick={() => onTopicChange(null)}>
          All
        </Pill>
        {topics.map((t) => (
          <Pill key={t} active={topic === t} onClick={() => onTopicChange(t)}>
            {t}
          </Pill>
        ))}
      </div>
    </div>
  );
}

function Pill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'px-4 py-1.5 rounded-full text-sm transition-colors',
        active
          ? 'bg-ink text-bg font-medium'
          : 'bg-bg-secondary text-ink-secondary hover:bg-bg-tertiary hover:text-ink',
      )}
    >
      {children}
    </button>
  );
}
