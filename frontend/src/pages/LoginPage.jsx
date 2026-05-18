import LandingPageCard from "../components/LandingpageScard";
import ReviewCard from "../components/ReviewCard";
function LoginPage(){
    return(
        <>
         <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen ">
             <div className="bg-[#241E56] text-white  p-15">
          <div className="text-3xl font-bold tracking-tight text-left text-gray-900 select-none">
        task<span className="text-blue-800">pulse</span>
      </div>
      <h1 className="text-4xl text-left font-sans mt-10 mb-5">Welcome back. Your roadmap is waiting.</h1>
      <p className="mb-15">Pick up exactly where you left off. Your milestones, your evidence, your progress — all here.</p>
      <ReviewCard upperValue='— " Checked in every Sunday for 6 months. My weekly review said I was 80% placement-ready. Got 3 offers in placement season."'
      lowerValue="Priya M. · CSE, VIT Bhopal · Placed at Razorpay"/>
      {/* <LandingPageCard upperValue="4 yrs" lowerValue="Planned on Day 1"></LandingPageCard>  */}
  </div>

  <div className="bg-white text-gray-900  p-15">
      <button className="border-gray-600 border shadow-sm p-1 px-3 rounded-md mr-5">Register</button>
      <button className="border-gray-600 border shadow-sm p-1 px-3 rounded-md ">log in</button>
      <h1 className="text-3xl text-left font-sans mt-10 mb-2">Log in to TaskPulse</h1>
      <p>Continue building your story.</p>
      <label htmlFor="emailInput" className="flex text-bold mt-8 mb-2">Email address</label>
      <input className="p-2 px-3 rounded-md border border-gray-600" type="email" id="emailInput" placeholder="priya123@college.edu.in"/>
    
      <label htmlFor="passInput" className="flex text-bold mt-8 mb-2">Password</label>
      <input className="p-2 px-3 rounded-md border border-gray-600" type="password" id="passInput" placeholder=" Your Password "/>
      <p>forgot password ?</p>
    
  </div>
</div>
        </>
    );
}

export default LoginPage;