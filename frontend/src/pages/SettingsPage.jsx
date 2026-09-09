import { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/layout/Sidebar';
import { useAuth } from '../hooks/useAuth';

function SettingsPage() {
  const { user, updateUser } = useAuth();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [collegeName, setCollegeName] = useState('');
  const [branch, setBranch] = useState('Computer science / IT');
  const [currentYear, setCurrentYear] = useState('Year 1');
  const [gYear, setGYear] = useState('2028');

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || '');
      setLastName(user.lastName || '');
      setCollegeName(user.collegeName || '');
      setBranch(user.branch || 'Computer science / IT');
      setCurrentYear(user.currentYear || 'Year 1');
      setGYear(user.gYear || '2028');
    }
  }, [user]);

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    try {
      const res = await axios.put('/api/user/profile', {
        firstName,
        lastName,
        collegeName,
        branch,
        currentYear,
        gYear
      });

      if (res.data && res.data.message === 'Success') {
        const updated = {
          ...user,
          firstName,
          lastName,
          collegeName,
          branch,
          currentYear,
          gYear
        };
        updateUser(updated);
        setMessage('Academic profile updated successfully!');
        setTimeout(() => setMessage(''), 3000);
      } else {
        setError('Failed to update profile.');
      }
    } catch (err) {
      console.error('Profile update error:', err);
      setError('An error occurred while updating profile.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex bg-gray-50 min-h-screen font-sans">
      <Sidebar />

      <main className="flex-1 p-6 overflow-y-auto max-h-screen">
        <header className="mb-6 border-b border-gray-200 pb-4">
          <h1 className="text-2xl font-bold text-gray-900">Account Settings</h1>
          <p className="text-xs text-gray-600 mt-1">
            Update your college registration and academic profile information.
          </p>
        </header>

        <div className="max-w-2xl bg-white border border-gray-300 rounded-lg p-6 shadow-sm">
          <h2 className="text-base font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">
            Student Academic Profile
          </h2>

          {message && (
            <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded text-xs font-semibold">
              {message}
            </div>
          )}

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded text-xs font-semibold">
              {error}
            </div>
          )}

          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-xs outline-none focus:border-blue-600"
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
                  className="w-full border border-gray-300 rounded px-3 py-2 text-xs outline-none focus:border-blue-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                College / University Name
              </label>
              <input
                type="text"
                value={collegeName}
                onChange={(e) => setCollegeName(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 text-xs outline-none focus:border-blue-600"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Branch
                </label>
                <select
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                  className="w-full border border-gray-300 rounded px-2.5 py-2 text-xs outline-none bg-white focus:border-blue-600"
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
                  className="w-full border border-gray-300 rounded px-2.5 py-2 text-xs outline-none bg-white focus:border-blue-600"
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
                  className="w-full border border-gray-300 rounded px-2.5 py-2 text-xs outline-none bg-white focus:border-blue-600"
                >
                  <option value="2026">2026</option>
                  <option value="2027">2027</option>
                  <option value="2028">2028</option>
                  <option value="2029">2029</option>
                </select>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-5 rounded text-xs transition disabled:opacity-60 cursor-pointer"
              >
                {loading ? 'Saving Changes...' : 'Save Profile'}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default SettingsPage;
