import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type ChipTone = 'accent' | 'success' | 'warning' | 'danger' | 'muted';

interface ChipProps {
  children: ReactNode;
  tone?: ChipTone;
  size?: 'sm' | 'md';
}

const TONE_CLASSES: Record<ChipTone, string> = {
  accent:  'bg-accent-soft text-accent-ink',
  success: 'bg-success-soft text-success',
  warning: 'bg-warning-soft text-warning',
  danger:  'bg-danger-soft text-danger',
  muted:   'bg-bg-secondary text-ink-secondary',
};

export function Chip({ children, tone = 'muted', size = 'sm' }: ChipProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md font-medium leading-tight',
        size === 'sm' && 'text-[11px] px-2 py-0.5',
        size === 'md' && 'text-xs px-2.5 py-1',
        TONE_CLASSES[tone],
      )}
    >
      {children}
    </span>
  );
}
