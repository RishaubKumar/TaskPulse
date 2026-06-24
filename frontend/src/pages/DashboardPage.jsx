import { useState } from "react";
import axios from "axios";
import Sidebar from "../components/layout/Sidebar";

function DashboardPage() {
  const userJson = localStorage.getItem("user");
  let initialUser = null;
  if (userJson) {
    initialUser = JSON.parse(userJson);
  }
  const [user, setUser] = useState(initialUser);

  let initialRoadmap = [];
  if (user) {
    if (user.roadmap) {
      initialRoadmap = user.roadmap;
    }
  }
  const [roadmap, setRoadmap] = useState(initialRoadmap);

  let firstName = "Rahul";
  if (user) {
    firstName = user.firstName;
  }
  let currentYearStr = "Year 2";
  if (user) {
    if (user.currentYear) {
      currentYearStr = user.currentYear;
    }
  }
  
  let targetSemester = 3;
  if (currentYearStr.includes("1")) targetSemester = 1;
  else if (currentYearStr.includes("2")) targetSemester = 3;
  else if (currentYearStr.includes("3")) targetSemester = 5;
  else if (currentYearStr.includes("4")) targetSemester = 7;

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
      .then(res => console.log("Roadmap updated"))
      .catch(err => console.error(err));
    }
  };

  const currentSemData = roadmap.find(sem => sem.semester === targetSemester) || { milestones: [] };
  const currentMilestones = currentSemData.milestones || [];

  let totalMilestones = 0;
  let completedMilestones = 0;
  roadmap.forEach(sem => {
    if (sem.milestones) {
      sem.milestones.forEach(m => {
        totalMilestones++;
        if (m.status === "done") {
          completedMilestones++;
        }
      });
    }
  });
  let percentComplete = 0;
  if (totalMilestones > 0) {
    percentComplete = Math.round((completedMilestones / totalMilestones) * 100);
  }

  const getCategoryStats = (categoryName) => {
    const categoryMilestones = currentMilestones.filter(m => m.category.toLowerCase().includes(categoryName.toLowerCase()) || categoryName.toLowerCase().includes(m.category.toLowerCase()));
    const total = categoryMilestones.length;
    const completed = categoryMilestones.filter(m => m.status === "done").length;
    let percentage = 0;
    if (total > 0) {
      percentage = (completed / total) * 100;
    }
    return { completed, total, percentage };
  };

  let milestonesContent;
  if (currentMilestones.length > 0) {
    milestonesContent = currentMilestones.map((m, idx) => {
      let taskClass = "text-slate-700";
      if (m.status === "done") {
        taskClass = "line-through text-slate-400";
      }

      let statusText = "Pending";
      if (m.status === "done") {
        statusText = "Completed";
      }

      return (
        <div key={idx} className="flex items-start gap-3">
          <input
            type="checkbox"
            checked={m.status === "done"}
            onChange={() => toggleMilestone(targetSemester, idx)}
            className="mt-1 h-5 w-5 rounded border-blue-200 text-blue-600 focus:ring-blue-500 cursor-pointer"
          />
          <div>
            <h3 className={`font-semibold ${taskClass}`}>
              {m.task}
            </h3>
            <p className="text-slate-400 text-sm mt-0.5">
              {m.category} · {statusText}
            </p>
          </div>
        </div>
      );
    });
  } else {
    milestonesContent = (
      <div className="text-slate-400 text-sm">
        No milestones generated yet. Complete the onboarding wizard to build your roadmap!
      </div>
    );
  }

  const techStats = getCategoryStats("Technical");
  const portfolioStats = getCategoryStats("Portfolio");
  const placementStats = getCategoryStats("Placement");

  return (
    <div className="flex bg-[#F8FAFC] min-h-screen">

      <Sidebar />

      <div className="flex-1 p-8">

        {/* Header */}

        <div>

          <h1 className="text-5xl font-semibold text-slate-800">
            Good morning, {firstName}
          </h1>

          <p className="text-slate-500 mt-2 text-xl">
            You are on track: {currentMilestones.filter(m => m.status !== "done").length} milestones due this semester ·
            Placement season in 18 months
          </p>

        </div>

        {/* Alert */}

        <div className="mt-8 border border-blue-200 bg-blue-50/50 rounded-2xl p-6">

          <p className="text-blue-800 text-lg">

            You haven't added a project to your Evidence Vault this month.
            Students targeting product companies usually have their first
            full-stack project by Semester 4.
            <span className="underline cursor-pointer ml-1">
              Let's plan one now →
            </span>

          </p>

        </div>

        {/* Stats */}

        <div className="grid grid-cols-4 gap-5 mt-8">

          <div className="bg-white border border-blue-50/50 hover:border-blue-100 shadow-sm rounded-2xl p-6 transition-all">
            <h2 className="text-5xl font-bold text-blue-600">{percentComplete}%</h2>
            <p className="text-slate-600 mt-1">Roadmap complete</p>
          </div>

          <div className="bg-white border border-blue-50/50 hover:border-blue-100 shadow-sm rounded-2xl p-6 transition-all">
            <h2 className="text-5xl font-bold text-blue-600">{completedMilestones}</h2>
            <p className="text-slate-600 mt-1">Evidence items</p>
            <span className="text-green-600 text-sm font-medium">
              +{completedMilestones} overall
            </span>
          </div>

          <div className="bg-white border border-blue-50/50 hover:border-blue-100 shadow-sm rounded-2xl p-6 transition-all">
            <h2 className="text-5xl font-bold text-blue-600">142</h2>
            <p className="text-slate-600 mt-1">LeetCode solved</p>
            <span className="text-green-600 text-sm font-medium">
              On target
            </span>
          </div>

          <div className="bg-white border border-blue-50/50 hover:border-blue-100 shadow-sm rounded-2xl p-6 transition-all">
            <h2 className="text-5xl font-bold text-blue-600">21</h2>
            <p className="text-slate-600 mt-1">Day streak</p>
            <span className="text-orange-500 text-sm font-medium">
              Keep it up!
            </span>
          </div>

        </div>

        {/* Middle */}

        <div className="grid grid-cols-2 gap-6 mt-8">

          {/* Milestones */}

          <div className="bg-white rounded-2xl border border-blue-50/50 p-6 shadow-sm">

            <div className="flex justify-between items-center">

              <h2 className="text-3xl text-slate-800 font-bold">
                This week's milestones
              </h2>

              <button className="text-blue-600 font-semibold cursor-pointer">
                View all
              </button>

            </div>

            <div className="mt-6 space-y-6">
              {milestonesContent}
            </div>

          </div>

          {/* Semester Progress */}

          <div className="bg-white rounded-2xl border border-blue-50/50 p-6 shadow-sm">

            <div className="flex justify-between items-center">

              <h2 className="text-3xl text-slate-800 font-bold">
                Semester {targetSemester} progress
              </h2>

              <span className="text-blue-600 font-semibold">
                Semester {targetSemester} of 8
              </span>

            </div>

            <div className="space-y-8 mt-8">

              <div>

                <div className="flex justify-between text-slate-600 text-sm font-semibold mb-1">
                  <p>Technical skills</p>
                  <p>{techStats.completed} / {techStats.total} done</p>
                </div>

                <progress
                  value={techStats.percentage}
                  max="100"
                  className="w-full h-2 rounded-full overflow-hidden bg-blue-50 text-blue-600"
                />

              </div>

              <div>

                <div className="flex justify-between text-slate-600 text-sm font-semibold mb-1">
                  <p>Portfolio building</p>
                  <p>{portfolioStats.completed} / {portfolioStats.total} done</p>
                </div>

                <progress
                  value={portfolioStats.percentage}
                  max="100"
                  className="w-full h-2 rounded-full overflow-hidden bg-blue-50 text-blue-600"
                />

              </div>

              <div>

                <div className="flex justify-between text-slate-600 text-sm font-semibold mb-1">
                  <p>Placement readiness</p>
                  <p>{placementStats.completed} / {placementStats.total} done</p>
                </div>

                <progress
                  value={placementStats.percentage}
                  max="100"
                  className="w-full h-2 rounded-full overflow-hidden bg-blue-50 text-blue-600"
                />

              </div>

            </div>

          </div>

        </div>

        {/* Opportunities */}

        <div className="bg-white rounded-2xl border border-blue-50/50 mt-8 p-6 shadow-sm">

          <div className="flex justify-between items-center">

            <h2 className="text-3xl text-slate-800 font-bold">
              Upcoming deadlines & opportunities
            </h2>

            <button className="text-blue-600 font-semibold cursor-pointer">
              See calendar
            </button>

          </div>

          <div className="space-y-5 mt-6">

            <div className="flex justify-between text-slate-700">
              <p>Internship applications close (Flipkart & Razorpay)</p>
              <span className="font-medium text-slate-500">3 days</span>
            </div>

            <div className="flex justify-between text-slate-700">
              <p>Google Summer of Code: applications open</p>
              <span className="font-medium text-slate-500">2 weeks</span>
            </div>

            <div className="flex justify-between text-slate-700">
              <p>Codeforces Round 920: practice contest</p>
              <span className="font-medium text-slate-500">This Saturday</span>
            </div>

            <div className="flex justify-between text-slate-700">
              <p>Mid-semester mock interview session</p>
              <span className="font-medium text-slate-500">Next week</span>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default DashboardPage;