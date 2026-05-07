import { createBrowserRouter } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';
import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { MockExamPage } from './pages/MockExamPage';
import { MockExamIntroPage } from './pages/MockExamIntroPage';
import { ResultPage } from './pages/ResultPage';
import { NotebookPage } from './pages/NotebookPage';
import { LoginPage } from './pages/LoginPage';

export const router = createBrowserRouter([
  { path: '/', element: <LandingPage /> },
  { path: '/login', element: <LoginPage /> },
  // 모의고사 풀이 페이지 — 풀스크린 (사이드바 없음, 집중 모드)
  { path: '/mock-exams/:id', element: <MockExamPage /> },
  {
    element: <AppLayout />,
    children: [
      { path: '/dashboard', element: <DashboardPage /> },
      { path: '/mock-exams', element: <MockExamIntroPage /> },
      { path: '/mock-exams/:id/result', element: <ResultPage /> },
      { path: '/notebook', element: <NotebookPage /> },
    ],
  },
]);
