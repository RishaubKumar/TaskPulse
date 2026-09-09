import { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/layout/Sidebar';
import { useAuth } from '../hooks/useAuth';

function ReviewPage() {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState('');

  const roadmap = user?.roadmap || [];
  const completedMilestones = [];
  const pendingMilestones = [];

  roadmap.forEach((sem) => {
    if (sem.milestones) {
      sem.milestones.forEach((m) => {
        if (m.status === 'done') {
          completedMilestones.push(m);
        } else {
          pendingMilestones.push(m);
        }
      });
    }
  });

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const res = await axios.get('/api/user/review');
        if (res.data && res.data.reviews) {
          setReviews(res.data.reviews);
        }
      } catch (err) {
        console.error('Error fetching reviews:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const handleGenerateReview = async () => {
    setGenerating(true);
    setError('');

    try {
      const res = await axios.post('/api/user/review/generate');
      if (res.data && res.data.reviews) {
        setReviews(res.data.reviews);
      }
    } catch (err) {
      console.error('Error generating review:', err);
      setError('Unable to generate AI review. Please try again.');
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="flex bg-gray-50 min-h-screen font-sans">
      <Sidebar />

      <main className="flex-1 p-6 overflow-y-auto max-h-screen">
        <header className="mb-6 border-b border-gray-200 pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Weekly AI Check-In</h1>
            <p className="text-xs text-gray-600 mt-1">
              Gemini AI analyzes your milestone progress and highlights priority focus areas for the upcoming week.
            </p>
          </div>

          <button
            onClick={handleGenerateReview}
            disabled={generating}
            className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold py-2 px-4 rounded transition disabled:opacity-60 cursor-pointer shrink-0"
          >
            {generating ? 'Analyzing Progress with AI...' : 'Generate New Weekly Review'}
          </button>
        </header>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs font-medium rounded">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {loading ? (
              <p className="text-xs text-gray-500 py-4">Loading weekly reviews...</p>
            ) : reviews.length === 0 ? (
              <div className="bg-white border border-gray-300 rounded-lg p-6 text-center shadow-sm">
                <h2 className="text-sm font-bold text-gray-800 mb-1">No Reviews Generated Yet</h2>
                <p className="text-xs text-gray-600 mb-4">
                  Click the button above to generate your first AI progress check-in.
                </p>
                <button
                  onClick={handleGenerateReview}
                  disabled={generating}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold py-2 px-4 rounded transition cursor-pointer"
                >
                  {generating ? 'Analyzing...' : 'Generate AI Review'}
                </button>
              </div>
            ) : (
              reviews.map((rev, index) => {
                const isLatest = index === 0;
                return (
                  <div
                    key={rev._id || rev.id || index}
                    className={`bg-white rounded-lg p-5 shadow-sm border ${
                      isLatest ? 'border-blue-300 ring-1 ring-blue-200' : 'border-gray-300'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-3">
                      <div>
                        <span className="text-xs font-bold text-gray-800">{rev.date}</span>
                        {isLatest && (
                          <span className="ml-2 text-[10px] bg-blue-100 text-blue-800 font-semibold px-2 py-0.5 rounded">
                            Latest Review
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-1 text-xs">
                        <span className="text-gray-500 font-medium">Readiness:</span>
                        <span className="font-bold text-blue-700 text-sm">{rev.score}</span>
                      </div>
                    </div>

                    <div className="bg-blue-50/60 border border-blue-100 rounded p-3 mb-3">
                      <span className="font-bold text-[11px] text-blue-800 uppercase tracking-wider block mb-1">
                        AI Recommendation
                      </span>
                      <p className="text-xs text-gray-800 leading-relaxed">{rev.summary}</p>
                    </div>

                    <div>
                      <span className="font-bold text-gray-700 text-xs block mb-1.5 uppercase tracking-wider">
                        High-Priority Next Steps
                      </span>
                      <ul className="space-y-1">
                        {rev.priorities && rev.priorities.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs text-gray-700">
                            <span className="font-bold text-blue-600 shrink-0">[{idx + 1}]</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          <div className="space-y-4">
            <div className="bg-white border border-gray-300 rounded-lg p-5 shadow-sm text-xs">
              <h2 className="text-sm font-bold text-gray-900 mb-3 pb-2 border-b border-gray-100">
                Weekly Snapshot
              </h2>
              <div className="space-y-2.5">
                <div className="flex justify-between items-center py-1 border-b border-gray-100">
                  <span className="text-gray-600">Total Completed</span>
                  <span className="font-bold text-gray-900">{completedMilestones.length}</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-gray-100">
                  <span className="text-gray-600">Total Remaining</span>
                  <span className="font-bold text-gray-900">{pendingMilestones.length}</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-gray-600">Latest AI Score</span>
                  <span className="font-bold text-blue-700 text-sm">
                    {reviews[0]?.score || 'N/A'}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 text-white rounded-lg p-5 text-xs shadow-sm">
              <h3 className="font-bold text-sm mb-1 text-white">Why Regular AI Reviews?</h3>
              <p className="text-gray-300 text-[11px] leading-relaxed">
                Consistent weekly reviews prevent the common mistake of scrambling in final year.
                By verifying completed milestones and recalibrating weekly, you build a steady cadence toward campus placement readiness.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ReviewPage;
