function celebrate() {
  const confettiDiv = document.createElement('div');
  confettiDiv.innerText = "🎉";
  confettiDiv.style.position = 'absolute';
  confettiDiv.style.top = `${Math.random() * 80 + 10}%`;
  confettiDiv.style.left = `${Math.random() * 80 + 10}%`;
  confettiDiv.style.fontSize = '24px';
  document.body.appendChild(confettiDiv);
  setTimeout(() => confettiDiv.remove(), 1000);
}

let reminders = [];

function updateClock() {
  const now = new Date();
  document.getElementById("clock").innerText = now.toLocaleTimeString();
}
setInterval(updateClock, 1000);
updateClock();

function addReminder() {
  const r = document.getElementById("reminderInput").value.trim();
  if (!r) return alert("Please type a reminder!");
  
  reminders.push({ text: r, time: new Date() });
  document.getElementById("reminderInput").value = "";
  renderReminders();
  
  celebrate(); // 🎉 Add confetti here too
}

function renderReminders() {
  const list = document.getElementById("reminderList");
  list.innerHTML = "";
  reminders.forEach((r, i) => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `
      <div>${i + 1}. ${r.text}</div>
      <button onclick="deleteReminder(${i})" style="margin-top:6px;background:#ef4444;">Delete</button>
    `;
    list.appendChild(div);
  });
}

function deleteReminder(index) {
  reminders.splice(index, 1);
  renderReminders();
}
