const fs = require('fs/promises');
const path = require('path');
const chalk = require('chalk');

const notesPath = path.join(__dirname, 'db.json');

async function addNote(title) {
  const notes = await getNotes();

  const note = {
    title,
    id: Date.now().toString(),
  };

  notes.push(note);

  await fs.writeFile(notesPath, JSON.stringify(notes));
  console.log(chalk.green.inverse('Note was added!'));
}

async function getNotes() {
  const notes = await fs.readFile(notesPath, { encoding: 'utf-8' });
  return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
}

async function removeNotes(id) {
  const notes = await getNotes();
  const filterNotes = notes.filter((note) => {
    return note.id != id;
  });

  await fs.writeFile(notesPath, JSON.stringify(filterNotes));
  console.log(chalk.blue(`Deleted Note by id=${id}`));
}

async function editNotes(data) {
  const notes = await getNotes();
  const editNotes = notes.map((note) => {
    if (note.id === data.id) {
      note.title = data.title;
    }
    return note;
  });
  await fs.writeFile(notesPath, JSON.stringify(editNotes));
  console.log(chalk.blue(`Edit Note by id=${data.id}`));
}

module.exports = {
  addNote,
  getNotes,
  removeNotes,
  editNotes,
};
