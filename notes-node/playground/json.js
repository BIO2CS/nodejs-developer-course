const fs = require("fs");

const originalNote = {
  title: "Notes",
  body: "This is my NodeJS tutorial"
}

const originalNoteString = JSON.stringify(originalNote);
fs.writeFileSync("notes.json", originalNoteString);

const notesString = fs.readFileSync("notes.json");
const notes = JSON.parse(notesString);
console.log(typeof notes);
console.log(notes.title);
