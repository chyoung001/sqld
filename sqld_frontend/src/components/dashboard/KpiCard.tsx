import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface KpiCardProps {
  label: string;
  value: ReactNode;
  /** 메인 값에 색상 토큰 적용 */
  valueTone?: 'default' | 'success' | 'warning' | 'danger';
  /** 보조 텍스트 (트렌드, 부가 정보) */
  sub?: ReactNode;
  /** 보조 텍스트 색상 */
  subTone?: 'default' | 'success' | 'warning' | 'danger';
}

const TONE_CLASSES: Record<NonNullable<KpiCardProps['valueTone']>, string> = {
  default: 'text-ink',
  success: 'text-success',
  warning: 'text-warning',
  danger:  'text-danger',
};

export function KpiCard({
  label,
  value,
  valueTone = 'default',
  sub,
  subTone = 'default',
}: KpiCardProps) {
  return (
    <div className="bg-bg-secondary rounded-md px-4 py-3.5">
      <p className="text-[11px] text-ink-secondary tracking-wide mb-1.5">{label}</p>
      <p className={cn('text-kpi tabular', TONE_CLASSES[valueTone])}>{value}</p>
      {sub && (
        <p className={cn('text-[11px] mt-1 tabular', TONE_CLASSES[subTone])}>{sub}</p>
      )}
    </div>
  );
}
