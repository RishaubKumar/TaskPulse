import { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/layout/Sidebar';
import { useAuth } from '../hooks/useAuth';

function VaultPage() {
  const { user } = useAuth();
  const [evidenceList, setEvidenceList] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedMilestone, setSelectedMilestone] = useState('');
  const [evidenceTitle, setEvidenceTitle] = useState('');
  const [evidenceType, setEvidenceType] = useState('GitHub Link');
  const [evidenceLink, setEvidenceLink] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  const roadmap = user?.roadmap || [];
  const completedMilestones = [];

  roadmap.forEach((sem) => {
    if (sem.milestones) {
      sem.milestones.forEach((m) => {
        if (m.status === 'done') {
          completedMilestones.push({
            ...m,
            semester: sem.semester
          });
        }
      });
    }
  });

  useEffect(() => {
    const fetchEvidence = async () => {
      try {
        setLoading(true);
        const res = await axios.get('/api/user/evidence');
        if (res.data && res.data.evidence) {
          setEvidenceList(res.data.evidence);
        }
      } catch (err) {
        console.error('Error fetching evidence:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvidence();
  }, []);

  const handleAddEvidence = async (e) => {
    e.preventDefault();
    if (!selectedMilestone || !evidenceTitle.trim()) return;

    setSubmitting(true);
    setStatusMessage('');

    try {
      const res = await axios.post('/api/user/evidence', {
        title: evidenceTitle.trim(),
        milestone: selectedMilestone,
        type: evidenceType,
        link: evidenceLink.trim() || '#',
        status: 'Verified'
      });

      if (res.data && res.data.evidence) {
        setEvidenceList(res.data.evidence);
        setEvidenceTitle('');
        setEvidenceLink('');
        setSelectedMilestone('');
        setStatusMessage('Evidence saved to vault successfully!');
        setTimeout(() => setStatusMessage(''), 3000);
      }
    } catch (err) {
      console.error('Error saving evidence:', err);
      setStatusMessage('Failed to save evidence. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteEvidence = async (id) => {
    try {
      const res = await axios.delete(`/api/user/evidence/${id}`);
      if (res.data && res.data.evidence) {
        setEvidenceList(res.data.evidence);
      }
    } catch (err) {
      console.error('Error deleting evidence:', err);
    }
  };

  return (
    <div className="flex bg-gray-50 min-h-screen font-sans">
      <Sidebar />

      <main className="flex-1 p-6 overflow-y-auto max-h-screen">
        <header className="mb-6 border-b border-gray-200 pb-4">
          <h1 className="text-2xl font-bold text-gray-900">Evidence Vault</h1>
          <p className="text-xs text-gray-600 mt-1">
            Maintain verified proof (GitHub repositories, live deployments, certificates) for your completed milestones.
          </p>
        </header>

        {statusMessage && (
          <div className="mb-4 p-3 bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold rounded">
            {statusMessage}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white border border-gray-300 rounded-lg p-5 shadow-sm">
              <h2 className="text-base font-bold text-gray-900 mb-3 pb-2 border-b border-gray-100">
                Log New Portfolio Evidence
              </h2>

              <form onSubmit={handleAddEvidence} className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Select Milestone
                  </label>
                  <select
                    value={selectedMilestone}
                    onChange={(e) => setSelectedMilestone(e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-xs outline-none bg-white focus:border-blue-600"
                    required
                  >
                    <option value="">-- Choose a milestone --</option>
                    {completedMilestones.map((m, idx) => (
                      <option key={idx} value={m.task}>
                        [Sem {m.semester}] {m.task} (Completed)
                      </option>
                    ))}
                    {completedMilestones.length === 0 && (
                      <option value="General College Project">
                        General College Project / Self-Study Milestone
                      </option>
                    )}
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Evidence Title
                    </label>
                    <input
                      type="text"
                      value={evidenceTitle}
                      onChange={(e) => setEvidenceTitle(e.target.value)}
                      placeholder="e.g. Distributed Task Scheduler in Go"
                      className="w-full border border-gray-300 rounded px-3 py-2 text-xs outline-none focus:border-blue-600"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Evidence Type
                    </label>
                    <select
                      value={evidenceType}
                      onChange={(e) => setEvidenceType(e.target.value)}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-xs outline-none bg-white focus:border-blue-600"
                    >
                      <option value="GitHub Link">GitHub Link</option>
                      <option value="Live Project Demo">Live Project Demo</option>
                      <option value="Certificate PDF Link">Certificate PDF Link</option>
                      <option value="Research Paper / Writeup">Research Paper / Writeup</option>
                      <option value="Other Proof">Other Proof</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    URL / Resource Link (Optional)
                  </label>
                  <input
                    type="text"
                    value={evidenceLink}
                    onChange={(e) => setEvidenceLink(e.target.value)}
                    placeholder="https://github.com/... or https://drive.google.com/..."
                    className="w-full border border-gray-300 rounded px-3 py-2 text-xs outline-none focus:border-blue-600"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded text-xs transition disabled:opacity-60 cursor-pointer"
                >
                  {submitting ? 'Saving...' : 'Add Evidence Item'}
                </button>
              </form>
            </div>

            <div className="bg-white border border-gray-300 rounded-lg p-5 shadow-sm">
              <h2 className="text-base font-bold text-gray-900 mb-3 pb-2 border-b border-gray-100">
                Logged Evidence Records ({evidenceList.length})
              </h2>

              {loading ? (
                <p className="text-xs text-gray-500 py-4">Loading evidence items...</p>
              ) : evidenceList.length === 0 ? (
                <p className="text-xs text-gray-500 py-4 text-center">
                  No evidence records logged yet. Add your first project link above!
                </p>
              ) : (
                <div className="space-y-3">
                  {evidenceList.map((item) => (
                    <div
                      key={item._id || item.id}
                      className="border border-gray-200 rounded p-3 bg-gray-50/50 flex justify-between items-start gap-3"
                    >
                      <div className="min-w-0 flex-1">
                        <h3 className="font-bold text-xs text-gray-900 truncate">{item.title}</h3>
                        <p className="text-[11px] text-gray-600 mt-0.5">Milestone: {item.milestone}</p>
                        <div className="flex gap-2 text-[10px] text-gray-500 mt-1">
                          <span className="font-medium">{item.type}</span>
                          <span>•</span>
                          <span>{item.date}</span>
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-1.5 shrink-0">
                        <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
                          {item.status || 'Verified'}
                        </span>
                        {item.link && item.link !== '#' && (
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-600 hover:underline font-semibold"
                          >
                            Open Link ↗
                          </a>
                        )}
                        <button
                          onClick={() => handleDeleteEvidence(item._id)}
                          className="text-[10px] text-red-600 hover:underline cursor-pointer"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div>
            <div className="bg-white border border-gray-300 rounded-lg p-5 shadow-sm">
              <h2 className="text-base font-bold text-gray-900 mb-2">
                Completed Milestones Checklist
              </h2>
              <p className="text-[11px] text-gray-500 mb-3">
                Check off items in your Roadmap page to make them available for evidence logging.
              </p>

              {completedMilestones.length === 0 ? (
                <div className="text-xs text-gray-500 py-3 text-center border-t border-gray-100">
                  No completed milestones yet. Mark items done on the Roadmap page!
                </div>
              ) : (
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {completedMilestones.map((m, idx) => (
                    <div
                      key={idx}
                      className="p-2 bg-gray-50 rounded border border-gray-200 text-xs flex items-start gap-2"
                    >
                      <span className="text-emerald-600 font-bold">✓</span>
                      <div className="min-w-0">
                        <p className="font-medium text-gray-800 truncate">{m.task}</p>
                        <span className="text-[10px] text-gray-500 block">
                          Sem {m.semester} • {m.category}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default VaultPage;
