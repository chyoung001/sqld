import { Card, SectionTitle } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { accuracyTone } from '@/lib/utils';
import type { TopicAccuracy } from '@/types';

interface Props {
  topics: TopicAccuracy[];
}

export function TopicAccuracyPanel({ topics }: Props) {
  // 약점이 위로 (정답률 오름차순)
  const sorted = [...topics].sort((a, b) => a.accuracyPct - b.accuracyPct);

  return (
    <Card>
      <SectionTitle>토픽별 정답률 (낮은순)</SectionTitle>
      <div className="flex flex-col gap-2.5">
        {sorted.map((t) => (
          <ProgressBar
            key={t.topicId}
            value={t.accuracyPct}
            tone={accuracyTone(t.accuracyPct)}
            label={t.topicName}
            trailing={`${Math.round(t.accuracyPct)}%`}
          />
        ))}
      </div>
    </Card>
  );
}
