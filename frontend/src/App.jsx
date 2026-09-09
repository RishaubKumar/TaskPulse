import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute, PublicOnlyRoute } from './components/common/ProtectedRoute';

import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import RoadmapPage from './pages/RoadmapPage';
import VaultPage from './pages/VaultPage';
import ProgressPage from './pages/ProgressPage';
import ReviewPage from './pages/ReviewPage';
import SettingsPage from './pages/SettingsPage';
import ResumePage from './pages/ResumePage';
import MockInterviewPage from './pages/MockInterviewPage';
import NotFoundPage from './pages/NotFoundPage';
import ProgressBar from './components/onboarding/ProgressBar';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        
        <Route
          path="/login"
          element={
            <PublicOnlyRoute>
              <LoginPage />
            </PublicOnlyRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicOnlyRoute>
              <RegisterPage />
            </PublicOnlyRoute>
          }
        />

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/onboarding" element={<ProgressBar />} />
          <Route path="/roadmap" element={<RoadmapPage />} />
          <Route path="/vault" element={<VaultPage />} />
          <Route path="/review" element={<ReviewPage />} />
          <Route path="/progress" element={<ProgressPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/resume" element={<ResumePage />} />
          <Route path="/mock" element={<MockInterviewPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
