import { useState } from "react";
import axios from "axios";
import Sidebar from "../components/layout/Sidebar";

function RoadmapPage() {
  const userJson = localStorage.getItem("user");
  
  let initialUser = null;
  if (userJson) {
    initialUser = JSON.parse(userJson);
  }

  const [user, setUser] = useState(initialUser);
  const [roadmap, setRoadmap] = useState(user?.roadmap || []);
  const [expandedSemester, setExpandedSemester] = useState(3); 

  const toggleSemester = (semNumber) => {
    let nextExpanded = null;
    if (expandedSemester !== semNumber) {
      nextExpanded = semNumber;
    }
    setExpandedSemester(nextExpanded);
  };

  const toggleMilestone = (semNumber, milestoneIdx) => {
    const updatedRoadmap = roadmap.map(sem => {
      if (sem.semester === semNumber) {
        const updatedMilestones = sem.milestones.map((m, idx) => {
          if (idx === milestoneIdx) {
            let nextStatus = "done";
            if (m.status === "done") {
              nextStatus = "pending";
            }
            return { ...m, status: nextStatus };
          }
          return m;
        });
        return { ...sem, milestones: updatedMilestones };
      }
      return sem;
    });

    setRoadmap(updatedRoadmap);

    if (user) {
      const updatedUser = { ...user, roadmap: updatedRoadmap };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));

      axios.put("/api/user/roadmap", {
        userId: user._id,
        roadmap: updatedRoadmap
      })
      .then(res => console.log("Roadmap updated successfully"))
      .catch(err => console.error(err));
    }
  };

  const getCategoryClass = (category) => {
    const cat = category.toLowerCase();
    if (cat.includes("technical")) return "bg-blue-100 text-blue-800 border border-blue-300";
    if (cat.includes("portfolio")) return "bg-indigo-100 text-indigo-800 border border-indigo-300";
    return "bg-purple-100 text-purple-800 border border-purple-300";
  };

  let roadmapContent = null;
  if (roadmap.length > 0) {
    roadmapContent = (
      <div className="space-y-3">
        {roadmap.map((sem) => {
          const isExpanded = expandedSemester === sem.semester;
          const completedCount = sem.milestones.filter(m => m.status === "done").length;
          const totalCount = sem.milestones.length;
          
          let progressPercentage = 0;
          if (totalCount > 0) {
            progressPercentage = Math.round((completedCount / totalCount) * 100);
          }

          let expandLabel = "[Show]";
          if (isExpanded) {
            expandLabel = "[Hide]";
          }

          return (
            <div key={sem.semester} className="bg-white border border-gray-300 rounded-lg shadow-sm">
              {/* Semester Header Accordion Trigger */}
              <div 
                onClick={() => toggleSemester(sem.semester)}
                className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <h2 className="text-xl font-bold text-gray-800">Semester {sem.semester}</h2>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-gray-550">
                      ({completedCount}/{totalCount} Done)
                    </span>
                    <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-600"
                        style={{ width: `${progressPercentage}%` }}
                      ></div>
                    </div>
                    <span className="text-xs font-bold text-blue-600">{progressPercentage}%</span>
                  </div>
                </div>
                <div className="text-sm font-bold text-gray-500">
                  {expandLabel}
                </div>
              </div>

              {/* Milestones Content */}
              {isExpanded && (
                <div className="px-4 pb-4 border-t border-gray-200 pt-3 bg-gray-50">
                  <div className="space-y-2">
                    {sem.milestones.map((m, idx) => {
                      let titleClass = "text-gray-800";
                      if (m.status === "done") {
                        titleClass = "line-through text-gray-400";
                      }
                      return (
                        <div key={idx} className="flex items-center justify-between bg-white p-3 rounded border border-gray-200">
                          <div className="flex items-start gap-3">
                            <input
                              type="checkbox"
                              checked={m.status === "done"}
                              onChange={() => toggleMilestone(sem.semester, idx)}
                              className="mt-1 h-4 w-4 text-blue-600 cursor-pointer"
                            />
                            <div>
                              <h3 className={`font-semibold text-sm ${titleClass}`}>
                                {m.task}
                              </h3>
                              <p className="text-gray-500 text-xs mt-0.5">
                                Type: {m.category}
                              </p>
                            </div>
                          </div>
                          <div>
                            <span className={`px-2 py-0.5 rounded text-xs font-semibold ${getCategoryClass(m.category)}`}>
                              {m.category}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  } else {
    roadmapContent = (
      <div className="bg-white rounded border border-gray-300 p-6 text-center">
        <p className="text-gray-600 text-base mb-2">No roadmap generated yet.</p>
        <p className="text-gray-550 text-xs">Please complete the onboarding questions first.</p>
      </div>
    );
  }

  return (
    <div className="flex bg-slate-50 min-h-screen font-sans">
      <Sidebar />
      <div className="flex-1 p-6 overflow-y-auto max-h-screen">
        <div className="mb-6 border-b border-gray-200 pb-4">
          <h1 className="text-3xl font-bold text-gray-800">My Roadmap</h1>
          <p className="text-gray-600 mt-1 text-base">
            Your structured 4-year plan. Click on each semester to see your milestones.
          </p>
        </div>

        {roadmapContent}
      </div>
    </div>
  );
}

export default RoadmapPage;
