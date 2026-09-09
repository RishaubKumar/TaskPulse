import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../hooks/useAuth';

function RegisterPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [collegeName, setCollegeName] = useState('');
  const [branch, setBranch] = useState('Computer science / IT');
  const [currentYear, setCurrentYear] = useState('Year 1');
  const [gYear, setGYear] = useState('2028');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!firstName || !email || !password) {
      setError('First name, email, and password are required.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await axios.post('/api/auth/register', {
        firstName,
        lastName,
        email,
        collegeName,
        branch,
        currentYear,
        gYear,
        password
      });

      if (res.data && res.data.token) {
        login(res.data.user, res.data.token);
        navigate('/onboarding');
      } else {
        setError('Registration failed. Please try again.');
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
      <div className="max-w-xl w-full bg-white border border-gray-300 rounded-lg p-8 shadow-sm">
        <div className="mb-6 text-center">
          <Link to="/" className="text-2xl font-bold tracking-tight text-gray-900">
            task<span className="text-blue-600">pulse</span>
          </Link>
          <h1 className="text-xl font-bold text-gray-800 mt-4">Create Your Student Account</h1>
          <p className="text-sm text-gray-600 mt-1">Set up your profile to build your 4-year college roadmap</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs font-medium rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                First Name *
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Rahul"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-600"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Last Name
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Kumar"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              College / University Email *
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="rahul@college.edu.in"
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-600"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              College / University Name
            </label>
            <input
              type="text"
              value={collegeName}
              onChange={(e) => setCollegeName(e.target.value)}
              placeholder="VIT / NIT / College name"
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-600"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Branch
              </label>
              <select
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                className="w-full border border-gray-300 rounded px-2.5 py-2 text-sm outline-none bg-white focus:border-blue-600"
              >
                <option value="Computer science / IT">Computer science / IT</option>
                <option value="Electronics / ECE">Electronics / ECE</option>
                <option value="Mechanical / Civil">Mechanical / Civil</option>
                <option value="Commerce / BBA / MBA">Commerce / BBA / MBA</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Current Year
              </label>
              <select
                value={currentYear}
                onChange={(e) => setCurrentYear(e.target.value)}
                className="w-full border border-gray-300 rounded px-2.5 py-2 text-sm outline-none bg-white focus:border-blue-600"
              >
                <option value="Year 1">Year 1</option>
                <option value="Year 2">Year 2</option>
                <option value="Year 3">Year 3</option>
                <option value="Year 4">Year 4</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Graduation Year
              </label>
              <select
                value={gYear}
                onChange={(e) => setGYear(e.target.value)}
                className="w-full border border-gray-300 rounded px-2.5 py-2 text-sm outline-none bg-white focus:border-blue-600"
              >
                <option value="2026">2026</option>
                <option value="2027">2027</option>
                <option value="2028">2028</option>
                <option value="2029">2029</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Password (min 6 characters) *
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-600"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded text-sm transition disabled:opacity-60 cursor-pointer"
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-gray-200 text-center text-xs text-gray-600">
          Already registered?{' '}
          <Link to="/login" className="text-blue-600 font-semibold hover:underline">
            Log in here
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;