import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export function ProtectedRoute() {
  const { user, token, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 text-gray-600 font-sans">
        <p className="text-base font-medium">Loading...</p>
      </div>
    );
  }

  if (!user || !token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export function PublicOnlyRoute({ children }) {
  const { user, token, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 text-gray-600 font-sans">
        <p className="text-base font-medium">Loading...</p>
      </div>
    );
  }

  if (user && token) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
