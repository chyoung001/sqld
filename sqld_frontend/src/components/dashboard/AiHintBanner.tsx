interface Props {
  topicName: string;
  accuracyPct: number;
  onStart?: () => void;
}

export function AiHintBanner({ topicName, accuracyPct, onStart }: Props) {
  return (
    <div className="bg-accent-soft rounded-md px-4 py-3 flex items-center justify-between gap-3">
      <div className="flex-1 min-w-0">
        <p className="text-[11px] font-medium text-accent-ink tracking-wide mb-0.5">
          학습 추천
        </p>
        <p className="text-sm text-accent-ink">
          {topicName} 정답률 {Math.round(accuracyPct)}% — 가장 약한 토픽입니다. 집중 학습 권장
        </p>
      </div>
      <button type="button" className="btn shrink-0 bg-bg" onClick={onStart}>
        학습 시작 ↗
      </button>
    </div>
  );
}
