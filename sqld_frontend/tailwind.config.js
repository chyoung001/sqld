/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // 종이톤 베이스
        bg: {
          DEFAULT: '#FAFAF7',
          secondary: '#F2F2EC',
          tertiary: '#E8E8E1',
        },
        ink: {
          DEFAULT: '#1A1A17',
          secondary: '#5A5A56',
          tertiary: '#8B8B86',
        },
        line: {
          DEFAULT: '#E0E0D9',
          strong: '#C9C9C2',
        },
        // 강조색 — 깊은 블루
        accent: {
          DEFAULT: '#1F5BAA',
          soft: '#E8F0FA',
          ink: '#0F3D7A',
        },
        // 의미색
        success: { DEFAULT: '#3F7A2C', soft: '#EAF4E5' },
        warning: { DEFAULT: '#9B6F11', soft: '#FBF1DA' },
        danger:  { DEFAULT: '#A6342B', soft: '#F8E5E2' },
      },
      fontFamily: {
        sans: ['Pretendard', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        // 데이터 디스플레이용 큰 숫자
        display: ['3.5rem', { lineHeight: '1', letterSpacing: '-0.02em', fontWeight: '500' }],
        kpi:     ['1.5rem', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '500' }],
      },
      borderRadius: {
        sm: '4px',
        DEFAULT: '6px',
        md: '8px',
        lg: '12px',
      },
      boxShadow: {
        // 그림자는 거의 안 씀. 필요 시 sublte만.
        subtle: '0 1px 2px rgba(0,0,0,0.04)',
      },
    },
  },
  plugins: [],
};
