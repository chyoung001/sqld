import { Card, SectionTitle } from '@/components/ui/Card';
import { Chip } from '@/components/ui/Chip';
import type { SubjectBreakdown } from '@/mocks/mockResult';

const SUBJECT_NAMES: Record<1 | 2, string> = {
  1: '1과목 · 데이터 모델링',
  2: '2과목 · SQL 기본/활용',
};

interface Props {
  breakdown: SubjectBreakdown[];
}

export function SubjectBreakdownPanel({ breakdown }: Props) {
  return (
    <Card className="mb-3">
      <SectionTitle>과목별 점수</SectionTitle>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-2.5">
        {breakdown.map((b) => (
          <div key={b.subject} className="bg-bg-secondary rounded-md px-3.5 py-3">
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-xs text-ink-secondary">
                {SUBJECT_NAMES[b.subject]}
              </span>
              <Chip tone={b.passSafe ? 'success' : 'danger'}>
                {b.passSafe ? '과락 안전' : '과락'}
              </Chip>
            </div>
            <p className="text-kpi tabular">
              {b.correct}
              <span className="text-xs text-ink-secondary font-normal"> / {b.total}</span>
              <span className="text-sm text-ink-secondary font-normal">
                {' '}· {Math.round(b.accuracyPct)}%
              </span>
            </p>
          </div>
        ))}
      </div>
      <p className="text-[11px] text-ink-tertiary">
        합격 기준: 총점 60점 이상 · 과목별 40% 이상
      </p>
    </Card>
  );
}
