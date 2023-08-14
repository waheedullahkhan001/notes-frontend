
var saveButton, cancelBUtton;
var editButton, deleteButton;
var notesList, noteView;
var noteTitle, noteTextArea;

function onBodyLoad() {
    saveButton = document.getElementById("save-btn");
    cancelBUtton = document.getElementById("cancel-btn");
    editButton = document.getElementById("edit-btn");
    deleteButton = document.getElementById("delete-btn");
    notesList = document.getElementById("notes-list");
    noteView = document.getElementById("note-view");
    noteTitle = document.getElementById("note-title");
    noteTextArea = document.getElementById("note-textarea");
    createNote();
}


function getStyle(id, name) {
    var element = document.getElementById(id);
    return element.currentStyle ? element.currentStyle[name] : window.getComputedStyle ? window.getComputedStyle(element, null).getPropertyValue(name) : null;
}


function toggleNotesList() {
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
    if (!noteTitle.classList.contains("border")) {
        noteTitle.classList.add("border");
    }

    noteTitle.removeAttribute("readonly");
    noteTextArea.removeAttribute("readonly");
    
    noteTitle.focus();
}


function createNote() {
    editNote();
    
    noteTitle.value = "";
    noteTextArea.value = "";
}
