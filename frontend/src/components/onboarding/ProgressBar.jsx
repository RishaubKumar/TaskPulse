import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';
import StepFour from './StepFour';
import StepFive from './StepFive';

function ProgressBar() {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [validationError, setValidationError] = useState('');

  const [formData, setFormData] = useState({
    branch: 'cs',
    goal: 'Product',
    level: 'Intermediate',
    companies: ['Google', 'Microsoft', 'Flipkart'],
    currentYear: 'Year 1'
  });

  const updateFormData = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setValidationError('');
  };

  const totalSteps = 5;

  const handleNext = () => {
    setValidationError('');

    if (index === 0 && !formData.branch) {
      setValidationError('Please choose your academic branch to continue.');
      return;
    }
    if (index === 1 && !formData.goal) {
      setValidationError('Please select your primary career goal to continue.');
      return;
    }
    if (index === 2 && !formData.level) {
      setValidationError('Please pick your current programming level.');
      return;
    }

    if (index === totalSteps - 1) {
      navigate('/dashboard');
    } else {
      setIndex(index + 1);
    }
  };

  const handlePrev = () => {
    setValidationError('');
    setIndex(Math.max(index - 1, 0));
  };

  const progressPercent = ((index + 1) / totalSteps) * 100;

  const renderActiveStep = () => {
    switch (index) {
      case 0:
        return <StepOne formData={formData} updateFormData={updateFormData} />;
      case 1:
        return <StepTwo formData={formData} updateFormData={updateFormData} />;
      case 2:
        return <StepThree formData={formData} updateFormData={updateFormData} />;
      case 3:
        return <StepFour formData={formData} updateFormData={updateFormData} />;
      case 4:
        return <StepFive formData={formData} onComplete={() => navigate('/dashboard')} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-between p-4 sm:p-8 font-sans">
      <div className="max-w-2xl w-full mx-auto">
        <div className="flex items-center justify-between mb-4">
          <Link to="/" className="text-xl font-bold tracking-tight text-gray-900">
            task<span className="text-blue-600">pulse</span>
          </Link>
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Step {index + 1} of {totalSteps}
          </span>
        </div>

        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-6">
          <div
            className="h-full bg-blue-600 transition-all duration-300 rounded-full"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>

        {validationError && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs font-medium rounded">
            {validationError}
          </div>
        )}

        <div className="mb-8">
          {renderActiveStep()}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <button
            type="button"
            onClick={handlePrev}
            disabled={index === 0}
            className="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-semibold rounded hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
          >
            Previous
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded transition cursor-pointer shadow-sm"
          >
            {index === totalSteps - 1 ? 'Finish & Go to Dashboard' : 'Continue'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProgressBar;