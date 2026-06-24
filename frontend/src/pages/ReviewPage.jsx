import { useState } from "react";
import Sidebar from "../components/layout/Sidebar";

function ReviewPage() {
  const userJson = localStorage.getItem("user");
  
  let user = null;
  if (userJson) {
    user = JSON.parse(userJson);
  }

  const roadmap = user?.roadmap || [];

  const completedMilestones = [];
  const pendingMilestones = [];
  
  roadmap.forEach(sem => {
    if (sem.semester === 3) { 
      sem.milestones.forEach(m => {
        if (m.status === "done") completedMilestones.push(m);
        else pendingMilestones.push(m);
      });
    }
  });

  const [reviews, setReviews] = useState([
    {
      id: 1,
      date: "Sunday, Jun 21, 2026",
      summary: "Excellent progress on technical skills. Your DSA preparation is on track. Focus next on portfolio and design patterns.",
      priorities: [
        "Complete outstanding technical milestones for this week",
        "Upload website links to Evidence Vault to build portfolio visibility",
        "Practice 5 Medium LeetCode problems on Arrays & Strings"
      ],
      score: "85%"
    },
    {
      id: 2,
      date: "Sunday, Jun 14, 2026",
      summary: "Solid week. Keep up the streak. Ensure you don't fall behind on mock interview practices scheduled for later semesters.",
      priorities: [
        "Revise system design basics",
        "Set up local development environment for next project"
      ],
      score: "80%"
    }
  ]);

  const [generating, setGenerating] = useState(false);

  const handleGenerateReview = () => {
    setGenerating(true);
    setTimeout(() => {
      let summary = "";
      let priorities = [];
      let score = "";

      if (pendingMilestones.length > 0) {
        summary = `You have ${pendingMilestones.length} pending milestones. To hit your product company targets, prioritize finishing the "${pendingMilestones[0].task}" milestone.`;
        priorities = pendingMilestones.map(m => `Focus on milestone: ${m.task}`);
        score = "75%";
      } else {
        summary = `Amazing! You have completed all milestones for this week. Continue maintaining this streak to remain ahead of placement schedules.`;
        priorities = ["Explore advanced topics in next semester's roadmap", "Refine existing projects in your Evidence Vault"];
        score = "100%";
      }

      const newReview = {
        id: Date.now(),
        date: `Sunday, Jun 28, 2026 (Mid-Week Prediction)`,
        summary,
        priorities,
        score
      };

      setReviews([newReview, ...reviews]);
      setGenerating(false);
    }, 1500);
  };

  let buttonLabel = "Get Live AI Review";
  if (generating) {
    buttonLabel = "Loading...";
  }

  return (
    <div className="flex bg-slate-50 min-h-screen font-sans">
      <Sidebar />
      <div className="flex-1 p-6 overflow-y-auto max-h-screen">
        <div className="mb-6 border-b border-gray-200 pb-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Weekly Review</h1>
            <p className="text-gray-600 mt-1 text-base">
              Gemini AI analyzes your updates every Sunday to optimize your weekly priority items.
            </p>
          </div>
          <button
            onClick={handleGenerateReview}
            disabled={generating}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-5 rounded text-sm transition-colors disabled:bg-blue-350 cursor-pointer"
          >
            {buttonLabel}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Review Section */}
          <div className="lg:col-span-2 space-y-4">
            {reviews.map((rev, index) => {
              let borderClass = "border-gray-300";
              if (index === 0) {
                borderClass = "border-blue-400 border-2";
              }
              return (
                <div 
                  key={rev.id} 
                  className={`bg-white border rounded-lg p-5 ${borderClass}`}
                >
                <div className="flex justify-between items-center mb-3">
                  <span className="text-gray-500 text-xs font-bold">{rev.date}</span>
                  <div className="flex items-center gap-1.5 text-xs">
                    <span className="text-gray-600">Readiness Score:</span>
                    <span className="font-extrabold text-blue-600 text-sm">{rev.score}</span>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded p-3 mb-4">
                  <h3 className="font-bold text-blue-800 text-xs uppercase mb-1">AI Recommendation</h3>
                  <p className="text-gray-700 text-xs leading-relaxed">{rev.summary}</p>
                </div>

                <div>
                  <h4 className="font-bold text-gray-600 mb-2 text-xs uppercase tracking-wider">
                    High Priority Action Items
                  </h4>
                  <ul className="space-y-2">
                    {rev.priorities.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-gray-700">
                        <span className="font-bold text-blue-600">[{idx + 1}]</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
          </div>

          {/* Quick Stats Summary Card */}
          <div className="space-y-6">
            <div className="bg-white border border-gray-300 rounded-lg p-5">
              <h2 className="text-lg font-bold text-gray-800 mb-3">Weekly Snapshot</h2>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between items-center py-1.5 border-b border-gray-200">
                  <span className="text-gray-600">Completed (Sem 3)</span>
                  <span className="font-bold text-gray-800">{completedMilestones.length}</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-gray-200">
                  <span className="text-gray-600">Pending (Sem 3)</span>
                  <span className="font-bold text-gray-800">{pendingMilestones.length}</span>
                </div>
                <div className="flex justify-between items-center py-1.5">
                  <span className="text-gray-600">Current AI Score</span>
                  <span className="font-bold text-blue-650">{reviews[0]?.score || "N/A"}</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-800 text-white rounded-lg p-5">
              <h3 className="font-bold text-sm mb-1.5">Why Sunday Reviews?</h3>
              <p className="text-gray-300 text-xs leading-relaxed">
                Consistency is key. The AI review scans completed milestones, lists missing evidence documents, and keeps you prepared for placement drives.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReviewPage;
