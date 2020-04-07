const fs = require("fs");
const util = require("util");
const uuid = require("uuid").v4;
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const db = {
  getNote: async function () {
    const newNote = await readFile("db/db.json", "utf8");
    return JSON.parse(newNote);
  },

  addNewNote: async function (newNote) {
    const db = await this.getNote();
    db.push({ id: uuid(), ...newNote });
    return writeFile("db/db.json", JSON.stringify(db, null, 2));
  },

  deleteNote: async function (id) {
    const db = await this.getNote();
    const newDB = db.filter((newNote) => newNote.id !== id);
    return writeFile("db/db.json", JSON.stringify(newDB, null, 2));
  },
};

module.exports = db;
