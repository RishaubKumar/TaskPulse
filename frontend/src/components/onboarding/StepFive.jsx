import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CommentCard from './CommentCard';
import { useAuth } from '../../hooks/useAuth';

function StepFive({ formData, onComplete }) {
  const navigate = useNavigate();
  const { updateUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [roadmap, setRoadmap] = useState(null);
  const [error, setError] = useState(null);
  const hasRequested = useRef(false);

  const { branch, goal, level, companies, currentYear } = formData;

  useEffect(() => {
    if (hasRequested.current) return;
    hasRequested.current = true;

    const generate = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await axios.post('/api/user/roadmap/generate', {
          branch: branch || 'Computer science / IT',
          goal: goal || 'Product',
          level: level || 'Intermediate',
          companies: companies || ['Google', 'Microsoft'],
          currentYear: currentYear || 'Year 1'
        });

        if (res.data && res.data.roadmap) {
          setRoadmap(res.data.roadmap);
          if (res.data.user) {
            updateUser(res.data.user);
          }
        } else {
          setError('Failed to generate roadmap data. Please try again.');
        }
      } catch (err) {
        console.error('Roadmap generation error:', err);
        setError('Roadmap generation error. You can still proceed to your dashboard.');
      } finally {
        setLoading(false);
      }
    };

    generate();
  }, [branch, goal, level, companies, currentYear, updateUser]);

  const handleFinish = () => {
    if (onComplete) {
      onComplete();
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div>
      <CommentCard comment="Your roadmap has been generated! Here is your personalized semester-by-semester plan tailored to your target company and skill level." />

      <div className="bg-white border border-gray-300 rounded-lg p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-4 mb-4 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Your 4-Year College Roadmap</h2>
            <p className="text-xs text-gray-600 mt-0.5">
              Target: {goal || 'Product Company'} • Branch: {branch || 'CSE'}
            </p>
          </div>
          <button
            onClick={handleFinish}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-5 rounded text-sm transition disabled:opacity-50 cursor-pointer shrink-0"
          >
            {loading ? 'Generating...' : 'Go to Dashboard →'}
          </button>
        </div>

        {loading && (
          <div className="text-center py-12">
            <div className="inline-block w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mb-3"></div>
            <p className="text-blue-700 font-semibold text-sm">
              Generating your personalized 8-semester roadmap with Gemini AI...
            </p>
            <p className="text-gray-500 text-xs mt-2">
              Aligning milestones to your branch, skill level, and career goals.
            </p>
          </div>
        )}

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded text-xs mb-4">
            {error}
          </div>
        )}

        {roadmap && !loading && (
          <div className="space-y-4 max-h-96 overflow-y-auto pr-1">
            {roadmap.map((sem) => (
              <div key={sem.semester} className="bg-gray-50 border border-gray-200 rounded p-3 text-left">
                <h3 className="font-bold text-sm text-gray-800 mb-2">
                  Semester {sem.semester}
                </h3>
                <div className="space-y-1.5">
                  {sem.milestones.map((m, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs bg-white border border-gray-200 rounded px-2.5 py-1.5">
                      <span className="text-gray-700 font-medium">{m.task}</span>
                      <span className="text-[11px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                        {m.category}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default StepFive;