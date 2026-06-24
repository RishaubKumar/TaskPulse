import { useState } from "react";
import axios from "axios";
import Sidebar from "../components/layout/Sidebar";

function SettingsPage() {
  const userJson = localStorage.getItem("user");
  
  let initialUser = null;
  if (userJson) {
    initialUser = JSON.parse(userJson);
  }
  
  const [user, setUser] = useState(initialUser);
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [collegeName, setCollegeName] = useState(user?.collegeName || "");
  const [branch, setBranch] = useState(user?.branch || "Computer science / IT");
  const [currentYear, setCurrentYear] = useState(user?.currentYear || "Year 2");
  const [gYear, setGYear] = useState(user?.gYear || "2028");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    if (!user?._id) {
      setError("User session not found. Please log in again.");
      return;
    }

    setLoading(true);
    setMessage("");
    setError("");

    axios.put("/api/user/profile", {
      userId: user._id,
      firstName,
      lastName,
      collegeName,
      branch,
      currentYear,
      gYear
    })
    .then(res => {
      if (res.data.message === "Success") {
        const updatedUser = {
          ...user,
          firstName,
          lastName,
          collegeName,
          branch,
          currentYear,
          gYear
        };
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setMessage("Profile updated successfully!");
      } else {
        setError(res.data.error || "Failed to update profile.");
      }
      setLoading(false);
    })
    .catch(err => {
      console.error(err);
      setError("Error updating profile. Please try again.");
      setLoading(false);
    });
  };

  let buttonLabel = "Save Settings";
  if (loading) {
    buttonLabel = "Saving...";
  }

  return (
    <div className="flex bg-slate-50 min-h-screen font-sans">
      <Sidebar />
      <div className="flex-1 p-6 overflow-y-auto max-h-screen">
        <div className="mb-6 border-b border-gray-200 pb-4">
          <h1 className="text-3xl font-bold text-gray-800">Settings</h1>
          <p className="text-gray-600 mt-1 text-base">
            Update your college registration profile details.
          </p>
        </div>

        <div className="max-w-2xl bg-white border border-gray-300 rounded-lg p-5">
          <h2 className="text-xl font-bold text-gray-805 mb-4">Academic Profile</h2>

          {message && (
            <div className="mb-4 p-3 bg-green-100 border border-green-205 text-green-800 rounded text-xs font-semibold">
              {message}
            </div>
          )}

          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-205 text-red-800 rounded text-xs font-semibold">
              {error}
            </div>
          )}

          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1">
                College / University
              </label>
              <input
                type="text"
                value={collegeName}
                onChange={(e) => setCollegeName(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">
                  Branch
                </label>
                <select
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none bg-white"
                >
                  <option value="Computer science / IT">Computer science / IT</option>
                  <option value="Electronics / ECE">Electronics / ECE</option>
                  <option value="Mechanical / Civil">Mechanical / Civil</option>
                  <option value="Commerce / BBA / MBA">Commerce / BBA / MBA</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">
                  Current Year
                </label>
                <select
                  value={currentYear}
                  onChange={(e) => setCurrentYear(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none bg-white"
                >
                  <option value="Year 1">Year 1</option>
                  <option value="Year 2">Year 2</option>
                  <option value="Year 3">Year 3</option>
                  <option value="Year 4">Year 4</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">
                  Graduation Year
                </label>
                <select
                  value={gYear}
                  onChange={(e) => setGYear(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none bg-white"
                >
                  <option value="2026">2026</option>
                  <option value="2027">2027</option>
                  <option value="2028">2028</option>
                  <option value="2029">2029</option>
                </select>
              </div>
            </div>

            <div className="pt-3 border-t border-gray-200 flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded text-sm transition-colors disabled:bg-blue-300 cursor-pointer"
              >
                {buttonLabel}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;
