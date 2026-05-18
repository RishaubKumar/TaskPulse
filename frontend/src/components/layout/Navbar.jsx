import React from 'react';

export default function Navbar() {
  return (
    <nav className="w-full bg-gray border-b border-gray-100 px-6 py-4 flex items-center justify-between">
      
      <div className="text-xl font-bold tracking-tight text-gray-900 select-none">
        task<span className="text-blue-800">pulse</span>
      </div>

      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
        <a href="#how-it-works" className="hover:text-gray-900 transition-colors">
          How it works
        </a>
        <a href="#features" className="hover:text-gray-900 transition-colors">
          Features
        </a>
        <a href="#colleges" className="hover:text-gray-900 transition-colors">
          For colleges
        </a>
      </div>

      <div className="flex items-center gap-3">
        <button className="px-5 py-2 text-sm font-semibold text-gray-700 bg-gray-50 border border-gray-300 rounded-xl hover:bg-gray-100 transition-all">
          Log in
        </button>
        
        <button className="px-5 py-2 text-sm font-semibold text-gray-900 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 shadow-sm transition-all">
          Get started free
        </button>
      </div>

    </nav>
  );
}