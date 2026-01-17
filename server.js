// =====================
// IMPORTS
// =====================
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const fetch = require("node-fetch");

// =====================
// ENV SETUP
// =====================
dotenv.config({ path: "./.env" });

console.log(
  "ENV KEY LOADED:",
  process.env.OPENAI_API_KEY ? "YES" : "NO"
);

if (!process.env.OPENAI_API_KEY) {
  console.error("❌ OPENAI_API_KEY NOT FOUND. Check .env file");
}

// =====================
// APP SETUP
// =====================
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// =====================
// HEALTH CHECK
// =====================
app.get("/", (req, res) => {
  res.send("AI backend is running ✅");
});

// =====================
// AI ROUTE
// =====================
app.post("/ask-ai", async (req, res) => {
  console.log("\n📩 /ask-ai called");
  console.log("BODY:", req.body);

  const question = req.body.question;

  if (!question) {
    return res.status(400).json({ answer: "No question provided." });
  }

  try {
    console.log("🚀 Sending request to Aurevia...");

    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            { role: "system", content: "You are a helpful study assistant." },
            { role: "user", content: question }
          ]
        })
      }
    );

    console.log("📡 OpenAI status:", response.status);

    const data = await response.json();
    console.log("📦 OpenAI response:", data);

    if (data.error) {
      console.error("❌ OpenAI Error:", data.error.message);
      return res.status(500).json({ answer: data.error.message });
    }

    if (!data.choices || !data.choices.length) {
      return res.status(500).json({ answer: "No response from AI." });
    }

    res.json({
      answer: data.choices[0].message.content
    });

  } catch (err) {
    console.error("🔥 SERVER CRASH:", err);
    res.status(500).json({ answer: "AI backend crashed" });
  }
});

// =====================
// START SERVER
// =====================
app.listen(PORT, "0.0.0.0", () => {
  console.log(`AI Server running on port ${PORT}`);
});


