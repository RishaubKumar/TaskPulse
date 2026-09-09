import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../components/layout/Sidebar';
import { useAuth } from '../hooks/useAuth';

function DashboardPage() {
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const [deadlines, setDeadlines] = useState([]);
  const [loadingDeadlines, setLoadingDeadlines] = useState(true);
  const [isAddingDeadline, setIsAddingDeadline] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newTimeframe, setNewTimeframe] = useState('');
  const [editingDeadlineId, setEditingDeadlineId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editTimeframe, setEditTimeframe] = useState('');
  const [deadlineSubmitting, setDeadlineSubmitting] = useState(false);

  const roadmap = user?.roadmap || [];
  const firstName = user?.firstName || 'Student';
  const currentYearStr = user?.currentYear || 'Year 1';

  let targetSemester = 1;
  if (currentYearStr.includes('2')) targetSemester = 3;
  else if (currentYearStr.includes('3')) targetSemester = 5;
  else if (currentYearStr.includes('4')) targetSemester = 7;

  const toggleMilestone = (semNumber, milestoneIdx) => {
    const updatedRoadmap = roadmap.map((sem) => {
      if (sem.semester === semNumber) {
        const updatedMilestones = sem.milestones.map((m, idx) => {
          if (idx === milestoneIdx) {
            return {
              ...m,
              status: m.status === 'done' ? 'pending' : 'done'
            };
          }
          return m;
        });
        return { ...sem, milestones: updatedMilestones };
      }
      return sem;
    });

    const updatedUser = { ...user, roadmap: updatedRoadmap };
    updateUser(updatedUser);

    axios.put('/api/user/roadmap', { roadmap: updatedRoadmap })
      .catch((err) => console.error('Error updating milestone:', err));
  };

  const currentSemData = roadmap.find((sem) => sem.semester === targetSemester) || { milestones: [] };
  const currentMilestones = currentSemData.milestones || [];

  let totalMilestones = 0;
  let completedMilestones = 0;
  roadmap.forEach((sem) => {
    if (sem.milestones) {
      sem.milestones.forEach((m) => {
        totalMilestones++;
        if (m.status === 'done') {
          completedMilestones++;
        }
      });
    }
  });

  const percentComplete = totalMilestones > 0
    ? Math.round((completedMilestones / totalMilestones) * 100)
    : 0;

  const getCategoryStats = (categoryName) => {
    const matched = currentMilestones.filter((m) =>
      m.category.toLowerCase().includes(categoryName.toLowerCase())
    );
    const total = matched.length;
    const completed = matched.filter((m) => m.status === 'done').length;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { completed, total, percentage };
  };

  const techStats = getCategoryStats('Technical');
  const portfolioStats = getCategoryStats('Portfolio');
  const placementStats = getCategoryStats('Placement');

  useEffect(() => {
    axios.get('/api/user/deadlines')
      .then((res) => {
        setDeadlines(res.data.deadlines || []);
        setLoadingDeadlines(false);
      })
      .catch((err) => {
        console.error('Error loading deadlines:', err);
        setLoadingDeadlines(false);
      });
  }, []);

  const handleAddDeadline = (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newTimeframe.trim() || deadlineSubmitting) return;

    setDeadlineSubmitting(true);
    axios.post('/api/user/deadlines', {
      title: newTitle.trim(),
      timeframe: newTimeframe.trim()
    })
      .then((res) => {
        setDeadlines(res.data.deadlines || []);
        setNewTitle('');
        setNewTimeframe('');
        setIsAddingDeadline(false);
        setDeadlineSubmitting(false);
      })
      .catch((err) => {
        console.error('Error adding deadline:', err);
        setDeadlineSubmitting(false);
      });
  };

  const handleStartEdit = (item) => {
    setEditingDeadlineId(item._id);
    setEditTitle(item.title);
    setEditTimeframe(item.timeframe);
  };

  const handleCancelEdit = () => {
    setEditingDeadlineId(null);
    setEditTitle('');
    setEditTimeframe('');
  };

  const handleUpdateDeadline = (id, e) => {
    e.preventDefault();
    if (!editTitle.trim() || !editTimeframe.trim() || deadlineSubmitting) return;

    setDeadlineSubmitting(true);
    axios.put(`/api/user/deadlines/${id}`, {
      title: editTitle.trim(),
      timeframe: editTimeframe.trim()
    })
      .then((res) => {
        setDeadlines(res.data.deadlines || []);
        setEditingDeadlineId(null);
        setEditTitle('');
        setEditTimeframe('');
        setDeadlineSubmitting(false);
      })
      .catch((err) => {
        console.error('Error updating deadline:', err);
        setDeadlineSubmitting(false);
      });
  };

  const handleDeleteDeadline = (id) => {
    if (!id || deadlineSubmitting) return;
    setDeadlineSubmitting(true);
    axios.delete(`/api/user/deadlines/${id}`)
      .then((res) => {
        setDeadlines(res.data.deadlines || []);
        setDeadlineSubmitting(false);
      })
      .catch((err) => {
        console.error('Error deleting deadline:', err);
        setDeadlineSubmitting(false);
      });
  };

  const getTimeframeBadgeClass = (timeframeStr) => {
    const lower = (timeframeStr || '').toLowerCase();
    if (lower.includes('day') || lower.includes('urgent') || lower.includes('tomorrow') || lower.includes('today')) {
      return 'text-red-700 bg-red-50 border border-red-200 font-semibold';
    }
    if (lower.includes('week')) {
      return 'text-amber-700 bg-amber-50 border border-amber-200 font-semibold';
    }
    return 'text-gray-700 bg-gray-100 border border-gray-200 font-medium';
  };

  return (
    <div className="flex bg-gray-50 min-h-screen font-sans">
      <Sidebar />

      <main className="flex-1 p-6 overflow-y-auto max-h-screen">
        <header className="mb-6 border-b border-gray-200 pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome, {firstName}
            </h1>
            <p className="text-xs text-gray-600 mt-1">
              Enrolled in {user?.branch || 'Computer Science'} • {currentYearStr} • Target: Semester {targetSemester}
            </p>
          </div>

          <div className="flex gap-2">
            <Link
              to="/roadmap"
              className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold py-2 px-4 rounded transition"
            >
              Open Full Roadmap
            </Link>
          </div>
        </header>

        <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <p className="text-xs text-blue-900 leading-relaxed">
            <span className="font-bold mr-1">Evidence Reminder:</span>
            Add proof of your completed projects, certifications, or hackathons in the Evidence Vault to build your placement profile.
          </p>
          <button
            onClick={() => navigate('/vault')}
            className="text-xs font-bold text-blue-700 hover:text-blue-900 underline shrink-0 cursor-pointer"
          >
            Go to Evidence Vault →
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <span className="text-xs text-gray-500 font-semibold uppercase">Overall Progress</span>
            <div className="text-2xl font-bold text-blue-600 mt-1">{percentComplete}%</div>
            <p className="text-[11px] text-gray-500 mt-0.5">{completedMilestones} of {totalMilestones} done</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <span className="text-xs text-gray-500 font-semibold uppercase">Semester {targetSemester} Goals</span>
            <div className="text-2xl font-bold text-gray-900 mt-1">
              {currentMilestones.filter((m) => m.status === 'done').length} / {currentMilestones.length}
            </div>
            <p className="text-[11px] text-gray-500 mt-0.5">Active semester tasks</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <span className="text-xs text-gray-500 font-semibold uppercase">Evidence Submissions</span>
            <div className="text-2xl font-bold text-green-600 mt-1">
              {user?.evidence ? user.evidence.length : 0}
            </div>
            <p className="text-[11px] text-gray-500 mt-0.5">Verified portfolio items</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <span className="text-xs text-gray-500 font-semibold uppercase">Placement Preparedness</span>
            <div className="text-2xl font-bold text-indigo-600 mt-1">
              {user?.reviews && user.reviews.length > 0 ? user.reviews[0].score : '80%'}
            </div>
            <p className="text-[11px] text-gray-500 mt-0.5">Current AI Readiness</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
            <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-100">
              <h2 className="text-base font-bold text-gray-900">
                Semester {targetSemester} Milestones
              </h2>
              <button
                onClick={() => navigate('/roadmap')}
                className="text-xs text-blue-600 hover:underline font-semibold cursor-pointer"
              >
                View all semesters
              </button>
            </div>

            {currentMilestones.length === 0 ? (
              <div className="text-center py-6 text-gray-500 text-xs">
                No milestones generated yet.{' '}
                <Link to="/onboarding" className="text-blue-600 underline">
                  Run Onboarding Wizard
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {currentMilestones.map((m, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-2.5 rounded border border-gray-100 hover:bg-gray-50 transition"
                  >
                    <input
                      type="checkbox"
                      checked={m.status === 'done'}
                      onChange={() => toggleMilestone(targetSemester, idx)}
                      className="mt-1 h-4 w-4 rounded text-blue-600 border-gray-300 cursor-pointer"
                    />
                    <div className="min-w-0 flex-1">
                      <p className={`text-xs font-semibold ${
                        m.status === 'done' ? 'line-through text-gray-400' : 'text-gray-800'
                      }`}>
                        {m.task}
                      </p>
                      <span className="text-[10px] text-gray-500 mt-0.5 inline-block">
                        {m.category} • {m.status === 'done' ? 'Completed' : 'Pending'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
            <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-100">
              <h2 className="text-base font-bold text-gray-900">
                Semester {targetSemester} Domain Progress
              </h2>
              <span className="text-xs text-gray-500 font-medium">Semester {targetSemester} of 8</span>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs text-gray-700 font-semibold mb-1">
                  <span>Technical Skills</span>
                  <span>{techStats.completed} / {techStats.total} ({techStats.percentage}%)</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 transition-all"
                    style={{ width: `${techStats.percentage}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs text-gray-700 font-semibold mb-1">
                  <span>Portfolio Building</span>
                  <span>{portfolioStats.completed} / {portfolioStats.total} ({portfolioStats.percentage}%)</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-600 transition-all"
                    style={{ width: `${portfolioStats.percentage}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs text-gray-700 font-semibold mb-1">
                  <span>Placement Readiness</span>
                  <span>{placementStats.completed} / {placementStats.total} ({placementStats.percentage}%)</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-600 transition-all"
                    style={{ width: `${placementStats.percentage}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center">
              <span className="text-xs text-gray-600">Need placement practice?</span>
              <div className="flex gap-2">
                <Link
                  to="/resume"
                  className="text-xs text-blue-600 font-semibold hover:underline"
                >
                  Review Resume
                </Link>
                <span className="text-gray-300">|</span>
                <Link
                  to="/mock"
                  className="text-xs text-blue-600 font-semibold hover:underline"
                >
                  Mock Interview
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-2 border-b border-gray-100">
            <div>
              <h2 className="text-base font-bold text-gray-900">
                Upcoming Academic Deadlines & Opportunities
              </h2>
              <p className="text-[11px] text-gray-500 mt-0.5">
                Track internships, hackathons, college exams, and recruitment drives.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsAddingDeadline(!isAddingDeadline)}
                className="text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded transition cursor-pointer"
              >
                {isAddingDeadline ? 'Cancel' : '+ Add Deadline'}
              </button>
              <button
                type="button"
                onClick={() => setShowCalendarModal(!showCalendarModal)}
                className="text-xs text-blue-600 hover:underline font-semibold cursor-pointer"
              >
                {showCalendarModal ? 'Hide calendar' : 'See calendar details'}
              </button>
            </div>
          </div>

          {isAddingDeadline && (
            <form onSubmit={handleAddDeadline} className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="text-xs font-bold text-blue-900 mb-2">Add New Deadline or Opportunity</div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <input
                  type="text"
                  placeholder="Opportunity or Event title"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="sm:col-span-2 text-xs p-2 border border-gray-300 rounded bg-white focus:outline-none focus:border-blue-500"
                  required
                />
                <input
                  type="text"
                  placeholder="Timeframe (e.g. In 4 days)"
                  value={newTimeframe}
                  onChange={(e) => setNewTimeframe(e.target.value)}
                  className="text-xs p-2 border border-gray-300 rounded bg-white focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div className="flex justify-end gap-2 mt-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddingDeadline(false);
                    setNewTitle('');
                    setNewTimeframe('');
                  }}
                  className="text-xs px-3 py-1.5 border border-gray-300 rounded text-gray-700 hover:bg-gray-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={deadlineSubmitting}
                  className="text-xs px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded transition cursor-pointer disabled:opacity-50"
                >
                  {deadlineSubmitting ? 'Saving...' : 'Save Deadline'}
                </button>
              </div>
            </form>
          )}

          {loadingDeadlines ? (
            <div className="text-center py-4 text-xs text-gray-500">Loading deadlines...</div>
          ) : deadlines.length === 0 ? (
            <div className="text-center py-5 text-xs text-gray-500">
              No upcoming deadlines logged yet. Click <span className="font-semibold text-blue-600 cursor-pointer" onClick={() => setIsAddingDeadline(true)}>+ Add Deadline</span> to create one.
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {deadlines.map((item) => (
                <div key={item._id || item.title} className="py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  {editingDeadlineId === item._id ? (
                    <form onSubmit={(e) => handleUpdateDeadline(item._id, e)} className="w-full flex flex-col sm:flex-row gap-2 items-center">
                      <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="flex-1 text-xs p-1.5 border border-gray-300 rounded bg-white focus:outline-none focus:border-blue-500"
                        required
                      />
                      <input
                        type="text"
                        value={editTimeframe}
                        onChange={(e) => setEditTimeframe(e.target.value)}
                        className="w-full sm:w-36 text-xs p-1.5 border border-gray-300 rounded bg-white focus:outline-none focus:border-blue-500"
                        required
                      />
                      <div className="flex gap-1 shrink-0">
                        <button
                          type="submit"
                          disabled={deadlineSubmitting}
                          className="text-xs bg-green-600 hover:bg-green-700 text-white px-2.5 py-1 rounded cursor-pointer"
                        >
                          Save
                        </button>
                        <button
                          type="button"
                          onClick={handleCancelEdit}
                          className="text-xs border border-gray-300 hover:bg-gray-100 text-gray-700 px-2 py-1 rounded cursor-pointer"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  ) : (
                    <>
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0"></span>
                        <span className="text-xs text-gray-800 font-medium">{item.title}</span>
                      </div>
                      <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                        <span className={`text-[11px] px-2 py-0.5 rounded ${getTimeframeBadgeClass(item.timeframe)}`}>
                          {item.timeframe}
                        </span>
                        <div className="flex items-center gap-1.5 text-xs">
                          <button
                            type="button"
                            onClick={() => handleStartEdit(item)}
                            className="text-gray-500 hover:text-blue-600 transition cursor-pointer"
                            title="Edit"
                          >
                            Edit
                          </button>
                          <span className="text-gray-300">|</span>
                          <button
                            type="button"
                            onClick={() => handleDeleteDeadline(item._id)}
                            className="text-gray-500 hover:text-red-600 transition cursor-pointer"
                            title="Delete"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}

          {showCalendarModal && (
            <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded text-xs">
              <h3 className="font-bold text-gray-800 mb-2">College Academic Calendar Overview</h3>
              <p className="text-gray-600 mb-2 leading-relaxed">
                Stay aligned with university examination schedules and company recruitment visit windows.
                Make sure all portfolio projects are logged in Evidence Vault at least two weeks before campus drive dates.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-700">
                <div className="bg-white p-2 rounded border border-gray-200">
                  <span className="font-semibold block text-gray-900">Odd Semesters (1, 3, 5, 7):</span>
                  July – December (Hackathons & Coursework focus)
                </div>
                <div className="bg-white p-2 rounded border border-gray-200">
                  <span className="font-semibold block text-gray-900">Even Semesters (2, 4, 6, 8):</span>
                  January – May (Internship & Placement focus)
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default DashboardPage;