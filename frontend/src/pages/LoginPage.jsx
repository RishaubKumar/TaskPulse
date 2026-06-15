import { useState } from "react";
import LandingPageCard from "../components/LandingpageScard";
import ReviewCard from "../components/ReviewCard";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

function LoginPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

  const handleSubmit = (e) =>{
    e.preventDefault()
axios.post("http://localhost:5000/login", {
    email,
    password
})
.then(res => {
    if (res.data === "Success") {
        navigate("/dash");
    } else {
        alert(res.data);
    }
})
.catch(err => console.log(err));
  }

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen ">
                <div className="bg-blue-600 text-white  p-15">
                    <div className="text-3xl font-bold tracking-tight text-left text-gray-900 select-none">
                        task<span className="text-blue-800">pulse</span>
                    </div>
                    <h1 className="text-4xl text-left font-sans mt-10 mb-5">Welcome back. Your roadmap is waiting.</h1>
                    <p className="mb-15">Pick up exactly where you left off. Your milestones, your evidence, your progress — all here.</p>
                    <ReviewCard upperValue='— " Checked in every Sunday for 6 months. My weekly review said I was 80% placement-ready. Got 3 offers in placement season."'
                        lowerValue="Priya M. · CSE, VIT Bhopal · Placed at Razorpay" />
                    {/* <LandingPageCard upperValue="4 yrs" lowerValue="Planned on Day 1"></LandingPageCard>  */}
                </div>

                <div className="bg-white text-gray-900  p-15">
          <div className="flex border rounded-lg overflow-hidden w-fit mb-6">
            <Link to="/signup" className=" btn px-5 py-2 text-gray-500  text-sm">
              Register
            </Link>

            <Link to="/login" className=" btn px-5 py-2 bg-[#534AB7] text-white text-sm ">
              Log in
            </Link>
          </div>
                    <h1 className="text-3xl text-left font-sans mt-10 mb-2">Log in to TaskPulse</h1>
                    <p>Continue building your story.</p>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="emailInput" className="flex text-bold mt-5 mb-2">Email address</label>
                        <input
                            className="w-full border rounded-lg px-4 py-3 outline-none"
                            type="email"
                            id="emailInput"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="priya123@college.edu.in"
                        />

                        <label htmlFor="passInput" className="flex text-bold mt-8 mb-2">Password</label>
                        <input
                            className="w-full border rounded-lg px-4 py-3 outline-none"
                            type="password"
                            id="passInput"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder=" Your Password "
                        />
                        <p className="text-right">forgot password ?</p>
                        <button
                            type="submit"
                            className=" btn w-full border rounded-lg mt-5 py-3 flex items-center justify-center gap-3 hover:bg-gray-50 transition"
                        >
                            Log in
                        </button>
                    </form>
                    <div className="flex items-center gap-3 my-5 text-sm text-gray-400">
                        <div className="flex-1 h-px bg-gray-200"></div>
                        or
                        <div className="flex-1 h-px bg-gray-200"></div>
                    </div>
                    <button className="w-full border rounded-lg py-3 flex items-center justify-center gap-3 hover:bg-gray-50 transition">
                        Continue with Google
                    </button>

                </div>
            </div>
        </>
    );
}

export default LoginPage;