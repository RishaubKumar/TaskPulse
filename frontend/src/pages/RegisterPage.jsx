function SignupPage() {
  return (
    <>
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">

        <div className="bg-[#26215C] p-10 flex flex-col text-white">

          <div className="text-xl font-semibold mb-8">
            task<span className="text-[#7F77DD]">pulse</span>
          </div>

          <div className="flex-1">
            <p className="text-sm text-[#AFA9EC] mb-6">
              What happens after you register
            </p>

            <div className="space-y-6">

              <div className="flex gap-3">
                <div className="w-7 h-7 rounded-full bg-[#1D9E75] flex items-center justify-center text-sm">
                  ✓
                </div>
                <div>
                  <h4 className="text-sm font-medium">
                    Create your account
                  </h4>
                  <p className="text-xs text-[#AFA9EC]">
                    30 seconds. Free forever, no credit card.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-7 h-7 rounded-full bg-[#534AB7] flex items-center justify-center text-sm">
                  2
                </div>
                <div>
                  <h4 className="text-sm font-medium">
                    AI onboarding — 5 questions
                  </h4>
                  <p className="text-xs text-[#AFA9EC]">
                    Tell us your goal, branch, and skill level.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-7 h-7 rounded-full bg-white/20 text-[#AFA9EC] flex items-center justify-center text-sm">
                  3
                </div>
                <div>
                  <h4 className="text-sm font-medium">
                    Get your 4-year roadmap
                  </h4>
                  <p className="text-xs text-[#AFA9EC]">
                    AI builds your personalised semester plan instantly.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-7 h-7 rounded-full bg-white/20 text-[#AFA9EC] flex items-center justify-center text-sm">
                  4
                </div>
                <div>
                  <h4 className="text-sm font-medium">
                    Check in every week
                  </h4>
                  <p className="text-xs text-[#AFA9EC]">
                    AI keeps you on track. Your story builds itself.
                  </p>
                </div>
              </div>

            </div>
          </div>

          <div className="border-t border-white/10 pt-5 mt-8 space-y-3 text-sm text-[#AFA9EC]">
            <div>Your data is private and never sold</div>
            <div>Mobile app coming soon — same account</div>
            <div>Free for all college students</div>
          </div>
        </div>

        <div className="p-8 overflow-y-auto bg-white">
          <div className="flex border rounded-lg overflow-hidden w-fit mb-6">
            <button className="px-5 py-2 bg-[#534AB7] text-white text-sm">
              Register
            </button>

            <button className="px-5 py-2 text-sm text-gray-500">
              Log in
            </button>
          </div>
          <h1 className="text-2xl font-semibold mb-1">
            Create your account
          </h1>

          <p className="text-sm text-gray-500 mb-6">
            Join and get your 4-year roadmap in under 5 minutes.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">

            <div>
              <label className="block text-xs font-medium uppercase mb-2">
                First name
              </label>

              <input
                type="text"
                placeholder="Rahul"
                className="w-full border rounded-lg px-4 py-3 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium uppercase mb-2">
                Last name
              </label>

              <input
                type="text"
                placeholder="Kumar"
                className="w-full border rounded-lg px-4 py-3 outline-none"
              />
            </div>

          </div>
          <div className="mb-4">
            <label className="block text-xs font-medium uppercase mb-2">
              Email address
            </label>

            <input
              type="email"
              placeholder="rahul@college.edu.in"
              className="w-full border rounded-lg px-4 py-3 outline-none"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">

            <div>
              <label className="block text-xs font-medium uppercase mb-2">
                College / university
              </label>

              <input
                type="text"
                placeholder="VIT Vellore"
                className="w-full border rounded-lg px-4 py-3 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium uppercase mb-2">
                Branch
              </label>

              <select className="w-full border rounded-lg px-4 py-3 outline-none">
                <option>Select branch</option>
                <option>Computer science / IT</option>
                <option>Electronics / ECE</option>
                <option>Mechanical / Civil</option>
                <option>Commerce / BBA / MBA</option>
                <option>Other</option>
              </select>
            </div>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">

            <div>
              <label className="block text-xs font-medium uppercase mb-2">
                Current year
              </label>

              <select className="w-full border rounded-lg px-4 py-3 outline-none">
                <option>Select year</option>
                <option>Year 1</option>
                <option>Year 2</option>
                <option>Year 3</option>
                <option>Year 4</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium uppercase mb-2">
                Graduation year
              </label>

              <select className="w-full border rounded-lg px-4 py-3 outline-none">
                <option>Select year</option>
                <option>2026</option>
                <option>2027</option>
                <option>2028</option>
                <option>2029</option>
              </select>
            </div>

          </div>

          <div className="mb-5">
            <label className="block text-xs font-medium uppercase mb-2">
              Password
            </label>

            <input
              type="password"
              placeholder="Min 8 characters"
              className="w-full border rounded-lg px-4 py-3 outline-none"
            />
          </div>

          <button className="w-full bg-[#534AB7] text-white rounded-lg py-3 font-medium hover:bg-[#4338a3] transition">
            Create account
          </button>

          <div className="flex items-center gap-3 my-5 text-sm text-gray-400">
            <div className="flex-1 h-px bg-gray-200"></div>
            or
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          <button className="w-full border rounded-lg py-3 flex items-center justify-center gap-3 hover:bg-gray-50 transition">
            Continue with Google
          </button>

          <div className="text-center text-sm text-gray-500 mt-5">
            Already have an account?
            <span className="text-[#534AB7] font-medium cursor-pointer ml-1">
              Log in
            </span>
          </div>

          {/* <div className="text-center text-xs text-gray-400 mt-4 leading-6">
            By registering you agree to our Terms of service and Privacy policy
          </div> */}

        </div>
      </div>
    </>
  );
}

export default SignupPage;