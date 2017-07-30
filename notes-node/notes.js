const fs = require("fs");

const fetchNotes = () => {
  try {
    var notes = JSON.parse(fs.readFileSync("notes-data.json"));
    return notes;
  } catch (e) {
    return [];
  }
}

const saveNotes = (notes) => {
  fs.writeFileSync("notes-data.json", JSON.stringify(notes));
}

const addNote = (title, body) => {
  var notes = fetchNotes();
  const duplicateNotes = notes.filter(note => note.title === title);

  if (duplicateNotes.length) {
    return;
  }

  const note = {
    title,
    body
  }
  notes.push(note);
  saveNotes(notes);
  return note;
}

const getAll = () => {
  var notes = fetchNotes();
  return notes;
}

const getNote = (title) => {
  var notes = fetchNotes();
  var filteredNotes = notes.filter(note => note.title === title);
  return filteredNotes[0];
}

const removeNote = (title) => {
  var notes = fetchNotes();
  var filteredNotes = notes.filter(note => note.title !== title);
  saveNotes(filteredNotes);
  return notes.length !== filteredNotes.length;
}

const logNote = (note) => {
  console.log("---");
  console.log(`Title: ${note.title}`);
  console.log(`Body: ${note.body}`);
}

module.exports = {
  addNote,
  getAll,
  getNote,
  removeNote,
  logNote
}
