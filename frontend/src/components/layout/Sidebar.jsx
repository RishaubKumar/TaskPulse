import { NavLink, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

function Sidebar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const firstName = user?.firstName || 'Student';
  const lastName = user?.lastName || '';
  const branch = user?.branch || 'CSE';
  const collegeName = user?.collegeName || 'Engineering College';
  const currentYear = user?.currentYear || 'Year 1';

  const fChar = firstName ? firstName[0] : 'S';
  const lChar = lastName ? lastName[0] : '';
  const initials = (fChar + lChar).toUpperCase();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getLinkClass = (isActive) => {
    const base = 'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ';
    if (isActive) {
      return base + 'bg-blue-100 text-blue-800 font-semibold';
    }
    return base + 'text-gray-700 hover:bg-gray-100 hover:text-gray-900';
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col justify-between shrink-0 sticky top-0 font-sans">
      <div className="p-4 overflow-y-auto">
        <div className="px-2 py-3 mb-4">
          <Link to="/" className="inline-block text-2xl font-bold tracking-tight text-gray-900 hover:opacity-90 transition">
            task<span className="text-blue-600">pulse</span>
          </Link>
        </div>

        <nav className="space-y-1">
          <NavLink to="/dashboard" className={({ isActive }) => getLinkClass(isActive)}>
            Dashboard
          </NavLink>

          <NavLink to="/roadmap" className={({ isActive }) => getLinkClass(isActive)}>
            My Roadmap
          </NavLink>

          <NavLink to="/vault" className={({ isActive }) => getLinkClass(isActive)}>
            Evidence Vault
          </NavLink>

          <div className="pt-4 pb-1">
            <span className="text-xs font-semibold text-gray-400 tracking-wider uppercase px-3">
              Placement Prep
            </span>
          </div>

          <NavLink to="/resume" className={({ isActive }) => getLinkClass(isActive)}>
            Resume AI
          </NavLink>

          <NavLink to="/mock" className={({ isActive }) => getLinkClass(isActive)}>
            Mock Interview
          </NavLink>

          <div className="pt-4 pb-1">
            <span className="text-xs font-semibold text-gray-400 tracking-wider uppercase px-3">
              Tracking
            </span>
          </div>

          <NavLink to="/progress" className={({ isActive }) => getLinkClass(isActive)}>
            Track Progress
          </NavLink>

          <NavLink to="/review" className={({ isActive }) => getLinkClass(isActive)}>
            Weekly Review
          </NavLink>

          <NavLink to="/settings" className={({ isActive }) => getLinkClass(isActive)}>
            Settings
          </NavLink>
        </nav>
      </div>

      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
              {initials}
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-xs text-gray-800 truncate">
                {firstName} {lastName}
              </p>
              <p className="text-gray-500 text-[11px] truncate">
                {currentYear} • {branch} • {collegeName}
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            title="Logout"
            className="text-xs text-gray-500 hover:text-red-600 px-2 py-1 border border-gray-300 rounded bg-white hover:bg-red-50 transition cursor-pointer shrink-0"
          >
            Exit
          </button>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;