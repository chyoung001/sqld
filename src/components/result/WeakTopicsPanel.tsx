import { Card, SectionTitle } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { accuracyTone } from '@/lib/utils';
import type { TopicAccuracyEntry } from '@/mocks/mockResult';

interface Props {
  topics: TopicAccuracyEntry[];
  limit?: number;
}

export function WeakTopicsPanel({ topics, limit = 3 }: Props) {
  const weakest = topics.slice(0, limit);

  return (
    <Card className="mb-3">
      <SectionTitle>이번 시도 약점 토픽</SectionTitle>
      <div className="flex flex-col gap-2.5">
        {weakest.map((t) => (
          <ProgressBar
            key={t.topicName}
            value={t.accuracyPct}
            tone={accuracyTone(t.accuracyPct)}
            label={
              <span>
                {t.topicName}{' '}
                <span className="text-ink-tertiary">({t.total}문항)</span>
              </span>
            }
            trailing={
              <span className="tabular">
                {t.correct} / {t.total} · {Math.round(t.accuracyPct)}%
              </span>
            }
          />
        ))}
      </div>
    </Card>
  );
}
