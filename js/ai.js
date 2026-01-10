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
