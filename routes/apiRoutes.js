const { Router } = require("express");
const fs = require("fs");
const path = require("path");
const router = require("express").Router()

let db = require("../db/db.json")

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

router.get("/notes", function(req, res) {
    return res.json(db);
});

router.post("/notes", (req, res) => {
    const allNotes = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
    const newNotes = {
        id: noteList[noteList.length - 1].id + 1,
        title: req.body.title,
        text: req.body.text,
    };

    console.log(newNotes);
    noteList.push(newNotes);
    fs.writeFileSync("./db/db.json", JSON.stringify(allNotes));

    return res.json(allNotes);
});

module.exports = router;