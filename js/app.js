function openTool(id) {
  document.querySelectorAll('.tool').forEach(t => t.style.display = "none");
  document.getElementById(id).style.display = "block";
}
openTool("chat");

// AI Chat
function chatAI() {
  const q = chatInput.value;
  chatOutput.innerText =
    "AI Insight:\n• Understand basics of " + q +
    "\n• Learn definitions\n• Practice questions";
}

// AI Notes
function generateAINotes() {
  const t = aiNotesInput.value;
  aiNotesOutput.innerHTML = `
  <ul>
    <li>${t} definition</li>
    <li>Key concepts</li>
    <li>Examples</li>
    <li>Exam tips</li>
  </ul>`;
}

// Quiz
function generateQuiz() {
  quizOutput.innerHTML =
    `<p>Q1: What is ${quizInput.value}?</p>
     <p>A) Option A</p><p>B) Option B</p>`;
}

// Notes
function saveNote() {
  notesList.innerHTML += `<p>• ${noteText.value}</p>`;
  noteText.value = "";
}

// Reminders
function addReminder() {
  reminderList.innerHTML +=
    `<p>⏰ ${reminderTime.value} - ${reminderText.value}</p>`;
}

// Timer
let time = 1500;
function startTimer() {
  setInterval(() => {
    if (time <= 0) return;
    time--;
    clock.innerText =
      Math.floor(time/60) + ":" + (time%60).toString().padStart(2,"0");
  }, 1000);
}
// smooth scroll to top when switching tools
function openTool(id) {
  document.querySelectorAll('.tool').forEach(t => t.style.display = "none");
  const el = document.getElementById(id);
  el.style.display = "block";
  el.scrollIntoView({ behavior: "smooth" });
}
async function askAI() {
  const question = document.getElementById("questionInput").value;

  const res = await fetch("http://localhost:3000/ask-ai", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question })
  });

  const data = await res.json();
  document.getElementById("aiAnswer").innerText = data.answer;
}




