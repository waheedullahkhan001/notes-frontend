
var saveButton, cancelBUtton;
var editButton, deleteButton;
var notesList, noteView;
var noteTitle, noteTextArea;

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

function getStyle(id, name) {
    var element = document.getElementById(id);
    return element.currentStyle ? element.currentStyle[name] : window.getComputedStyle ? window.getComputedStyle(element, null).getPropertyValue(name) : null;
}