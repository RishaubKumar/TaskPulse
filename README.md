# TaskPulse

> I studied hard. I participated in competitions. I attended events, took courses, built things. And then one day in my final year I sat down and realised - almost none of it was adding up to anything. No clear portfolio. No internship at the right time. No idea if I was placement-ready or not. I had worked hard for 3 years and still felt completely unprepared. As I was putting continuous efforts I have so many things (certificates, Internships , hackathons, opensource ) , just I have to arrange them properly ,

That was me. And when I looked around, it was everyone - my batchmates grinding without direction, my seniors regretting how they spent their first two years, my juniors making the exact same mistakes we did.

The problem was never effort. We were all working hard. The problem was we were **directionless**. Nobody told us when to do an internship, which certifications actually matter, how to balance classes with competitions with personal projects, or how to make sure that by graduation day we'd have something real to show. We were busy every single day and somehow still ended up unprepared.

I built TaskPulse because I wished something like this had existed on my Day 1 of college.

---

## What It Does

TaskPulse takes an engineering student from their first year, understands their target branch and career aspirations, and builds a structured, personalized 4-year roadmap (semester by semester, milestone by milestone). It turns daily academic efforts into verified proof of work so students graduate placement-ready.

- **AI Onboarding Wizard**: A 5-step guided intake that captures your branch, coding background, target companies (FAANG, high-growth startups, service companies), and career ambition, then uses Gemini 3.5 Flash Lite to build a personalized 8-semester roadmap.
- **Living Semester Roadmap**: An interactive 8-semester milestone tracker where students can check off completed tasks, track pending goals, and add their own custom tasks for any semester.
- **Student Dashboard**: Real-time overview of semester progress, domain completion bars (Technical Skills, Portfolio Building, Placement Readiness), and overall degree completion percentage.
- **Upcoming Academic Deadlines & Opportunities**: An interactive tracker on the dashboard for hackathons, internship windows, and college exams. Students can view, add, edit, and delete deadlines directly from the interface.
- **Evidence Vault**: A dedicated vault to log proof of work (GitHub repositories, live demos, certificates, competition wins) linked to specific semester milestones.
- **Weekly AI Check-in**: Generates a weekly progress review analyzing completed vs. pending tasks, providing a placement readiness score and top 3 priorities for the upcoming week.
- **AI Resume Reviewer**: Evaluates technical resumes or project descriptions against industry standards and gives placement score, strengths, and quantifiable improvement points.
- **Campus Mock Interview Prep**: Practice technical and HR questions across Data Structures & Algorithms, Core CS (OS, DBMS, CN), Full Stack Development, and Behavioral rounds.

---

## Tech Stack

- **Frontend**: React 18, Vite, React Router v7, Tailwind CSS, Axios, Lucide React
- **Backend**: Node.js, Express 5, MongoDB, Mongoose
- **AI Integration**: Google Gemini (gemini-3.5-flash-lite) via @langchain/google-genai and @google/genai
- **Authentication**: JSON Web Tokens (JWT) with secure bcryptjs password hashing
- **Development Tools**: ESLint, Postman / Fetch, Git

---

## Project Structure

```
TaskPulse/
├── frontend/
│   ├── public/
│   └── src/
│       ├── components/
│       │   ├── common/
│       │   ├── layout/
│       │   └── onboarding/
│       ├── context/
│       ├── hooks/
│       ├── pages/
│       ├── App.jsx
│       ├── index.css
│       └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
└── backend/
    ├── src/
    │   ├── ai/
    │   ├── config/
    │   ├── controllers/
    │   ├── middleware/
    │   ├── models/
    │   ├── routes/
    │   └── server.js
    ├── package.json
    └── .env
```

---

## Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- MongoDB running locally on port 27017 (or a MongoDB Atlas connection URI)
- Google Gemini API Key

### 1. Clone the Repository
```bash
git clone https://github.com/RishaubKumar/TaskPulse.git
cd TaskPulse
```

### 2. Configure Backend Environment
Create a `.env` file in the `backend` folder:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/taskpulse
JWT_SECRET=taskpulse_btech_secret_key_2026
GOOGLE_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-3.5-flash-lite
```

### 3. Install Dependencies
```bash
cd backend
npm install

cd ../frontend
npm install
```

### 4. Run the Application
Open two separate terminal windows:

Terminal 1 (Backend):
```bash
cd backend
npm start
```

Terminal 2 (Frontend):
```bash
cd frontend
npm run dev
```

- Open http://localhost:5173 in your browser.
- The frontend development server automatically proxies `/api` requests to the backend at http://localhost:5000.

---

## API Overview

### Authentication (`/api/auth`)
- `POST /api/auth/register` - Register new student with hashed password
- `POST /api/auth/login` - Authenticate and receive JWT token
- `GET /api/auth/me` - Validate current session and get student profile

### Student Roadmap & Tools (`/api/user`)
- `GET /api/user/profile` - Fetch student profile and stats
- `PUT /api/user/profile` - Update student profile (college, branch, graduation year)
- `PUT /api/user/roadmap` - Toggle or update semester milestones
- `POST /api/user/roadmap/generate` - Generate 8-semester roadmap via Gemini AI
- `GET /api/user/deadlines` - Retrieve academic deadlines and opportunities
- `POST /api/user/deadlines` - Add a new academic deadline
- `PUT /api/user/deadlines/:id` - Edit an existing deadline
- `DELETE /api/user/deadlines/:id` - Delete an academic deadline
- `GET /api/user/evidence` - Fetch all Evidence Vault submissions
- `POST /api/user/evidence` - Submit new proof of work item
- `DELETE /api/user/evidence/:id` - Remove an item from Evidence Vault
- `GET /api/user/review` - Fetch past weekly AI reviews
- `POST /api/user/review/generate` - Generate new weekly AI progress review
- `POST /api/user/resume-review` - Analyze resume text with Gemini AI

---

## Project Status

- [x] Secure authentication with JWT and bcryptjs
- [x] 5-step onboarding wizard with branch, college, and aspiration intake
- [x] Gemini 3.5 Flash Lite roadmap generation with fallback reliability
- [x] 8-semester interactive roadmap with custom task addition
- [x] Evidence Vault with project link verification
- [x] Weekly AI check-ins with readiness scoring and priority suggestions
- [x] Campus placement preparation (Resume AI reviewer and Mock interview practice)
- [x] Upcoming Academic Deadlines & Opportunities full CRUD (Add, Edit, Delete, Show)
- [x] Responsive layout with unified sidebar and student-friendly UI

---

## License

MIT License. Free to use, modify, and learn from.

---

*Built by a student who learned the hard way. For every student who still has time.*