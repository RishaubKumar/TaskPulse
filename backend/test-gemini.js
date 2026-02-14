require('dotenv').config();
const { ChatGoogleGenerativeAI } = require("@langchain/google-genai");
const { HumanMessage } = require("@langchain/core/messages");

async function testGemini() {
    console.log("Initializing Gemini...");
    try {
        const model = new ChatGoogleGenerativeAI({
            model: "gemini-pro",
            maxOutputTokens: 2048,
            apiKey: process.env.GOOGLE_API_KEY,
        });

        console.log("Invoking model...");
        const response = await model.invoke([
            new HumanMessage("Hello, tell me a joke."),
        ]);
        console.log("Response:", response.content);
    } catch (error) {
        console.error("Error invoking model:", error);
    }
}

testGemini();
