document.addEventListener("DOMContentLoaded", function () {
  const addNoteBtn = document.getElementById("addNote");
  const titleInput = document.getElementById("title");
  const contentInput = document.getElementById("content");
  const colorInput = document.getElementById("color");
  const pinInput = document.getElementById("pin");
  const notesContainer = document.getElementById("notes");

  addNoteBtn.addEventListener("click", addNote);

  function addNote() {
    console.log("addNote");
    const title = titleInput.value.trim();
    const content = contentInput.value.trim();
    const color = colorInput.value;
    const pin = pinInput.checked;
    const date = new Date().toISOString();

    if (title && content) {
      const note = { title, content, color, pin, date };
      saveNoteToLocalStorage(note);
      renderNotes();
      clearForm();
    }
  }

  function saveNoteToLocalStorage(note) {
    const notes = getNotesFromLocalStorage();
    notes.push(note);
    localStorage.setItem("notes", JSON.stringify(notes));
  }

  function getNotesFromLocalStorage() {
    const notes = localStorage.getItem("notes");
    return notes ? JSON.parse(notes) : [];
  }

  function renderNotes() {
    const notes = getNotesFromLocalStorage();
    notesContainer.innerHTML = "";
    const pinnedNotes = notes.filter((note) => note.pin);
    const unpinnedNotes = notes.filter((note) => !note.pin);

    [...pinnedNotes, ...unpinnedNotes].forEach((note) => {
      const noteElement = document.createElement("div");
      noteElement.classList.add("note");
      noteElement.style.backgroundColor = note.color;
      noteElement.innerHTML = `
                <h2>${note.title}</h2>
                <p>${note.content}</p>
                <div class="note-footer">
                    <span class="date">${new Date(
                      note.date
                    ).toLocaleString()}</span>
                    <button onclick="deleteNote('${note.date}')">Usuń</button>
                </div>
            `;
      notesContainer.appendChild(noteElement);
    });
  }

  function clearForm() {
    titleInput.value = "";
    contentInput.value = "";
    colorInput.value = "#ffffff";
    pinInput.checked = false;
  }

  window.deleteNote = function (date) {
    const notes = getNotesFromLocalStorage();
    const updatedNotes = notes.filter((note) => note.date !== date);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
    renderNotes();
  };

  renderNotes();
});
