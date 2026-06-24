import { NavLink } from "react-router-dom";

function Sidebar() {
  const userJson = localStorage.getItem("user");
  
  let user = null;
  if (userJson) {
    user = JSON.parse(userJson);
  }

  let firstName = "Rahul";
  if (user) {
    firstName = user.firstName;
  }

  let lastName = "Kumar";
  if (user) {
    lastName = user.lastName;
  }

  let branch = "CSE";
  if (user) {
    branch = user.branch;
  }

  let collegeName = "VIT";
  if (user) {
    collegeName = user.collegeName;
  }

  let currentYear = "Year 2";
  if (user) {
    currentYear = user.currentYear;
  }

  let fChar = "";
  if (firstName && firstName.length > 0) {
    fChar = firstName[0];
  }
  let lChar = "";
  if (lastName && lastName.length > 0) {
    lChar = lastName[0];
  }
  let initials = (fChar + lChar).toUpperCase();
  if (!initials) {
    initials = "RK";
  }

  const getLinkClass = (isActive) => {
    const base = "flex items-center gap-3 rounded-xl p-4 mb-3 font-semibold transition-all ";
    if (isActive) {
      return base + "bg-blue-50 text-blue-700";
    } else {
      return base + "text-slate-600 hover:bg-blue-50/50 hover:text-blue-600";
    }
  };

  return (
    <div className="w-72 bg-white text-slate-800 border-r border-blue-100 h-screen flex flex-col justify-between">
      <div>
        <div className="text-3xl font-bold p-8 text-slate-900">
          task<span className="text-blue-600">pulse</span>
        </div>

        <div className="px-4">
          <NavLink
            to="/dashboard"
            className={({ isActive }) => getLinkClass(isActive)}
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/roadmap"
            className={({ isActive }) => getLinkClass(isActive)}
          >
            My roadmap
          </NavLink>

          <NavLink
            to="/vault"
            className={({ isActive }) => getLinkClass(isActive)}
          >
            Evidence vault
          </NavLink>

          <h2 className="text-slate-400 text-xs font-semibold mt-8 mb-3 px-4 tracking-wider">
            PLACEMENT
          </h2>

          <NavLink
            to="/resume"
            className={({ isActive }) => getLinkClass(isActive)}
          >
            Resume AI
          </NavLink>

          <NavLink
            to="/mock"
            className={({ isActive }) => getLinkClass(isActive)}
          >
            Mock interview
          </NavLink>

          <h2 className="text-slate-400 text-xs font-semibold mt-8 mb-3 px-4 tracking-wider">
            TRACK
          </h2>

          <NavLink
            to="/progress"
            className={({ isActive }) => getLinkClass(isActive)}
          >
            Progress
          </NavLink>

          <NavLink
            to="/review"
            className={({ isActive }) => getLinkClass(isActive)}
          >
            Weekly review
          </NavLink>

          <NavLink
            to="/settings"
            className={({ isActive }) => getLinkClass(isActive)}
          >
            Settings
          </NavLink>
        </div>
      </div>

      <div className="border-t border-blue-100 p-5 flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
          {initials}
        </div>

        <div>
          <p className="font-semibold text-slate-800">
            {firstName} {lastName}
          </p>

          <p className="text-slate-500 text-sm">
            {currentYear} • {branch} • {collegeName}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;