import { useState } from "react";
import Sidebar from "../components/layout/Sidebar";

function ProgressPage() {
  const userJson = localStorage.getItem("user");
  
  let user = null;
  if (userJson) {
    user = JSON.parse(userJson);
  }

  const roadmap = user?.roadmap || [];

  // Calculate statistics
  let totalMilestones = 0;
  let completedMilestones = 0;
  
  const semesterStats = [];
  const categoryStats = {
    technical: { completed: 0, total: 0 },
    portfolio: { completed: 0, total: 0 },
    placement: { completed: 0, total: 0 }
  };

  roadmap.forEach(sem => {
    let semTotal = 0;
    let semCompleted = 0;

    if (sem.milestones) {
      sem.milestones.forEach(m => {
        totalMilestones++;
        semTotal++;
        
        const isDone = m.status === "done";
        if (isDone) {
          completedMilestones++;
          semCompleted++;
        }

        const cat = m.category.toLowerCase();
        if (cat.includes("technical")) {
          categoryStats.technical.total++;
          if (isDone) categoryStats.technical.completed++;
        } else if (cat.includes("portfolio")) {
          categoryStats.portfolio.total++;
          if (isDone) categoryStats.portfolio.completed++;
        } else {
          categoryStats.placement.total++;
          if (isDone) categoryStats.placement.completed++;
        }
      });
    }

    let percentage = 0;
    if (semTotal > 0) {
      percentage = Math.round((semCompleted / semTotal) * 100);
    }

    semesterStats.push({
      semester: sem.semester,
      completed: semCompleted,
      total: semTotal,
      percentage: percentage
    });
  });

  let overallProgress = 0;
  if (totalMilestones > 0) {
    overallProgress = Math.round((completedMilestones / totalMilestones) * 100);
  }

  const getCategoryPercent = (cat) => {
    const stats = categoryStats[cat];
    let percent = 0;
    if (stats.total > 0) {
      percent = Math.round((stats.completed / stats.total) * 100);
    }
    return percent;
  };

  return (
    <div className="flex bg-slate-50 min-h-screen font-sans">
      <Sidebar />
      <div className="flex-1 p-6 overflow-y-auto max-h-screen">
        <div className="mb-6 border-b border-gray-200 pb-4">
          <h1 className="text-3xl font-bold text-gray-800">Track Progress</h1>
          <p className="text-gray-600 mt-1 text-base">
            Detailed stats of your milestone completions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Overall Progress & Focus Areas */}
          <div className="lg:col-span-2 space-y-6">
            {/* Overall Card */}
            <div className="bg-white border border-gray-300 rounded-lg p-6 flex flex-col md:flex-row justify-between items-center gap-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Overall Progress</h2>
                <p className="text-gray-500 text-sm mt-1">
                  You finished {completedMilestones} of {totalMilestones} milestones.
                </p>
                <div className="mt-4 flex gap-4 text-xs font-bold text-gray-600">
                  <div className="bg-gray-100 p-2.5 rounded border border-gray-200 text-center min-w-24">
                    <span className="text-xl font-bold text-blue-600 block">{completedMilestones}</span>
                    <span>Done</span>
                  </div>
                  <div className="bg-gray-100 p-2.5 rounded border border-gray-200 text-center min-w-24">
                    <span className="text-xl font-bold text-gray-700 block">{totalMilestones - completedMilestones}</span>
                    <span>Pending</span>
                  </div>
                </div>
              </div>

              {/* Simplified Student-style progress display */}
              <div className="text-center bg-blue-50 border border-blue-200 rounded-lg p-5 w-40">
                <span className="text-5xl font-extrabold text-blue-600 block">{overallProgress}%</span>
                <span className="text-xs font-bold text-blue-800 uppercase tracking-wider block mt-1">Completed</span>
                <div className="w-full h-2 bg-gray-200 rounded-full mt-3 overflow-hidden">
                  <div className="h-full bg-blue-600" style={{ width: `${overallProgress}%` }}></div>
                </div>
              </div>
            </div>

            {/* Focus Areas Category Breakdown */}
            <div className="bg-white border border-gray-300 rounded-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Focus Area Breakdown</h2>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-gray-700 text-xs font-semibold mb-1">
                    <span>Technical Skills</span>
                    <span>{categoryStats.technical.completed} / {categoryStats.technical.total} ({getCategoryPercent('technical')}%)</span>
                  </div>
                  <div className="w-full h-3 bg-gray-205 border rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600"
                      style={{ width: `${getCategoryPercent('technical')}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-gray-700 text-xs font-semibold mb-1">
                    <span>Portfolio Building</span>
                    <span>{categoryStats.portfolio.completed} / {categoryStats.portfolio.total} ({getCategoryPercent('portfolio')}%)</span>
                  </div>
                  <div className="w-full h-3 bg-gray-205 border rounded-full overflow-hidden">
                    <div
                      className="h-full bg-indigo-600"
                      style={{ width: `${getCategoryPercent('portfolio')}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-gray-700 text-xs font-semibold mb-1">
                    <span>Placement Readiness</span>
                    <span>{categoryStats.placement.completed} / {categoryStats.placement.total} ({getCategoryPercent('placement')}%)</span>
                  </div>
                  <div className="w-full h-3 bg-gray-205 border rounded-full overflow-hidden">
                    <div
                      className="h-full bg-purple-600"
                      style={{ width: `${getCategoryPercent('placement')}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Semester Progression */}
          <div>
            <div className="bg-white border border-gray-300 rounded-lg p-5">
              <h2 className="text-xl font-bold text-gray-800 mb-3">Semester Progress</h2>
              <div className="space-y-3">
                {semesterStats.map(sem => (
                  <div key={sem.semester} className="flex flex-col gap-1">
                    <div className="flex justify-between text-xs font-semibold text-gray-550">
                      <span>Semester {sem.semester}</span>
                      <span>{sem.percentage}% ({sem.completed}/{sem.total})</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500"
                        style={{ width: `${sem.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProgressPage;
