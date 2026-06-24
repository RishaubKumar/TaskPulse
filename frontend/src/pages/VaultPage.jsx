import { useState } from "react";
import Sidebar from "../components/layout/Sidebar";

function VaultPage() {
  const userJson = localStorage.getItem("user");
  
  let user = null;
  if (userJson) {
    user = JSON.parse(userJson);
  }

  const roadmap = user?.roadmap || [];

  // Get completed milestones
  const completedMilestones = [];
  roadmap.forEach(sem => {
    if (sem.milestones) {
      sem.milestones.forEach((m, idx) => {
        if (m.status === "done") {
          completedMilestones.push({
            ...m,
            semester: sem.semester,
            originalIndex: idx
          });
        }
      });
    }
  });

  const [evidenceList, setEvidenceList] = useState([
    {
      id: 1,
      title: "Google Summer of Code Proposal",
      milestone: "Apply to GSoC or open-source programs",
      semester: 3,
      type: "Document",
      link: "https://drive.google.com/GSoc-proposal-draft",
      date: "2026-06-15",
      status: "Verified"
    },
    {
      id: 2,
      title: "Personal Portfolio Website",
      milestone: "Build custom portfolio page",
      semester: 3,
      type: "GitHub Link",
      link: "https://github.com/student/portfolio",
      date: "2026-06-10",
      status: "Verified"
    }
  ]);

  const [selectedMilestone, setSelectedMilestone] = useState("");
  const [evidenceTitle, setEvidenceTitle] = useState("");
  const [evidenceType, setEvidenceType] = useState("GitHub Link");
  const [evidenceLink, setEvidenceLink] = useState("");
  const [fileName, setFileName] = useState("");

  const handleAddEvidence = (e) => {
    e.preventDefault();
    if (!selectedMilestone || !evidenceTitle) return;

    let typeValue = evidenceType;
    if (fileName) {
      typeValue = `File: ${fileName}`;
    }

    const newEvidence = {
      id: Date.now(),
      title: evidenceTitle,
      milestone: selectedMilestone,
      semester: 3,
      type: typeValue,
      link: evidenceLink || "#",
      date: new Date().toISOString().split("T")[0],
      status: "Under Review"
    };

    setEvidenceList([newEvidence, ...evidenceList]);
    setEvidenceTitle("");
    setEvidenceLink("");
    setFileName("");
    setSelectedMilestone("");
  };

  let fileLabel = "Click to select a file";
  if (fileName) {
    fileLabel = `File chosen: ${fileName}`;
  }

  return (
    <div className="flex bg-slate-50 min-h-screen font-sans">
      <Sidebar />
      <div className="flex-1 p-6 overflow-y-auto max-h-screen">
        <div className="mb-6 border-b border-gray-200 pb-4">
          <h1 className="text-3xl font-bold text-gray-800">Evidence Vault</h1>
          <p className="text-gray-600 mt-1 text-base">
            Upload files or add links to prove your milestone completions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Form & Submissions */}
          <div className="lg:col-span-2 space-y-6">
            {/* Submission Form */}
            <div className="bg-white border border-gray-300 rounded-lg p-5">
              <h2 className="text-xl font-bold text-gray-800 mb-3">Submit New Evidence</h2>
              <form onSubmit={handleAddEvidence} className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">
                    Select Completed Milestone
                  </label>
                  <select
                    value={selectedMilestone}
                    onChange={(e) => setSelectedMilestone(e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none"
                    required
                  >
                    <option value="">Select a milestone</option>
                    {completedMilestones.map((m, idx) => (
                      <option key={idx} value={m.task}>
                        [Sem {m.semester}] {m.task}
                      </option>
                    ))}
                    {completedMilestones.length === 0 && (
                      <option disabled>No completed milestones found. Mark milestones done in your roadmap first!</option>
                    )}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1">
                      Evidence Title
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Portfolio Live Link"
                      value={evidenceTitle}
                      onChange={(e) => setEvidenceTitle(e.target.value)}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1">
                      Submission Type
                    </label>
                    <select
                      value={evidenceType}
                      onChange={(e) => setEvidenceType(e.target.value)}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none"
                    >
                      <option value="GitHub Link">GitHub Link</option>
                      <option value="Certificate PDF">Certificate PDF</option>
                      <option value="Project Demo Link">Project Demo Link</option>
                      <option value="Other Document">Other Document</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">
                    URL Link (Optional)
                  </label>
                  <input
                    type="url"
                    placeholder="https://..."
                    value={evidenceLink}
                    onChange={(e) => setEvidenceLink(e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">
                    Upload Document (Mock)
                  </label>
                  <div className="border border-dashed border-gray-300 rounded p-3 text-center cursor-pointer hover:bg-gray-50"
                       onClick={() => {
                         const file = prompt("Enter file name to upload:");
                         if (file) setFileName(file);
                       }}>
                    <p className="text-gray-500 text-xs">
                      {fileLabel}
                    </p>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded py-2.5 font-bold transition-colors text-sm"
                >
                  Add to Evidence Vault
                </button>
              </form>
            </div>

            {/* List of Submissions */}
            <div className="bg-white border border-gray-300 rounded-lg p-5">
              <h2 className="text-xl font-bold text-gray-800 mb-3">Vault Submissions</h2>
              <div className="space-y-3">
                {evidenceList.map((item) => {
                  let statusClass = "bg-yellow-100 text-yellow-850 border border-yellow-200";
                  if (item.status === "Verified") {
                    statusClass = "bg-green-100 text-green-800 border border-green-200";
                  }
                  return (
                    <div key={item.id} className="border border-gray-250 rounded p-3 bg-gray-50/50">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-gray-800 text-base">{item.title}</h3>
                          <p className="text-gray-650 text-xs mt-0.5">Milestone: {item.milestone}</p>
                          <div className="flex gap-3 mt-1.5 text-xs text-gray-500">
                            <span>Type: {item.type}</span>
                            <span>•</span>
                            <span>Date: {item.date}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className={`px-2 py-0.5 rounded text-xs font-bold ${statusClass}`}>
                            {item.status}
                          </span>
                          {item.link !== "#" && (
                            <a
                              href={item.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block text-blue-600 hover:underline text-xs font-semibold mt-1.5"
                            >
                              [View Evidence]
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Completed Checklist */}
          <div className="space-y-6">
            <div className="bg-white border border-gray-300 rounded-lg p-5">
              <h2 className="text-xl font-bold text-gray-800 mb-2">Completed Milestones</h2>
              <p className="text-gray-500 text-xs mb-3">
                Check off items in your Roadmap page to populate this list.
              </p>
              <div className="space-y-2">
                {completedMilestones.map((m, idx) => (
                  <div key={idx} className="bg-gray-50 p-2.5 rounded border border-gray-200 flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <div>
                      <p className="text-gray-800 font-semibold text-xs">{m.task}</p>
                      <p className="text-gray-500 text-[10px] mt-0.5">Semester {m.semester} · {m.category}</p>
                    </div>
                  </div>
                ))}
                {completedMilestones.length === 0 && (
                  <div className="text-gray-400 text-center py-4 text-xs">
                    No completed milestones yet.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VaultPage;
