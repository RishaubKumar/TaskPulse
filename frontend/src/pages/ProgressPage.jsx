import Sidebar from '../components/layout/Sidebar';
import { useAuth } from '../hooks/useAuth';

function ProgressPage() {
  const { user } = useAuth();
  const roadmap = user?.roadmap || [];

  let totalMilestones = 0;
  let completedMilestones = 0;

  const semesterStats = [];
  const categoryStats = {
    technical: { completed: 0, total: 0 },
    portfolio: { completed: 0, total: 0 },
    placement: { completed: 0, total: 0 }
  };

  roadmap.forEach((sem) => {
    let semTotal = 0;
    let semCompleted = 0;

    if (sem.milestones) {
      sem.milestones.forEach((m) => {
        totalMilestones++;
        semTotal++;

        const isDone = m.status === 'done';
        if (isDone) {
          completedMilestones++;
          semCompleted++;
        }

        const cat = m.category.toLowerCase();
        if (cat.includes('technical')) {
          categoryStats.technical.total++;
          if (isDone) categoryStats.technical.completed++;
        } else if (cat.includes('portfolio')) {
          categoryStats.portfolio.total++;
          if (isDone) categoryStats.portfolio.completed++;
        } else {
          categoryStats.placement.total++;
          if (isDone) categoryStats.placement.completed++;
        }
      });
    }

    const percentage = semTotal > 0 ? Math.round((semCompleted / semTotal) * 100) : 0;
    semesterStats.push({
      semester: sem.semester,
      completed: semCompleted,
      total: semTotal,
      percentage
    });
  });

  const overallProgress = totalMilestones > 0
    ? Math.round((completedMilestones / totalMilestones) * 100)
    : 0;

  const getCategoryPercent = (cat) => {
    const stats = categoryStats[cat];
    return stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;
  };

  return (
    <div className="flex bg-gray-50 min-h-screen font-sans">
      <Sidebar />

      <main className="flex-1 p-6 overflow-y-auto max-h-screen">
        <header className="mb-6 border-b border-gray-200 pb-4">
          <h1 className="text-2xl font-bold text-gray-900">Progress Tracker</h1>
          <p className="text-xs text-gray-600 mt-1">
            Visual metrics of your milestones across all 8 semesters and core placement areas.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white border border-gray-300 rounded-lg p-6 flex flex-col sm:flex-row justify-between items-center gap-6 shadow-sm">
              <div>
                <h2 className="text-lg font-bold text-gray-900">Overall 4-Year Completion</h2>
                <p className="text-xs text-gray-500 mt-1">
                  You have finished {completedMilestones} out of {totalMilestones} planned milestones.
                </p>

                <div className="mt-4 flex gap-4 text-xs font-semibold">
                  <div className="bg-gray-50 p-2.5 rounded border border-gray-200 text-center min-w-24">
                    <span className="text-xl font-bold text-blue-600 block">{completedMilestones}</span>
                    <span className="text-gray-600">Completed</span>
                  </div>
                  <div className="bg-gray-50 p-2.5 rounded border border-gray-200 text-center min-w-24">
                    <span className="text-xl font-bold text-gray-700 block">
                      {totalMilestones - completedMilestones}
                    </span>
                    <span className="text-gray-600">Remaining</span>
                  </div>
                </div>
              </div>

              <div className="text-center bg-blue-50 border border-blue-200 rounded-lg p-5 w-36 shrink-0">
                <span className="text-4xl font-extrabold text-blue-600 block">{overallProgress}%</span>
                <span className="text-[11px] font-bold text-blue-800 uppercase tracking-wider block mt-1">
                  Complete
                </span>
                <div className="w-full h-1.5 bg-gray-200 rounded-full mt-3 overflow-hidden">
                  <div className="h-full bg-blue-600" style={{ width: `${overallProgress}%` }}></div>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-300 rounded-lg p-6 shadow-sm">
              <h2 className="text-base font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">
                Category Distribution
              </h2>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-semibold text-gray-700 mb-1">
                    <span>Technical Skills (Languages, DSA, Frameworks)</span>
                    <span>
                      {categoryStats.technical.completed} / {categoryStats.technical.total} ({getCategoryPercent('technical')}%)
                    </span>
                  </div>
                  <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600 transition-all"
                      style={{ width: `${getCategoryPercent('technical')}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold text-gray-700 mb-1">
                    <span>Portfolio Building (Projects, Live Demos, Open Source)</span>
                    <span>
                      {categoryStats.portfolio.completed} / {categoryStats.portfolio.total} ({getCategoryPercent('portfolio')}%)
                    </span>
                  </div>
                  <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-indigo-600 transition-all"
                      style={{ width: `${getCategoryPercent('portfolio')}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold text-gray-700 mb-1">
                    <span>Placement Readiness (Aptitude, Mock Interviews, Core CS)</span>
                    <span>
                      {categoryStats.placement.completed} / {categoryStats.placement.total} ({getCategoryPercent('placement')}%)
                    </span>
                  </div>
                  <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-600 transition-all"
                      style={{ width: `${getCategoryPercent('placement')}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-white border border-gray-300 rounded-lg p-5 shadow-sm">
              <h2 className="text-base font-bold text-gray-900 mb-3 pb-2 border-b border-gray-100">
                Semester Breakdown
              </h2>

              <div className="space-y-3">
                {semesterStats.map((sem) => (
                  <div key={sem.semester} className="space-y-1">
                    <div className="flex justify-between text-xs font-medium text-gray-700">
                      <span>Semester {sem.semester}</span>
                      <span className="font-semibold text-gray-900">
                        {sem.percentage}% ({sem.completed}/{sem.total})
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500 transition-all"
                        style={{ width: `${sem.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ProgressPage;
