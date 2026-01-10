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

let notes = [];

function addNote() {
  const noteInput = document.getElementById("noteInput");
  const note = noteInput.value.trim();
  if (!note) return alert("Please type something!");
  
  notes.push(note);
  noteInput.value = "";
  renderNotes();
  
  celebrate(); //  Add this here for fun confetti
}


function renderNotes() {
  const list = document.getElementById("notesList");
  list.innerHTML = "";
  notes.forEach((n, i) => {
    const div = document.createElement("div");
    div.innerHTML = `
      ${i + 1}. ${n} <button onclick="deleteNote(${i})">❌</button>
    `;
    div.style.marginBottom = "8px";
    list.appendChild(div);
  });
}

function deleteNote(index) {
  notes.splice(index, 1);
  renderNotes();
}
