const chalk = require('chalk');
const Note = require('./models/Notes');

async function addNote(title, owner) {
  await Note.create({ title, owner });
  console.log(chalk.green.inverse('Note was added!'));
}

async function getNotes() {
  const notes = await Note.find();
  return notes;
}

async function removeNotes(id, owner) {
  const result = await Note.deleteOne({ _id: id, owner });

  if (result.matchedCount === 0) {
    throw new Error('No note delete');
  }

  console.log(chalk.blue(`Deleted Note by id=${id}`));
}

async function editNotes(data, owner) {
  const result = await Note.updateOne(
    { _id: data.id, owner },
    { title: data.title }
  );

  if (result.matchedCount === 0) {
    throw new Error('No note edit');
  }

  console.log(chalk.blue(`Edit Note by id=${data.id}`));
}

module.exports = {
  addNote,
  getNotes,
  removeNotes,
  editNotes,
};
