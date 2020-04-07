const express = require("express");
const path = require("path");
const fs = require("fs");
const db = require("./db/db");
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

app.get("/api/notes", async function (req, res) {
  return res.json(await db.getNote());
});

app.post("/api/notes", async function (req, res) {
  await db.addNote(req.body);
  res.send("new note");
});

app.delete("/api/notes/:id", async function (req, res) {
  const { id } = req.params;
  await db.deleteNote(id);
  res.send("Destroyed Note");
});

app.get("/notes", function (req, res) {
  res.sendFile(__dirname + "/public/notes.html");
});

app.get("*", function (req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

app.listen(PORT, () =>
  console.log(`App listening on http://localhost:${PORT}`)
);
