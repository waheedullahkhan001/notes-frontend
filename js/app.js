const base_url = "http://localhost:8080/api/v1";

var saveButton, cancelBUtton;
var editButton, deleteButton;
var notesList, noteView;
var noteTitle, noteTextArea;
var notes = [];
  
function setup() {
    saveButton = document.getElementById("save-btn");
    cancelBUtton = document.getElementById("cancel-btn");
    editButton = document.getElementById("edit-btn");
    deleteButton = document.getElementById("delete-btn");
    notesList = document.getElementById("notes-list");
    noteView = document.getElementById("note-view");
    noteTitle = document.getElementById("note-title");
    noteTextArea = document.getElementById("note-textarea");
    createNote();
    loadNotes();
}

function createNoteItem(id, title, text) {
    var li = document.createElement("li");
    li.classList.add("note-item");
    li.setAttribute("onclick", "selectNote(this)");
    li.setAttribute("id", "note-" + id);
    li.setAttribute("data-note-id", id);

    if (text.length > 10) {
        text = text.substring(0, 10) + "...";
    }

    li.innerHTML = `
        <svg class="note-icon" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M5 3m0 2a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2z"></path>
            <path d="M9 7l6 0"></path>
            <path d="M9 11l6 0"></path>
            <path d="M9 15l4 0"></path>
        </svg>
        <h4 class="left-padding">${title}</h4>
        <p class="left-padding">${text}</p>
        `;
        
    return li;
}

function unloadNotes() {
    var notes = document.getElementsByClassName("note-item");
    for (var i = 0; i < notes.length; i++) {
        notes[i].remove();
    }
}

function loadNotes() {
    unloadNotes();
    fetch(base_url + "/notes/all", {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token"), 
        }
    }).then(response => {
        if (response.status == 200) {
            response.json().then(data => {
                let notes = data.notes;
                for (var i = 0; i < notes.length; i++) {
                    notesList.appendChild(createNoteItem(notes[i].id, notes[i].title, notes[i].content));
                }
            })
        }
        else {
            response.json().then(data => {
                alert(data.message);
            })
        }
    });
}

function saveNote() {
    if (noteTitle.value.length == 0) {
        alert("Please enter a title for your note.");
        return;
    }


    var requestBody = {
        "title": noteTitle.value,
        "content": noteTextArea.value
    }

    fetch(base_url + "/notes/create", {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token"), 
            "Content-type": "application/json"
        }
    }).then(response => {
        if (response.status == 200) {
            alert("Note created successfully!");
            createNote();
            loadNotes()
        }
        else {
            response.json().then(data => {
                alert(data.message);
            })
        }
    });
}

function toggleNotesList() {
    // Good luck understanding this
    if (getStyle(notesList.id, "display") === "none") {
        if (notesList.classList.contains("hidden")) {
            notesList.classList.remove("hidden");
            notesList.style.display = "grid";
            return;
        }
        noteView.style.display = "none";
        notesList.style.display = "grid";
    }
    else if (getStyle(notesList.id, "display") === "grid") {
        if (getStyle(noteView.id, "display") === "none") {
            notesList.style.display = "none";
            noteView.style.display = "grid";
            return;
        }
        notesList.classList.add("hidden");
        notesList.style.display = "none";
    }
}


function editNote() {
    // Changes in main view
    if (!noteTitle.classList.contains("border")) {
        noteTitle.classList.add("border");
    }
    noteTitle.removeAttribute("readonly");
    noteTextArea.removeAttribute("readonly");

    // Changes in buttons
    editButton.setAttribute("hidden", "hidden");
    deleteButton.setAttribute("hidden", "hidden");
    saveButton.removeAttribute("hidden");
    cancelBUtton.removeAttribute("hidden");
    
    noteTitle.focus();
}


function createNote() {
    editNote();

    // Changes in notes list
    var elements = document.getElementsByClassName("note-item");
    for (var i = 0; i < elements.length; i++) {
        elements[i].classList.remove("selected-note");
    }

    // Prepare inputs
    noteTitle.value = "";
    noteTextArea.value = "";
}


function selectNote(element) {
    if (!element.classList.contains("selected-note")) {
        selectNoteWithoutCheck(element);
    }
}

function selectNoteWithoutCheck(element) {
    // Changes in notes list
    var elements = document.getElementsByClassName("note-item");
    for (var i = 0; i < elements.length; i++) {
        elements[i].classList.remove("selected-note");
    }
    element.classList.add("selected-note");

    // Changes in main view
    if (noteTitle.classList.contains("border")) {
        noteTitle.classList.remove("border");
    }
    noteTitle.setAttribute("readonly", "readonly");
    noteTextArea.setAttribute("readonly", "readonly");

    // Changes the buttons
    editButton.removeAttribute("hidden");
    deleteButton.removeAttribute("hidden");
    saveButton.setAttribute("hidden", "hidden");
    cancelBUtton.setAttribute("hidden", "hidden");

    // TODO: Fill data
}

function cancel() {
    var elements = document.getElementsByClassName("selected-note");
    if (elements.length > 0) {
        selectNoteWithoutCheck(elements[0]);
    }
    else {
        createNote();
    }
}

function logout() {
    localStorage.removeItem("token");
    window.location.href = "auth.html";
}

function getStyle(id, name) {
    var element = document.getElementById(id);
    return element.currentStyle ? element.currentStyle[name] : window.getComputedStyle ? window.getComputedStyle(element, null).getPropertyValue(name) : null;
}