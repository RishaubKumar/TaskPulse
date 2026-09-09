import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

function NotFoundPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-sans text-center">
      <div className="max-w-md w-full bg-white border border-gray-300 rounded-lg p-8 shadow-sm">
        <span className="text-4xl font-extrabold text-blue-600 block mb-2">404</span>
        <h1 className="text-xl font-bold text-gray-900 mb-2">Page Not Found</h1>
        <p className="text-xs text-gray-600 mb-6 leading-relaxed">
          The page you are looking for does not exist or has moved. Your roadmap and evidence are still safe.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <button
            onClick={() => navigate(user ? '/dashboard' : '/')}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded transition cursor-pointer"
          >
            {user ? 'Go to Dashboard' : 'Go to Home'}
          </button>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 border border-gray-300 bg-white hover:bg-gray-100 text-gray-700 text-xs font-semibold rounded transition cursor-pointer"
          >
            ← Go Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;