import { clsx, type ClassValue } from 'clsx';

/** 조건부 클래스 결합 헬퍼 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/** 87 → "87분", 90 → "90분" */
export function formatMinutes(min: number): string {
  return `${Math.round(min)}분`;
}

/** 5223초 → "87분 3초" */
export function formatSeconds(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return s === 0 ? `${m}분` : `${m}분 ${s}초`;
}

/** 5223초 → "87:03" (모의고사 타이머용) */
export function formatTimer(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

/** 합격 예측 라벨 → 색상 토큰 */
export function predictionTone(label: string): 'success' | 'warning' | 'danger' {
  if (label === '합격권') return 'success';
  if (label === '경계') return 'warning';
  return 'danger';
}

/** 정답률 % → 의미 색상 토큰 (합격선 60% 기준) */
export function accuracyTone(pct: number): 'success' | 'warning' | 'danger' {
  if (pct >= 70) return 'success';
  if (pct >= 50) return 'warning';
  return 'danger';
}

/** ISO 시간 → "3일 전" 등 상대 표현. null이면 "미복습" */
export function timeAgo(iso: string | null): string {
  if (!iso) return '미복습';
  const ms = Date.now() - new Date(iso).getTime();
  if (ms < 0) return '방금';
  const min = ms / 60_000;
  const hr = min / 60;
  const day = hr / 24;
  if (day >= 1) return `${Math.floor(day)}일 전`;
  if (hr >= 1) return `${Math.floor(hr)}시간 전`;
  if (min >= 1) return `${Math.floor(min)}분 전`;
  return '방금';
}
