import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export default function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-20">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold tracking-tight text-gray-900">
          task<span className="text-blue-600">pulse</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
          <a href="#how-it-works" className="hover:text-blue-600 transition-colors">
            How it works
          </a>
          <a href="#features" className="hover:text-blue-600 transition-colors">
            Features
          </a>
        </nav>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <Link
                to="/dashboard"
                className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded hover:bg-blue-700 transition"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="px-3.5 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded hover:bg-gray-200 transition cursor-pointer"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50 transition"
              >
                Log in
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded hover:bg-blue-700 transition"
              >
                Get started free
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}