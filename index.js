const yargs = require('yargs');
const {
  addNote,
  printNotes,
  removeNotes,
  editNotes,
} = require('./notes.controller');

yargs.command({
  command: 'add',
  describe: 'Add new note to list',
  builder: {
    title: {
      type: 'string',
      describe: 'Note tittle',
      demandOption: true,
    },
  },
  handler({ title }) {
    addNote(title);
  },
});

yargs.command({
  command: 'list',
  describe: 'Print all note',
  async handler() {
    printNotes();
  },
});

yargs.command({
  command: 'remove',
  describe: 'Remove note by id',

  builder: {
    id: {
      type: 'string',
      describe: 'Note id',
      demandOption: true,
    },
  },

  async handler({ id }) {
    removeNotes(id);
  },
});

yargs.command({
  command: 'edit',
  describe: 'Edit note by id',

  builder: {
    id: {
      type: 'string',
      describe: 'Note id',
      demandOption: true,
    },
    title: {
      type: 'string',
      describe: 'Note tittle',
      demandOption: true,
    },
  },

  async handler({ id, title }) {
    editNotes(id, title);
  },
});

yargs.parse();
