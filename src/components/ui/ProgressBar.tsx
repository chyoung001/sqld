import { cn } from '@/lib/utils';

type Tone = 'accent' | 'success' | 'warning' | 'danger';

interface ProgressBarProps {
  /** 0~100 */
  value: number;
  tone?: Tone;
  /** 좌측 라벨 */
  label?: React.ReactNode;
  /** 우측 값 표시 */
  trailing?: React.ReactNode;
}

const FILL_CLASSES: Record<Tone, string> = {
  accent:  'bg-accent',
  success: 'bg-success',
  warning: 'bg-warning',
  danger:  'bg-danger',
};

const TEXT_CLASSES: Record<Tone, string> = {
  accent:  'text-accent-ink',
  success: 'text-success',
  warning: 'text-warning',
  danger:  'text-danger',
};

export function ProgressBar({
  value,
  tone = 'accent',
  label,
  trailing,
}: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, value));

  return (
    <div>
      {(label || trailing) && (
        <div className="flex justify-between items-baseline text-xs mb-1">
          {label && <span className="text-ink">{label}</span>}
          {trailing && (
            <span className={cn('font-medium tabular', TEXT_CLASSES[tone])}>{trailing}</span>
          )}
        </div>
      )}
      <div
        className="h-1.5 bg-bg-secondary rounded-full overflow-hidden"
        role="progressbar"
        aria-valuenow={Math.round(clamped)}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className={cn('h-full rounded-full', FILL_CLASSES[tone])}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}
