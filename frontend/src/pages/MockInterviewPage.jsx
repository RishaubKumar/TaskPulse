import { useState } from 'react';
import Sidebar from '../components/layout/Sidebar';

const questionBanks = {
  dsa: [
    {
      q: 'How would you detect a cycle in a singly linked list? What is the optimal time and space complexity?',
      hint: "Think of Floyd's Tortoise and Hare algorithm.",
      answer: 'Use two pointers moving at different speeds: slow moves 1 step and fast moves 2 steps. If they meet, a cycle exists. Time complexity is O(N) and space complexity is O(1).'
    },
    {
      q: 'Explain the difference between BFS and DFS traversal. When would you prefer BFS over DFS in a graph?',
      hint: 'Consider shortest path in unweighted graphs vs recursive exploration.',
      answer: 'BFS uses a Queue and explores level by level, making it ideal for finding the shortest path in unweighted graphs. DFS uses a Stack/recursion and is great for topological sort, cycle detection, and maze solving.'
    },
    {
      q: 'What is the average and worst-case time complexity of QuickSort? How can you avoid the worst case?',
      hint: 'Pivot selection matters.',
      answer: 'Average time complexity is O(N log N). Worst case is O(N^2) when the array is already sorted or all elements are identical. Randomized pivot selection or median-of-three prevents the worst-case degradation.'
    }
  ],
  core: [
    {
      q: 'Explain ACID properties in Database Management Systems with a real-world banking example.',
      hint: 'Atomicity, Consistency, Isolation, Durability.',
      answer: 'Atomicity ensures all-or-nothing debit/credit. Consistency ensures account balance constraints remain valid. Isolation ensures concurrent transfers do not corrupt data. Durability ensures committed transfers persist even after power loss.'
    },
    {
      q: 'What is the difference between a Process and a Thread in Operating Systems?',
      hint: 'Address space and context-switching overhead.',
      answer: 'A process is an executing program with its own dedicated memory space. A thread is a lightweight unit of execution within a process that shares memory and resources, reducing context-switch overhead.'
    },
    {
      q: 'Explain the 3-Way Handshake mechanism in TCP.',
      hint: 'SYN, SYN-ACK, ACK.',
      answer: 'Client sends SYN to initiate connection. Server responds with SYN-ACK acknowledging client sequence number. Client responds with ACK. Both parties now synchronize sequence numbers for reliable transmission.'
    }
  ],
  web: [
    {
      q: 'How does the React Virtual DOM work and how does Reconciliation improve rendering performance?',
      hint: 'Diffing algorithm and batched updates.',
      answer: 'React keeps a lightweight virtual copy of the DOM in memory. When state updates, React diffs the new Virtual DOM against the previous snapshot and computes minimal actual DOM manipulations, batching updates for high efficiency.'
    },
    {
      q: 'What is CORS and how do you resolve it in an Express.js backend application?',
      hint: 'Cross-Origin Resource Sharing and HTTP headers.',
      answer: 'CORS is a browser security mechanism that blocks requests from different origins (domains/ports). In Express, resolve it using the cors() middleware or setting Access-Control-Allow-Origin headers.'
    },
    {
      q: 'Explain how JWT authentication works in full stack web applications.',
      hint: 'Header, payload, signature, and client-side token storage.',
      answer: 'Upon valid login, server signs a token containing the userId with a secret key. The client stores it in memory or localStorage and attaches it as Bearer token in the Authorization header for protected API routes.'
    }
  ],
  hr: [
    {
      q: 'Tell me about a challenging project you built and how you handled a technical roadblock.',
      hint: 'Use the STAR method (Situation, Task, Action, Result).',
      answer: 'Describe your core project (like TaskPulse), specify the exact challenge (e.g., handling asynchronous state or configuring MongoDB connection), how you systematically debugged it, and the successful outcome.'
    },
    {
      q: 'Where do you see yourself in 2 to 3 years after graduating from college?',
      hint: 'Focus on growth as a dependable engineer and mastering system design.',
      answer: 'Express enthusiasm to contribute actively to core production features, deepen skills in software architecture and code quality, and take ownership of critical components within the engineering team.'
    }
  ]
};

function MockInterviewPage() {
  const [track, setTrack] = useState('dsa');
  const [activeQuestionIdx, setActiveQuestionIdx] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);

  const questions = questionBanks[track] || questionBanks.dsa;
  const currentQ = questions[activeQuestionIdx] || questions[0];

  const handleTrackChange = (newTrack) => {
    setTrack(newTrack);
    setActiveQuestionIdx(0);
    setUserAnswer('');
    setShowAnswer(false);
  };

  const handleNextQ = () => {
    setActiveQuestionIdx((prev) => (prev + 1) % questions.length);
    setUserAnswer('');
    setShowAnswer(false);
  };

  return (
    <div className="flex bg-gray-50 min-h-screen font-sans">
      <Sidebar />

      <main className="flex-1 p-6 overflow-y-auto max-h-screen">
        <header className="mb-6 border-b border-gray-200 pb-4">
          <h1 className="text-2xl font-bold text-gray-900">Campus Mock Interview Practice</h1>
          <p className="text-xs text-gray-600 mt-1">
            Practice technical and behavioral interview questions commonly asked by placement recruiters.
          </p>
        </header>

        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => handleTrackChange('dsa')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition cursor-pointer ${
              track === 'dsa'
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
            }`}
          >
            DSA & Algorithms
          </button>
          <button
            onClick={() => handleTrackChange('core')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition cursor-pointer ${
              track === 'core'
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
            }`}
          >
            Core CS (OS, DBMS, Networks)
          </button>
          <button
            onClick={() => handleTrackChange('web')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition cursor-pointer ${
              track === 'web'
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
            }`}
          >
            Web Development & Full Stack
          </button>
          <button
            onClick={() => handleTrackChange('hr')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition cursor-pointer ${
              track === 'hr'
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
            }`}
          >
            HR & Behavioral
          </button>
        </div>

        <div className="max-w-3xl bg-white border border-gray-300 rounded-lg p-6 shadow-sm space-y-4">
          <div className="flex justify-between items-center pb-3 border-b border-gray-100">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
              Question {activeQuestionIdx + 1} of {questions.length}
            </span>
            <button
              onClick={handleNextQ}
              className="text-xs text-blue-600 hover:underline font-semibold cursor-pointer"
            >
              Next Question →
            </button>
          </div>

          <div>
            <h2 className="text-base font-bold text-gray-900 leading-snug">
              {currentQ.q}
            </h2>
            <p className="text-xs text-gray-500 mt-1 italic">
              Hint: {currentQ.hint}
            </p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Your Answer / Notes
            </label>
            <textarea
              rows="5"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Structure your answer here before viewing the model solution..."
              className="w-full border border-gray-300 rounded p-3 text-xs outline-none focus:border-blue-600"
            ></textarea>
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => setShowAnswer(!showAnswer)}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-semibold rounded border border-gray-300 transition cursor-pointer"
            >
              {showAnswer ? 'Hide Solution' : 'Reveal Model Answer'}
            </button>

            <button
              onClick={handleNextQ}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded transition cursor-pointer"
            >
              Mark Done & Next
            </button>
          </div>

          {showAnswer && (
            <div className="mt-4 p-4 bg-emerald-50 border border-emerald-200 rounded text-xs space-y-1">
              <span className="font-bold text-emerald-800 uppercase tracking-wider block text-[11px]">
                Model Answer & Recruiter Key Points
              </span>
              <p className="text-gray-800 leading-relaxed">{currentQ.answer}</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default MockInterviewPage;
