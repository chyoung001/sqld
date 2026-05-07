import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

const SIDE_NAV = [
  { to: '/dashboard',    label: 'Dashboard',  icon: 'dashboard'   },
  { to: '/mock-exams',   label: 'Mock Exams', icon: 'quiz'        },
  { to: '/notebook',     label: 'Notebook',   icon: 'description' },
  { to: '/history',      label: 'History',    icon: 'history'     },
];

export function AppLayout() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-bg">
      {/* ───────── 사이드바 (lg+) ───────── */}
      <aside className="hidden lg:flex flex-col h-screen sticky top-0 left-0 w-64 shrink-0 bg-bg-secondary border-r border-line pt-6 pb-6 px-3 gap-3">
        {/* 로고 */}
        <div className="px-4 mb-6">
          <span className="text-lg font-bold tracking-tight">SQLD.lab</span>
        </div>

        {/* 프로필 카드 */}
        <div className="mx-1 mb-4 px-3 py-3 flex items-center gap-3 bg-bg border border-line rounded-lg">
          <div className="w-9 h-9 rounded-full bg-bg-tertiary shrink-0 flex items-center justify-center">
            <span className="material-symbols-outlined text-ink-secondary text-[20px]">
              person
            </span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-bold truncate">Study Session</span>
            <span className="text-[11px] text-ink-secondary">SQLD Certification</span>
          </div>
        </div>

        {/* 네비게이션 */}
        <nav className="flex-1 space-y-0.5">
          {SIDE_NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition-colors active:scale-[0.98]',
                  isActive
                    ? 'bg-bg-tertiary text-ink font-bold'
                    : 'text-ink-secondary hover:bg-bg-tertiary/60 hover:text-ink',
                )
              }
            >
              <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* 새 시험 시작 */}
        <button
          type="button"
          onClick={() => navigate('/mock-exams/8')}
          className="mx-1 mt-2 py-2 px-4 bg-ink text-bg rounded-lg text-sm font-medium hover:bg-ink-secondary transition-colors"
        >
          Start New Exam
        </button>

        {/* 하단 메뉴 */}
        <div className="mt-2 pt-4 border-t border-line space-y-0.5">
          <button
            type="button"
            className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm text-ink-secondary hover:bg-bg-tertiary/60 hover:text-ink transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">settings</span>
            Settings
          </button>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm text-ink-secondary hover:bg-bg-tertiary/60 hover:text-ink transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">logout</span>
            Logout
          </button>
        </div>
      </aside>

      {/* ───────── 메인 ───────── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* 톱 헤더 — 모바일에서만 로고 표시, 우측은 알림/프로필 */}
        <header className="sticky top-0 z-40 bg-bg border-b border-line h-16 flex items-center justify-between px-6 md:px-8 shrink-0">
          <div className="flex items-center gap-8">
            <span className="lg:hidden text-xl font-bold tracking-tight">SQLD.lab</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              type="button"
              className="text-ink-secondary hover:text-ink transition-colors"
              aria-label="Notifications"
            >
              <span className="material-symbols-outlined text-[22px]">notifications</span>
            </button>
            <div className="h-8 w-px bg-line" />
            <button
              type="button"
              className="text-sm text-ink hover:text-ink-secondary transition-colors"
            >
              Profile
            </button>
          </div>
        </header>

        {/* 컨텐츠 */}
        <main className="flex-1 px-6 md:px-8 py-8 max-w-7xl mx-auto w-full">
          <Outlet />
        </main>

        {/* 푸터 */}
        <footer className="border-t border-line bg-bg">
          <div className="max-w-7xl mx-auto px-6 md:px-8 py-8 flex flex-col md:flex-row md:justify-between md:items-center gap-3">
            <div className="flex flex-col gap-1 text-center md:text-left">
              <span className="font-bold text-sm">SQLD.lab</span>
              <span className="text-xs text-ink-secondary">
                © 2026 SQLD.lab. Scholarly Minimalism for Database Professionals.
              </span>
            </div>
            <div className="flex justify-center gap-6 text-xs text-ink-secondary">
              <a href="#" className="hover:text-ink transition-colors">Terms</a>
              <a href="#" className="hover:text-ink transition-colors">Privacy</a>
              <a href="#" className="hover:text-ink transition-colors">Support</a>
              <a href="#" className="hover:text-ink transition-colors">API</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
