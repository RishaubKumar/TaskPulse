import React, { useEffect, useState } from "react";
import axios from "axios";
import CommentCard from "./CommentCard";

function StepFive({ formData }) {
  const [loading, setLoading] = useState(true);
  const [roadmap, setRoadmap] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const userJson = localStorage.getItem("user");
    let user = null;
    if (userJson) {
      user = JSON.parse(userJson);
    }
    let userId = null;
    if (user) {
      userId = user._id;
    }

    axios.post("/api/generate-roadmap", {
      ...formData,
      userId
    })
    .then(res => {
      setRoadmap(res.data.roadmap);
      setLoading(false);
      if (user) {
        user.roadmap = res.data.roadmap;
        localStorage.setItem("user", JSON.stringify(user));
      }
    })
    .catch(err => {
      console.error(err);
      setError("Failed to generate roadmap. Please try again.");
      setLoading(false);
    });
  }, [formData]);

  return (
    <>
      <CommentCard comment="Your roadmap is ready. Here's your personalised 4-year plan to go from intermediate to placement-ready at a top product company." />
      <div className="mb-6 max-h-96 overflow-y-auto border border-gray-200 rounded-xl p-4 bg-white shadow-sm mt-5">
        <h1 className="inline text-left text-black font-bold text-3xl">Your 4-year roadmap</h1>
        <p className="text-gray-600 text-sm md:text-base mb-4">AI-generated based on your answers. You can adjust milestones anytime.</p>
        
        {loading && (
          <div className="text-center py-10">
            <p className="mt-4 text-gray-600 font-medium animate-pulse">Generating your personalized roadmap with Gemini AI...</p>
          </div>
        )}

        {error && (
          <div className="text-red-500 text-center py-5">
            <p>{error}</p>
          </div>
        )}

        {roadmap && (
          <div className="space-y-6">
            {roadmap.map((sem) => (
              <div key={sem.semester} className="border-b border-gray-100 pb-4 last:border-0">
                <h3 className="font-bold text-lg text-blue-800 mb-2">Semester {sem.semester}</h3>
                <ul className="list-disc pl-5 space-y-1.5">
                  {sem.milestones.map((m, idx) => (
                    <li key={idx} className="text-gray-700 text-sm text-left">
                      <span className="font-semibold text-indigo-600">[{m.category}]</span> {m.task}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default StepFive;