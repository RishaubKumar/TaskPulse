require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/User.model');
const { generateRoadmapData } = require('./ai/roadmapGenerator');

const { ChatGoogleGenerativeAI } = require("@langchain/google-genai");
const { HumanMessage, SystemMessage } = require("@langchain/core/messages");

const app = express();
const port = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Database connected"))
    .catch(err => console.error(err));

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  const log = `${new Date().toISOString()} ${req.method} ${req.url}`;
  console.log(log);
  next();
});

const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash",
  maxOutputTokens: 8192,
  apiKey: process.env.GOOGLE_API_KEY,
});

app.post('/api/register', async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.json(newUser);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body; 
    const user = await User.findOne({ email }); 
    if (!user) {
      return res.json("No such user found"); 
    }
    if (user.password === password) { 
      return res.json({ message: "Success", user }); 
    } else {
      return res.json("Incorrect Password");
    }
  } catch (err) {
    console.log(err);
    res.json("Something went wrong");
  }
});

app.post('/api/generate-roadmap', async (req, res) => {
  try {
    const { branch, goal, level, companies, currentYear, userId } = req.body;
    const roadmap = await generateRoadmapData({ branch, goal, level, companies, currentYear });
    if (userId && mongoose.Types.ObjectId.isValid(userId)) {
      await User.findByIdAndUpdate(userId, { roadmap });
    }
    res.json({ roadmap });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to generate roadmap" });
  }
});

app.put('/api/user/roadmap', async (req, res) => {
  try {
    const { userId, roadmap } = req.body;
    const updatedUser = await User.findByIdAndUpdate(userId, { roadmap }, { new: true });
    res.json({ message: "Success", user: updatedUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update roadmap" });
  }
});

app.put('/api/user/profile', async (req, res) => {
  try {
    const { userId, firstName, lastName, collegeName, branch, currentYear, gYear } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { firstName, lastName, collegeName, branch, currentYear, gYear },
      { new: true }
    );
    res.json({ message: "Success", user: updatedUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update profile" });
  }
});


app.get("/", (req, res) => {
  res.send("TaskPulse Backend is running. Access the frontend at http://localhost:5173");
});

app.get("/health", (req, res) => {
  res.json({ status: "ok", message: "Server is running" });
});

app.post("/api/suggest-todos", async (req, res) => {
  try {
    const { task } = req.body;

    if (!task) {
      return res.status(400).json({ error: "Task is required" });
    }

    if (!process.env.GOOGLE_API_KEY) {
      return res.status(500).json({ error: "API Key not configured on server" });
    }

    console.log(`Generating steps for: ${task}`);

    const prompt = [
      new SystemMessage(
        "You are a highly intelligent productivity assistant. " +
        "Your goal is to break down a main task into a concrete, actionable, and concise todo list. " +
        "Return ONLY a raw JSON array of strings, where each string is a step. " +
        "Do not include markdown formatting like ```json or ```. " +
        "Example response: [\"Step 1\", \"Step 2\", \"Step 3\"]"
      ),
      new HumanMessage(`Break down this task: "${task}"`),
    ];

    // Timeout promise
    const timeout = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Timeout")), 5000)
    );

    let content;
    try {
      const result = await Promise.race([model.invoke(prompt), timeout]);
      content = result.content;
    } catch (err) {
      console.log("AI request failed or timed out, using mock data.");
      content = JSON.stringify([
        `Analyze ${task}`,
        `Plan steps for ${task}`,
        `Execute ${task}`,
        "Review results (Offline Mode)"
      ]);
    }

    // Cleanup potential markdown formatting if the model disobeys
    content = content.replace(/```json/g, "").replace(/```/g, "").trim();

    try {
      const todoList = JSON.parse(content);
      res.json({ todos: todoList });
    } catch (parseError) {
      console.error("JSON Parse Error:", parseError, "Content:", content);
      // Fallback: split by newlines if JSON parsing fails
      const fallbackList = content.split("\n").filter(line => line.trim().length > 0).map(line => line.replace(/^- /, "").trim());
      res.json({ todos: fallbackList });
    }

  } catch (error) {
    console.error("AI Generation Error:", error);
    res.status(500).json({ error: "Failed to generate todo list", details: error.message });
  }
});

// Catch-all handler for any request that doesn't match the above
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
// });

app.use(express.static(path.join(__dirname, "../frontend/dist"))); // Serve compiled frontend

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
