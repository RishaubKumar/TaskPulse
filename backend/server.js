require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');

const { ChatGoogleGenerativeAI } = require("@langchain/google-genai");
const { HumanMessage, SystemMessage } = require("@langchain/core/messages");

const app = express();
const port = process.env.PORT || 3000;

const fs = require('fs');

// Middleware
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  const log = `${new Date().toISOString()} ${req.method} ${req.url}\n`;
  fs.appendFileSync('server.log', log);
  console.log(log.trim());
  next();
});

// API Routes defined before static files

// AI Configuration
const model = new ChatGoogleGenerativeAI({
  model: "gemini-pro",
  maxOutputTokens: 2048,
  apiKey: process.env.GOOGLE_API_KEY,
});

// Routes
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
