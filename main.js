function getStyle(id, name) {
    var element = document.getElementById(id);
    return element.currentStyle ? element.currentStyle[name] : window.getComputedStyle ? window.getComputedStyle(element, null).getPropertyValue(name) : null;
}


function toggleNotesList() {
    let notesList = document.getElementById("notes-list");
    let noteView = document.getElementById("note-view");
    
    
    if (getStyle("notes-list", "display") === "none") {
        if (notesList.classList.contains("hidden")) {
            notesList.classList.remove("hidden");
            notesList.style.display = "grid";
            return;
        }
        noteView.style.display = "none";
        notesList.style.display = "grid";
    }
    else if (getStyle("notes-list", "display") === "grid") {
        if (getStyle("note-view", "display") === "none") {
            notesList.style.display = "none";
            noteView.style.display = "grid";
            return;
        }
        notesList.classList.add("hidden");
        notesList.style.display = "none";
    }
}
