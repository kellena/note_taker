const fs = require("fs");
const router = require("express").Router()

let db = require("../db/db.json")

router.get("/notes", function(req, res) {
    return res.json(db);
});

router.post("/notes", (req, res) => {
    const allNotes = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
    const newNotes = {
        id: allNotes[allNotes.length - 1].id + 1,
        title: req.body.title,
        text: req.body.text,
    };

    console.log(newNotes);
    allNotes.push(newNotes);
    fs.writeFileSync("./db/db.json", JSON.stringify(allNotes));

    return res.json(allNotes);
});

router.delete('/api/notes/:id', (req, res) => {
    console.log(req.params)
    const noteId = parseInt(req.params.id)
    const allNotes = JSON.parse(fs.readFileSync("./db/db.json"));
    const newArray = allNotes.filter(note => note.id !== noteId);

    fs.writeFileSync("./db/db.json", JSON.stringify(newArray));
    res.json(newArray);
});


module.exports = router;