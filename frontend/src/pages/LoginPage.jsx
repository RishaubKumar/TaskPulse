import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../hooks/useAuth';

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await axios.post('/api/auth/login', { email, password });
      if (res.data && res.data.token) {
        login(res.data.user, res.data.token);
        navigate('/dashboard');
      } else {
        setError('Login failed. Please check your credentials.');
      }
    } catch (err) {
      let message = 'Unable to connect to server. Please try again.';
      if (err.response && err.response.data) {
        const data = err.response.data;
        if (typeof data.error === 'string') {
          message = data.error;
        } else if (data.error && typeof data.error.message === 'string') {
          message = data.error.message;
        } else if (typeof data.message === 'string') {
          message = data.message;
        }
      }
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-sans">
      <div className="max-w-md w-full bg-white border border-gray-300 rounded-lg p-8 shadow-sm">
        <div className="mb-6 text-center">
          <Link to="/" className="text-2xl font-bold tracking-tight text-gray-900">
            task<span className="text-blue-600">pulse</span>
          </Link>
          <h1 className="text-xl font-bold text-gray-800 mt-4">Welcome Back</h1>
          <p className="text-sm text-gray-600 mt-1">Log in to track your college roadmap</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs font-medium rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="student@college.edu"
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-600"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your password"
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-600"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded text-sm transition disabled:opacity-60 cursor-pointer"
          >
            {loading ? 'Logging in...' : 'Log in'}
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-gray-200 text-center text-xs text-gray-600">
          Don't have an account yet?{' '}
          <Link to="/signup" className="text-blue-600 font-semibold hover:underline">
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;