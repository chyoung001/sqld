import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
  children: ReactNode;
  className?: string;
  // 보조 카드 (베이지 배경, 테두리 없음)
  variant?: 'default' | 'soft';
}

export function Card({ children, className, variant = 'default' }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-lg',
        variant === 'default' && 'bg-bg border border-line px-5 py-4',
        variant === 'soft' && 'bg-bg-secondary px-4 py-3',
        className,
      )}
    >
      {children}
    </div>
  );
}

interface SectionTitleProps {
  children: ReactNode;
  trailing?: ReactNode;
}

export function SectionTitle({ children, trailing }: SectionTitleProps) {
  return (
    <div className="flex justify-between items-baseline mb-3">
      <h3 className="text-sm font-medium text-ink">{children}</h3>
      {trailing && <div className="text-xs text-ink-secondary">{trailing}</div>}
    </div>
  );
}
