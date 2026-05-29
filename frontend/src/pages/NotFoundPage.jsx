import React from "react";
import { ArrowLeft } from "lucide-react";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full  bg-white rounded-lg border border-gray-200 p-10 text-center shadow-sm">
        
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full border-2 border-indigo-300 flex items-center justify-center relative">
            <div className="w-1 h-10 bg-indigo-500 rounded-full"></div>

            <div className="absolute top-2 text-indigo-400 text-xs">•</div>
            <div className="absolute bottom-2 text-indigo-400 text-xs">•</div>
            <div className="absolute left-2 text-indigo-400 text-xs">•</div>
            <div className="absolute right-2 text-indigo-400 text-xs">•</div>
          </div>
        </div>

        <p className="text-gray-500 text-sm">Lost?</p>

        <h2 className="mt-6 text-gray-500 font-semibold text-lg">404</h2>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
          This page doesn’t exist
        </h1>

        <p className="text-gray-500 mt-4 text-base md:text-lg">
          Looks like you took a wrong turn. Your roadmap is still on track though.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">
          
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-md font-medium transition">
            Go to dashboard
          </button>

          <button className="border border-gray-300 hover:bg-gray-100 text-gray-700 px-6 py-3 rounded-md font-medium flex items-center justify-center gap-2 transition">
            <ArrowLeft size={18} />
            Go back
          </button>

        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;