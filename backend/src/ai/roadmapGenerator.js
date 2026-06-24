const { ChatGoogleGenerativeAI } = require("@langchain/google-genai");
const { HumanMessage, SystemMessage } = require("@langchain/core/messages");

async function generateRoadmapData({ branch, goal, level, companies, currentYear }) {
  try {
    const model = new ChatGoogleGenerativeAI({
      model: "gemini-2.5-flash",
      maxOutputTokens: 8192,
      apiKey: process.env.GOOGLE_API_KEY,
    });

    const systemMessage = new SystemMessage(
      "You are a helpful academic and career advisor AI. " +
      "Generate a structured 4-year college roadmap divided by semesters (Semester 1 to Semester 8). " +
      "For each semester, suggest exactly 3 specific milestones/tasks relevant to the student's branch, goal, level, and target companies. " +
      "Keep milestone tasks extremely concise (under 8 words each). " +
      "Return ONLY a minified raw JSON array of semesters, without markdown formatting, backticks, or other text. " +
      "Example format: " +
      "[{\"semester\":1,\"milestones\":[{\"task\":\"Learn basic C++\",\"category\":\"Technical skills\",\"status\":\"pending\"},{\"task\":\"Create GitHub profile\",\"category\":\"Portfolio building\",\"status\":\"pending\"}]}]"
    );

    let companyList = "";
    if (companies) {
      companyList = companies.join(', ');
    }

    const humanMessage = new HumanMessage(
      `Branch: ${branch}, Goal: ${goal}, Level: ${level}, Dream Companies: ${companyList}, Current Year: ${currentYear}`
    );

    const response = await model.invoke([systemMessage, humanMessage]);
    let content = response.content.trim();
    content = content.replace(/```json/g, "").replace(/```/g, "").trim();
    return JSON.parse(content);
  } catch (err) {
    console.error("AI Generation failed, returning fallback roadmap", err);
    const fallback = [];
    for (let sem = 1; sem <= 8; sem++) {
      fallback.push({
        semester: sem,
        milestones: [
          { task: `Master Semester ${sem} core subjects`, category: "Technical skills", status: "pending" },
          { task: `Build a project for Semester ${sem}`, category: "Portfolio building", status: "pending" },
          { task: `Prepare for interviews & internships`, category: "Placement readiness", status: "pending" }
        ]
      });
    }
    return fallback;
  }
}

module.exports = { generateRoadmapData };
