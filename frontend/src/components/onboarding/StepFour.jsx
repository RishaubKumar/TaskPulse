import React, { useState } from 'react';
import CommentCard from './CommentCard';
function StepFour() {
  const [selectedYear, setSelectedYear] = useState('Year 2');
  const [activeCompanies, setActiveCompanies] = useState([
    'Google', 'Microsoft', 'Flipkart', 'Razorpay', 'Swiggy', 'Zepto', 'Amazon'
  ]);

  const suggestedCompanies = [
    'Google', 'Microsoft', 'Flipkart', 'Razorpay', 'Swiggy', 'Zepto', 'Amazon'
  ];

  const years = ['Year 1', 'Year 2', 'Year 3', 'Year 4'];

  const toggleCompany = (company) => {
    if (activeCompanies.includes(company)) {
      setActiveCompanies(activeCompanies.filter(c => c !== company));
    } else {
      setActiveCompanies([...activeCompanies, company]);
    }
  };

  return (
    <div className=" mx-auto p-4  text-gray-800">
        <CommentCard comment="Almost there! Two last things — which companies excite you, and which year are you in?"/>
      <div className="mb-6">
        <h1 className="inline text-left text-black font-bold text-3xl">Dream companies & your current year</h1>
        <p className="text-gray-600 text-sm md:text-base">This helps me set the urgency and depth of your roadmap.</p>
      </div>
      <div className="mb-8">
        <input type="text" placeholder="Type a company name, e.g. Google, Swiggy, Infosys..." className="w-full border border-gray-300 rounded-lg p-3 text-base outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-gray-400 transition-shadow"/>
        <div className="flex flex-wrap gap-3 mt-4">
          {suggestedCompanies.map((company) => {
            const isActive = activeCompanies.includes(company);
            return (
              <button
                key={company}
                onClick={() => toggleCompany(company)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                  isActive ? 'bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100' : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-50'
                }`}
              >
                {company}
              </button>
            );
          })}
        </div>
      </div>
      <div>
        <h3 className="text-lg font-medium text-gray-700 mb-4">Which year are you in?</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {years.map((year) => {
            const isSelected = selectedYear === year;
            return (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                className={`py-3 px-4 rounded-xl font-medium border transition-all ${
                  isSelected ? 'bg-blue-600 border-blue-600 text-white shadow-sm' : 'bg-white border-gray-300 text-gray-800 hover:border-gray-400'}`}
              >
                {year}
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
}

export default StepFour;