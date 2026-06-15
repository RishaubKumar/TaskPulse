# TaskPulse

> I studied hard. I participated in competitions. I attended events, took courses, built things. And then one day in my final year I sat down and realised - almost none of it was adding up to anything. No clear portfolio. No internship at the right time. No idea if I was placement-ready or not. I had worked hard for 3 years and still felt completely unprepared. As I was putting continuous efforts I have so many things (certificates, Internships , hackathons, opensource ) , just I have to arrange them properly ,

That was me. And when I looked around, it was everyone - my batchmates grinding without direction, my seniors regretting how they spent their first two years, my juniors making the exact same mistakes we did.

The problem was never effort. We were all working hard. The problem was we were **directionless**. Nobody told us when to do an internship, which certifications actually matter, how to balance classes with competitions with personal projects, or how to make sure that by graduation day we'd have something real to show. We were busy every single day and somehow still ended up unprepared.

I built TaskPulse because I wished something like this had existed on my Day 1 of college.

---

## What it does

Takes a student on their first day of college, understands their goals, and builds a personalised 4-year roadmap — semester by semester, milestone by milestone — so that by graduation they are job-ready, not just degree-ready.

- **AI onboarding** — answer 5 questions, Gemini AI builds your complete 4-year roadmap instantly
- **Living roadmap** — check off milestones as you grow, the plan adapts with you every semester
- **Evidence vault** — every project, internship, certificate, and win logged in one place — AI turns it into your career story
- **Weekly AI check-in** — every Sunday, AI reviews your week and tells you exactly what to focus on next
- **Placement prep** — resume reviewer, mock interview, job tracker *(Stage 2)*

---

## Tech stack

**Frontend** — React + Vite, React Router  
**Backend** — Node.js, Express, MongoDB, Mongoose  
**AI** — Gemini API (roadmap generation, weekly reviews, career narrative) , langchain is used for chaining purpose.  
**Auth** — JWT + bcrypt  
**Deployment** — Vercel (client , server), MongoDB Atlas

---

## Project structure

```
taskpulse/
├── client/                 # React + Vite
│   └── src/
│       ├── pages/          # One file per route
│       ├── components/     # Reusable UI pieces
│       ├── hooks/          # Custom React hooks
│       ├── api/            # Axios instance + API calls
│       ├── store/         
│       └── utils/
└── server/                 # Node + Express
    └── src/
        ├── routes/
        ├── controllers/
        ├── models/         # User, Roadmap
        ├── middleware/     # Auth, error handling
        ├── ai/             # Gemini prompts + chains
        └── config/         # DB connection, env validation
```

---

## Getting started

```bash
# Clone the repo
git clone https://github.com/RishaubKumar/TaskPulse
cd taskpulse

# Install dependencies
cd frontend && npm install
cd ../backend && npm install

# Set up environment variables

# client/.env
VITE_API_URL=http://localhost:5173

# server/.env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key

# Run both
cd frontend && npm run dev
cd backend && node app.js
```

---

## Build stages

- [x] Stage 1 — Auth, AI onboarding wizard, roadmap generation, dashboard
- [ ] Stage 2 — Evidence vault, weekly AI review, email check-ins
- [ ] Stage 3 — Resume AI, mock interview, job tracker, Pro tier
- [ ] Stage 4 — College admin portal, leaderboards, analytics
- [ ] Stage 5 — React Native mobile app

---

## License

MIT — free to use, fork, and build on.

---

*Built by a student who learned the hard way. For every student who still has time.*