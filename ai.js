const quotes = [
  "💡 Keep learning every day!",
  "🚀 Knowledge is your superpower!",
  "📚 Study now, shine later!",
  "✨ Even small questions can lead to big ideas!"
];

async function askAI() {
  const question = document.getElementById("questionInput").value;
  if(!question) return alert("Type a question!");
  const answerDiv = document.getElementById("aiAnswer");
  answerDiv.innerHTML = "<em>Thinking...</em>";

  try {
    const res = await fetch("http://localhost:3000/ask-ai", {
      method:"POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({question})
    });
    const data = await res.json();
    answerDiv.innerHTML = `<div class="card">${data.answer || "No answer."}</div>`;
    document.getElementById("quote").innerText = quotes[Math.floor(Math.random()*quotes.length)];
  } catch(err) {
    console.error(err);
    answerDiv.innerHTML = `<div class="card">Error contacting AI backend.</div>`;
  }
}

const chatArea = document.getElementById("chatArea");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");
const newChatBtn = document.getElementById("newChatBtn");

// ADD MESSAGE TO UI
function addMessage(sender, text) {
  const msg = document.createElement("div");
  msg.className = sender === "user" ? "user-msg" : "ai-msg";
  msg.innerText = text;
  chatArea.appendChild(msg);
  chatArea.scrollTop = chatArea.scrollHeight;
}

// SEND MESSAGE
sendBtn.addEventListener("click", () => {
  const text = userInput.value.trim();
  if (!text) return;

  addMessage("user", text);
  userInput.value = "";

  fetch("https://aurevia-7sxo.onrender.com/ask-ai", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question: text })
  })
  .then(res => res.json())
  .then(data => {
    addMessage("ai", data.reply);
  })
  .catch(() => {
    addMessage("ai", "⚠️ Aurevia is waking up...");
  });
});

// ENTER KEY SUPPORT
userInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") sendBtn.click();
});

// NEW CHAT
newChatBtn.addEventListener("click", () => {
  chatArea.innerHTML = "";
});
