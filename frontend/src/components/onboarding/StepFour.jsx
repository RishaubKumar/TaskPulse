import { useState } from 'react';
import CommentCard from './CommentCard';

function StepFour({ formData, updateFormData }) {
  const activeCompanies = formData.companies || [];
  const selectedYear = formData.currentYear || 'Year 1';
  const [customInput, setCustomInput] = useState('');

  const suggestedCompanies = [
    'Google', 'Microsoft', 'Flipkart', 'Razorpay', 'Swiggy', 'Amazon', 'Atlassian', 'Uber'
  ];

  const years = ['Year 1', 'Year 2', 'Year 3', 'Year 4'];

  const toggleCompany = (company) => {
    let nextCompanies;
    if (activeCompanies.includes(company)) {
      nextCompanies = activeCompanies.filter(c => c !== company);
    } else {
      nextCompanies = [...activeCompanies, company];
    }
    updateFormData('companies', nextCompanies);
  };

  const handleAddCustom = (e) => {
    e.preventDefault();
    const trimmed = customInput.trim();
    if (trimmed && !activeCompanies.includes(trimmed)) {
      updateFormData('companies', [...activeCompanies, trimmed]);
      setCustomInput('');
    }
  };

  return (
    <div>
      <CommentCard comment="Almost there! Tell me which companies excite you and which year of college you are currently in." />

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Target Companies & Current Year</h2>
        <p className="text-sm text-gray-600 mt-1">
          This helps set the technical depth and timeline urgency for your milestones.
        </p>
      </div>

      <div className="mb-6">
        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
          Target / Dream Companies
        </label>
        
        <form onSubmit={handleAddCustom} className="flex gap-2 mb-3">
          <input
            type="text"
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            placeholder="Type a company name and press Add (e.g. Cisco, Oracle)..."
            className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-600"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-semibold rounded border border-gray-300 transition cursor-pointer"
          >
            Add
          </button>
        </form>

        <div className="flex flex-wrap gap-2">
          {suggestedCompanies.map((company) => {
            const isSelected = activeCompanies.includes(company);
            return (
              <button
                type="button"
                key={company}
                onClick={() => toggleCompany(company)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                {company} {isSelected ? '✓' : '+'}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
          Current Academic Year
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {years.map((year) => {
            const isSelected = selectedYear === year;
            return (
              <button
                type="button"
                key={year}
                onClick={() => updateFormData('currentYear', year)}
                className={`py-2.5 px-4 rounded-lg font-semibold text-sm border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
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