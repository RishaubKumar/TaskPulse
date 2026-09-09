import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../components/layout/Sidebar';
import { useAuth } from '../hooks/useAuth';

function RoadmapPage() {
  const { user, updateUser } = useAuth();
  const [roadmap, setRoadmap] = useState(() => user?.roadmap || []);
  const [expandedSemester, setExpandedSemester] = useState(1);
  const [newMilestoneTask, setNewMilestoneTask] = useState('');
  const [newMilestoneCategory, setNewMilestoneCategory] = useState('Technical skills');
  const [activeAddingSem, setActiveAddingSem] = useState(null);

  const toggleSemester = (semNumber) => {
    setExpandedSemester((prev) => (prev === semNumber ? null : semNumber));
  };

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

    setRoadmap(updatedRoadmap);
    if (user) {
      updateUser({ ...user, roadmap: updatedRoadmap });
    }

    axios.put('/api/user/roadmap', { roadmap: updatedRoadmap })
      .catch((err) => console.error('Error updating roadmap:', err));
  };

  const handleAddMilestone = (semNumber) => {
    if (!newMilestoneTask.trim()) return;

    const updatedRoadmap = roadmap.map((sem) => {
      if (sem.semester === semNumber) {
        const updatedMilestones = [
          ...sem.milestones,
          {
            task: newMilestoneTask.trim(),
            category: newMilestoneCategory,
            status: 'pending'
          }
        ];
        return { ...sem, milestones: updatedMilestones };
      }
      return sem;
    });

    setRoadmap(updatedRoadmap);
    if (user) {
      updateUser({ ...user, roadmap: updatedRoadmap });
    }

    axios.put('/api/user/roadmap', { roadmap: updatedRoadmap })
      .catch((err) => console.error('Error saving milestone:', err));

    setNewMilestoneTask('');
    setActiveAddingSem(null);
  };

  const getCategoryClass = (category) => {
    const cat = category.toLowerCase();
    if (cat.includes('technical')) return 'bg-blue-100 text-blue-800 border-blue-200';
    if (cat.includes('portfolio')) return 'bg-indigo-100 text-indigo-800 border-indigo-200';
    return 'bg-emerald-100 text-emerald-800 border-emerald-200';
  };

  return (
    <div className="flex bg-gray-50 min-h-screen font-sans">
      <Sidebar />

      <main className="flex-1 p-6 overflow-y-auto max-h-screen">
        <header className="mb-6 border-b border-gray-200 pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My 4-Year Academic Roadmap</h1>
            <p className="text-xs text-gray-600 mt-1">
              8-semester progressive plan customized for your branch and target career track.
            </p>
          </div>

          <Link
            to="/onboarding"
            className="text-xs text-gray-600 hover:text-blue-600 border border-gray-300 bg-white hover:bg-gray-50 px-3 py-1.5 rounded transition"
          >
            Regenerate Roadmap
          </Link>
        </header>

        {roadmap.length === 0 ? (
          <div className="bg-white rounded-lg border border-gray-300 p-8 text-center max-w-md mx-auto">
            <h2 className="text-base font-bold text-gray-800 mb-2">No Roadmap Found</h2>
            <p className="text-xs text-gray-600 mb-4">
              Complete the quick 5-step onboarding wizard so Gemini AI can construct your semester roadmap.
            </p>
            <Link
              to="/onboarding"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold py-2 px-4 rounded transition"
            >
              Start Onboarding Wizard
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {roadmap.map((sem) => {
              const isExpanded = expandedSemester === sem.semester;
              const completedCount = sem.milestones.filter((m) => m.status === 'done').length;
              const totalCount = sem.milestones.length;
              const percent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

              return (
                <div key={sem.semester} className="bg-white border border-gray-300 rounded-lg shadow-sm">
                  <div
                    onClick={() => toggleSemester(sem.semester)}
                    className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition"
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <h2 className="text-sm font-bold text-gray-900">
                        Semester {sem.semester}
                      </h2>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">
                          {completedCount}/{totalCount} Done
                        </span>
                        <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden hidden sm:block">
                          <div
                            className="h-full bg-blue-600 transition-all"
                            style={{ width: `${percent}%` }}
                          ></div>
                        </div>
                        <span className="text-xs font-bold text-blue-700">{percent}%</span>
                      </div>
                    </div>

                    <span className="text-xs font-semibold text-gray-500">
                      {isExpanded ? '▲ Hide' : '▼ Expand'}
                    </span>
                  </div>

                  {isExpanded && (
                    <div className="px-4 pb-4 border-t border-gray-200 pt-3 bg-gray-50/50">
                      <div className="space-y-2 mb-3">
                        {sem.milestones.map((m, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between bg-white p-3 rounded border border-gray-200 gap-3"
                          >
                            <div className="flex items-start gap-3 min-w-0 flex-1">
                              <input
                                type="checkbox"
                                checked={m.status === 'done'}
                                onChange={() => toggleMilestone(sem.semester, idx)}
                                className="mt-0.5 h-4 w-4 rounded text-blue-600 border-gray-300 cursor-pointer"
                              />
                              <div className="min-w-0">
                                <h3 className={`text-xs font-semibold ${
                                  m.status === 'done' ? 'line-through text-gray-400' : 'text-gray-800'
                                }`}>
                                  {m.task}
                                </h3>
                              </div>
                            </div>

                            <span className={`px-2 py-0.5 rounded text-[11px] font-semibold border ${getCategoryClass(m.category)} shrink-0`}>
                              {m.category}
                            </span>
                          </div>
                        ))}
                      </div>

                      {activeAddingSem === sem.semester ? (
                        <div className="bg-white border border-gray-200 rounded p-3 text-xs space-y-2">
                          <input
                            type="text"
                            value={newMilestoneTask}
                            onChange={(e) => setNewMilestoneTask(e.target.value)}
                            placeholder="Milestone title (e.g. Learn React hooks, Build DBMS project)..."
                            className="w-full border border-gray-300 rounded px-2.5 py-1.5 text-xs outline-none focus:border-blue-600"
                          />
                          <div className="flex items-center gap-2">
                            <select
                              value={newMilestoneCategory}
                              onChange={(e) => setNewMilestoneCategory(e.target.value)}
                              className="border border-gray-300 rounded px-2 py-1 text-xs outline-none bg-white"
                            >
                              <option value="Technical skills">Technical skills</option>
                              <option value="Portfolio building">Portfolio building</option>
                              <option value="Placement readiness">Placement readiness</option>
                            </select>
                            <button
                              onClick={() => handleAddMilestone(sem.semester)}
                              className="px-3 py-1 bg-blue-600 text-white rounded font-semibold text-xs hover:bg-blue-700 transition cursor-pointer"
                            >
                              Save
                            </button>
                            <button
                              onClick={() => {
                                setActiveAddingSem(null);
                                setNewMilestoneTask('');
                              }}
                              className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-xs hover:bg-gray-200 transition cursor-pointer"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={() => setActiveAddingSem(sem.semester)}
                          className="text-xs text-blue-600 hover:text-blue-800 font-semibold cursor-pointer pt-1"
                        >
                          + Add custom milestone to Semester {sem.semester}
                        </button>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}

export default RoadmapPage;
