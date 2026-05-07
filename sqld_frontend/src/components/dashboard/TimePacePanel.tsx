import { Card, SectionTitle } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';
import type { TimePace } from '@/types';

interface Props {
  data: TimePace;
}

export function TimePacePanel({ data }: Props) {
  const usagePct = (data.avgTotalMin / data.limitMin) * 100;
  const remainingMin = data.limitMin - data.avgTotalMin;

  // 시간 여유 90%↑ 사용이면 경고
  const tone = usagePct >= 95 ? 'danger' : usagePct >= 85 ? 'warning' : 'success';

  return (
    <Card>
      <SectionTitle>시간 페이스</SectionTitle>

      <div className="mb-4">
        <ProgressBar
          value={usagePct}
          tone={tone}
          label={<span className="text-ink-secondary">평균 풀이 시간</span>}
          trailing={
            <span className="text-ink font-medium">
              {Math.round(data.avgTotalMin)} / {data.limitMin}분
            </span>
          }
        />
        <p
          className={`text-xs mt-1.5 ${
            tone === 'danger' ? 'text-danger' : tone === 'warning' ? 'text-warning' : 'text-success'
          }`}
        >
          {tone === 'success'
            ? `시간 여유 ${remainingMin}분`
            : `시간 여유 부족 (${remainingMin}분)`}
        </p>
      </div>

      <p className="text-xs text-ink-secondary mb-2">가장 오래 걸리는 토픽 (문항당)</p>
      <div className="flex flex-col gap-1.5 text-sm">
        {data.slowestTopics.map((t) => {
          const m = Math.floor(t.avgSecPerQuestion / 60);
          const s = t.avgSecPerQuestion % 60;
          return (
            <div key={t.topicName} className="flex justify-between">
              <span>{t.topicName}</span>
              <span className="text-ink-secondary tabular">
                {m}분 {String(s).padStart(2, '0')}초
              </span>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
