function LandingPage(){

  return (
    <div className="w-full min-h-screen bg-grey  text-center pt-20 font-sans">
      <div className="flex justify-center w-full">
        <div className="w-fit border border-blue-500 bg-blue-100 text-blue-800 text-sm px-4 py-2 rounded-lg mb-10">
          AI-powered 4-year college roadmap 
        </div>
      </div>
        
      
      <h1 className="text-5xl font-extrabold text-black mb-5 max-w-4xl mx-auto leading-normal">
        Graduate with something <span className="text-blue-600">meaningful</span> to show
      </h1>

      <p className="text-gray-700 text-lg max-w-2xl mx-auto mb-12 px-4">
        Most students reach final year with no portfolio, no internship, no clarity. 
        TaskPulse gives you a personalized roadmap from Day 1 — built by AI, 
        shaped by your goals.
      </p>

      <div className="flex justify-center gap-5">
        <button className="bg-black hover:bg-gray-800 text-white font-bold py-3 px-6 rounded-lg text-md shadow-md">
          Build my roadmap — free
        </button>
        
        <button className="bg-white hover:bg-gray-100 text-black font-bold py-3 px-6 rounded-lg border border-gray-400 text-md shadow-sm">
          See a demo
        </button>
      </div>

    </div>
  );
}

export default LandingPage;