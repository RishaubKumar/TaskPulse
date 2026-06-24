import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const user = localStorage.getItem("user");

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
    window.location.reload();
  };

  let authButtons;
  if (user) {
    authButtons = (
      <>
        <button onClick={handleLogout} className="px-5 py-2 text-sm font-semibold text-blue-600 bg-white border border-blue-200 rounded-xl hover:bg-blue-50 hover:border-blue-300 transition-all cursor-pointer">
          Logout
        </button>
        <Link to="/dashboard" className="px-5 py-2 text-sm font-semibold text-white bg-blue-600 border border-blue-600 rounded-xl hover:bg-blue-700 hover:border-blue-700 shadow-sm transition-all cursor-pointer">
          Dashboard
        </Link>
      </>
    );
  } else {
    authButtons = (
      <>
        <Link to="/login" className="px-5 py-2 text-sm font-semibold text-blue-600 bg-white border border-blue-200 rounded-xl hover:bg-blue-50 hover:border-blue-300 transition-all cursor-pointer">
          Log in
        </Link>
        <Link to="/signup" className="px-5 py-2 text-sm font-semibold text-white bg-blue-600 border border-blue-600 rounded-xl hover:bg-blue-700 hover:border-blue-700 shadow-sm transition-all cursor-pointer">
          Get started free
        </Link>
      </>
    );
  }

  return (
    <nav className="w-full bg-white border-b border-blue-50 px-6 py-4 flex items-center justify-between">
      
      <div className="text-xl font-bold tracking-tight text-slate-900 select-none">
        task<span className="text-blue-600">pulse</span>
      </div>

      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
        <a href="#how-it-works" className="hover:text-blue-600 transition-colors">
          How it works
        </a>
        <a href="#features" className="hover:text-blue-600 transition-colors">
          Features
        </a>
        <a href="#colleges" className="hover:text-blue-600 transition-colors">
          For colleges
        </a>
      </div>

      <div className="flex items-center gap-3">
        {authButtons}
      </div>

    </nav>
  );
}