import { Card } from '@/components/ui/Card';
import { Chip } from '@/components/ui/Chip';

interface Props {
  passStatus: string;
  score: number;
  totalCorrect: number;
  totalQuestions: number;
  elapsedMin: number;
  previousScore?: number;
}

export function ResultHero({
  passStatus,
  score,
  totalCorrect,
  totalQuestions,
  elapsedMin,
  previousScore,
}: Props) {
  const passed = passStatus === '합격';
  const delta = previousScore != null ? score - previousScore : null;

  return (
    <Card className="mb-3 text-center py-7">
      <Chip tone={passed ? 'success' : 'danger'} size="md">
        {passStatus}
      </Chip>

      <p className="text-display tabular mt-3 mb-1">
        {score}
        <span className="text-base text-ink-secondary font-normal"> 점</span>
      </p>

      <p className="text-xs text-ink-secondary tabular">
        정답 {totalCorrect} / {totalQuestions} · {elapsedMin}분 사용
        {delta != null && delta !== 0 && (
          <>
            {' · '}
            <span className={delta > 0 ? 'text-success' : 'text-danger'}>
              지난 시도 대비 {delta > 0 ? '↑' : '↓'} {Math.abs(delta)}점
            </span>
          </>
        )}
      </p>
    </Card>
  );
}
