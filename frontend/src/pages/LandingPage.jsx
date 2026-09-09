import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import LandingPageCard from '../components/LandingpageScard';
import LandingpageLcard from '../components/LandingpageLcard';
import LandingpageBLcard from '../components/LandingpageBLcard';
import { useAuth } from '../hooks/useAuth';

function LandingPage() {
  const { user } = useAuth();

  const handleScrollToHowItWorks = () => {
    const el = document.getElementById('how-it-works');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900">
      <Navbar />

      <main className="flex-1">
        <section className="max-w-4xl mx-auto px-4 pt-16 pb-12 text-center">
          <div className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full mb-6">
            AI-Powered 4-Year College Roadmap
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight mb-4">
            Graduate with something <span className="text-blue-600">meaningful</span> to show
          </h1>

          <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
            Most students reach final year with no portfolio, no internship, and no clarity.
            TaskPulse gives you a personalized semester-by-semester roadmap built by AI and shaped by your target goals.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            {user ? (
              <Link
                to="/dashboard"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-6 rounded text-sm transition shadow-sm"
              >
                Go to Dashboard
              </Link>
            ) : (
              <Link
                to="/signup"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-6 rounded text-sm transition shadow-sm"
              >
                Build my roadmap (free)
              </Link>
            )}

            <button
              onClick={handleScrollToHowItWorks}
              className="bg-white hover:bg-gray-100 text-gray-700 font-semibold py-2.5 px-6 rounded border border-gray-300 text-sm transition cursor-pointer"
            >
              See how it works
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto mt-12">
            <LandingPageCard upperValue="4 Years" lowerValue="Planned from Day 1" />
            <LandingPageCard upperValue="Gemini AI" lowerValue="Adapts as you grow" />
            <LandingPageCard upperValue="1 Place" lowerValue="Your whole career story" />
          </div>
        </section>

        <section id="features" className="max-w-5xl mx-auto px-4 py-12 border-t border-gray-200">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800">What You Get</h2>
            <p className="text-sm text-gray-600 mt-1">Built for student success from semester 1 to campus placements</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <LandingpageLcard
              uppertext="AI Onboarding"
              lowertext="Answer 5 simple questions. TaskPulse learns your goals and generates your personalized 4-year roadmap instantly."
            />
            <LandingpageLcard
              uppertext="Living Roadmap"
              lowertext="Your plan adapts every semester as your technical skills develop and milestones are completed."
            />
            <LandingpageLcard
              uppertext="Evidence Vault"
              lowertext="Log every project, internship certificate, and achievement in one place so your portfolio is ready at placement time."
            />
            <LandingpageLcard
              uppertext="Weekly AI Review"
              lowertext="Every week, AI reviews your progress, calculates your readiness score, and recalibrates upcoming priorities."
            />
          </div>
        </section>

        <section id="how-it-works" className="max-w-5xl mx-auto px-4 py-12 border-t border-gray-200">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800">How It Works</h2>
            <p className="text-sm text-gray-600 mt-1">Four simple steps from college start to job readiness</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <LandingpageBLcard
              icon="1"
              uppertext="Tell us your goals"
              lowertext="Share your branch, current year, dream companies, and current coding level."
            />
            <LandingpageBLcard
              icon="2"
              uppertext="Get your roadmap"
              lowertext="AI creates a structured 8-semester roadmap with clear technical, portfolio, and placement milestones."
            />
            <LandingpageBLcard
              icon="3"
              uppertext="Check in regularly"
              lowertext="Mark milestones as completed and upload evidence documents to verify your work."
            />
            <LandingpageBLcard
              icon="4"
              uppertext="Graduate placement-ready"
              lowertext="Your evidence vault transforms into a solid portfolio with an AI-reviewed resume ready for job drives."
            />
          </div>

          <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6 text-center max-w-xl mx-auto">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Ready to plan your degree?</h3>
            <p className="text-xs text-gray-600 mb-4">Free for engineering and college students. No credit card required.</p>
            {user ? (
              <Link
                to="/dashboard"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-5 rounded text-sm transition"
              >
                Go to Dashboard
              </Link>
            ) : (
              <Link
                to="/signup"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-5 rounded text-sm transition"
              >
                Get Started Free
              </Link>
            )}
          </div>
        </section>
      </main>

      <footer className="bg-white border-t border-gray-200 py-6 text-center text-xs text-gray-500">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-2">
          <span className="font-bold text-gray-800">
            task<span className="text-blue-600">pulse</span>
          </span>
          <p>Built for college students preparing for campus placements</p>
          <p>Final Year B.Tech CSE Project</p>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;