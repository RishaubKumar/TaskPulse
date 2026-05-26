import LandingPageSCard from "../components/LandingpageScard";
import LandingpageLcard from "../components/LandingpageLcard";
import LandingpageBLcard from "../components/LandingpageBLcard";
import Navbar from "../components/layout/Navbar";
import { Link } from "react-router-dom";

function LandingPage(){

  return (
    <>
    <Navbar/>
    <hr className="border-t border-gray-300"/>
    <div className="w-full min-h-screen bg-gray  text-center pt-20 font-sans">
      <div className="flex justify-center w-full">
        <div className="w-fit border border-blue-500 bg-blue-100 text-blue-800 text-sm px-4 py-2 rounded-full mb-10">
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
        <Link to="/signup" className=" btn bg-black hover:bg-gray-800 text-white font-bold py-3 px-6 rounded-lg text-md shadow-md">
          Build my roadmap — free
        </Link>
        
        <button className="bg-white hover:bg-gray-100 text-black font-bold py-3 px-6 rounded-lg border border-gray-400 text-md shadow-sm">
          See a demo
        </button>
      </div>
      <div className="flex justify-center mt-10 mb-10 ">
      <LandingPageSCard upperValue="4 yrs" lowerValue="Planned on Day 1"/>
      <LandingPageSCard upperValue="AI" lowerValue="Adapts as you grow"/>
      <LandingPageSCard upperValue="1 place" lowerValue="Your whole journey"/>

      </div>
      <p id="features" className="text-gray-700 text-lg max-w-2xl mx-auto m-5 px-4">what you get</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mx-50 mt-5">
      <LandingpageLcard uppertext="AI onboarding oracle" lowertext="10 minutes. Stride learns your goals and generates your entire 4-year roadmap instantly."/>
      <LandingpageLcard uppertext="Living roadmap" lowertext="Your plan adapts every semester as your skills grow and your goals evolve."/>
      <LandingpageLcard uppertext="Evidence vault" lowertext="Log every project, internship, and win. AI turns it into your career story at graduation."/>
      <LandingpageLcard uppertext="Weekly AI check-in" lowertext="Every Sunday, your AI reviews your week and recalibrates next week's priorities."/>
      </div>
      <p id="how-it-works"  className="text-gray-700 text-lg max-w-2xl mx-auto m-5 px-4">How it works</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mx-50 mt-5">
        <LandingpageBLcard 
        icon = "1"
        uppertext="Tell us your goals" 
        lowertext="Answer 5 questions about your branch, dream outcome, and skill level."/>
        <LandingpageBLcard 
        icon = "2"
        uppertext="Get your roadmap" 
        lowertext="AI generates a semester-by-semester plan with milestones tailored to you."/>
        <LandingpageBLcard 
        icon="3"
        uppertext="Check in weekly" 
        lowertext="Mark milestones done. AI adjusts the plan and keeps you on track."/>
        <LandingpageBLcard 
        icon="4"
        uppertext="Graduate ready" 
        lowertext="Your vault becomes a portfolio. AI writes your career narrative automatically."/>
      </div>
      <div className="border border-blue-400 bg-blue-200 p-5 mx-50 mt-10 mb-10 rounded-lg">
        <h2 className="text-black text-2xl m-5">Start your roadmap today</h2>
        <p className="mb-2">Free for students. No credit card. No fluff.</p>
        <Link to="/signup" className=" btn text-black border border-black rounded-md font-bold p-2 mt-3">Create my account</Link>
      </div>
    </div>
    <hr className="border-t border-gray-300"/>
    <div className="flex justify-evenly p-3">
      <div className=" font tracking-tight text-gray-900 ">
        task<span className="text-blue-800">pulse</span>
      </div>
      <p>Built for college students</p>
      <p>Privacy · Terms</p>
    </div>
    </>
  );
}

export default LandingPage;