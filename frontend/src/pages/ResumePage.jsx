import { useState } from 'react';
import axios from 'axios';
import Sidebar from '../components/layout/Sidebar';
import { useAuth } from '../hooks/useAuth';

function ResumePage() {
  const { user } = useAuth();
  const [resumeText, setResumeText] = useState('');
  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const sampleTemplate = `Education: B.Tech in ${user?.branch || 'Computer Science'}, ${user?.collegeName || 'Engineering College'} (CGPA: 8.5)
Skills: C++, JavaScript, React, Node.js, Express, MongoDB, Git, Data Structures & Algorithms
Projects:
1. TaskPulse - AI-powered 4-year engineering roadmap platform built with React, Node.js, and Gemini AI.
2. E-Commerce API - RESTful microservices with JWT authentication and MongoDB aggregation.
Achievements: Solved 150+ questions on LeetCode, Finalist in College Hackathon.`;

  const handleReview = async (e) => {
    e.preventDefault();
    if (!resumeText.trim() || resumeText.trim().length < 20) {
      setError('Please provide at least 20 characters of resume content or project details.');
      return;
    }

    setLoading(true);
    setError('');
    setReview(null);

    try {
      const res = await axios.post('/api/user/resume-review', { resumeText });
      if (res.data && res.data.review) {
        setReview(res.data.review);
      } else {
        setError('Could not evaluate resume. Please try again.');
      }
    } catch (err) {
      console.error('Resume review error:', err);
      setError('Evaluation service error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex bg-gray-50 min-h-screen font-sans">
      <Sidebar />

      <main className="flex-1 p-6 overflow-y-auto max-h-screen">
        <header className="mb-6 border-b border-gray-200 pb-4">
          <h1 className="text-2xl font-bold text-gray-900">Placement Resume AI Reviewer</h1>
          <p className="text-xs text-gray-600 mt-1">
            Analyze your resume summary, project descriptions, and skills against campus recruitment criteria.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white border border-gray-300 rounded-lg p-5 shadow-sm">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-base font-bold text-gray-900">Resume Content / Project Summary</h2>
                <button
                  type="button"
                  onClick={() => setResumeText(sampleTemplate)}
                  className="text-xs text-blue-600 hover:underline font-semibold cursor-pointer"
                >
                  Insert Sample Template
                </button>
              </div>

              {error && (
                <div className="mb-3 p-2.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded">
                  {error}
                </div>
              )}

              <form onSubmit={handleReview} className="space-y-3">
                <textarea
                  rows="9"
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                  placeholder="Paste your resume sections, project descriptions, skills, and coursework here..."
                  className="w-full border border-gray-300 rounded p-3 text-xs font-mono outline-none focus:border-blue-600"
                ></textarea>

                <div className="flex justify-between items-center">
                  <span className="text-[11px] text-gray-500">
                    Characters: {resumeText.length} (minimum 20)
                  </span>
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold py-2 px-5 rounded transition disabled:opacity-60 cursor-pointer"
                  >
                    {loading ? 'Evaluating with Gemini AI...' : 'Review My Resume'}
                  </button>
                </div>
              </form>
            </div>

            {review && (
              <div className="bg-white border border-gray-300 rounded-lg p-5 shadow-sm space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                  <div>
                    <h3 className="text-base font-bold text-gray-900">Placement Assessment</h3>
                    <p className="text-xs text-gray-500 mt-0.5">{review.verdict}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-gray-500 font-semibold uppercase block">
                      Score
                    </span>
                    <span className="text-3xl font-extrabold text-blue-600">
                      {review.score}/100
                    </span>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-2">
                    Key Strengths Identified
                  </h4>
                  <ul className="space-y-1.5">
                    {review.strengths && review.strengths.map((str, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-gray-700">
                        <span className="text-emerald-600 font-bold shrink-0">✓</span>
                        <span>{str}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-amber-800 uppercase tracking-wider mb-2">
                    Recommended Improvements
                  </h4>
                  <ul className="space-y-1.5">
                    {review.improvements && review.improvements.map((imp, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-gray-700">
                        <span className="text-amber-600 font-bold shrink-0">→</span>
                        <span>{imp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>

          <div>
            <div className="bg-white border border-gray-300 rounded-lg p-5 shadow-sm text-xs space-y-3">
              <h2 className="text-sm font-bold text-gray-900 pb-2 border-b border-gray-100">
                Placement Resume Tips
              </h2>
              <div className="space-y-2 text-gray-600 leading-relaxed">
                <p>
                  <strong className="text-gray-800">1. Quantify Impact:</strong> State metrics like "reduced API response time by 35%" instead of just "improved performance".
                </p>
                <p>
                  <strong className="text-gray-800">2. Verify Links:</strong> Ensure all projects linked from Evidence Vault have working README files and live demo URLs.
                </p>
                <p>
                  <strong className="text-gray-800">3. Match Branch Keywords:</strong> Keep technical skills relevant to your target job profile.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ResumePage;
