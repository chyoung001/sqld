import { useNavigate } from 'react-router-dom';

export function LoginPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-xs text-ink-tertiary tracking-wider uppercase mb-1 text-center">
          Studying
        </div>
        <h1 className="text-2xl font-medium tracking-tight text-center mb-8">
          SQLD 모의고사
        </h1>

        <div className="flex flex-col gap-2.5 mb-4">
          <input
            type="email"
            placeholder="이메일"
            className="px-3 py-2 rounded-md border border-line bg-bg text-sm
                       focus:outline-none focus:border-accent transition-colors"
          />
          <input
            type="password"
            placeholder="비밀번호"
            className="px-3 py-2 rounded-md border border-line bg-bg text-sm
                       focus:outline-none focus:border-accent transition-colors"
          />
        </div>

        <button
          className="btn btn-primary w-full mb-2"
          onClick={() => navigate('/dashboard')}
        >
          로그인
        </button>
        <button
          className="btn w-full"
          onClick={() => navigate('/dashboard')}
        >
          데모로 둘러보기
        </button>

        <p className="text-xs text-ink-tertiary text-center mt-6">
          백엔드 연결 전에는 두 버튼 모두 대시보드로 이동합니다
        </p>
      </div>
    </div>
  );
}
