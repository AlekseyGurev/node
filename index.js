const yargs = require('yargs');
const { addNote, printNotes } = require('./notes.controller');

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

yargs.parse();
