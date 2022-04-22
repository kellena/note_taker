const fs = require("fs");
const path = require("path");

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

module.exports = function(app) {
    app.get("/api/notes", function(req, res) {
        readFileAsync(path.join(__dirname + "/db/db.json"), "utf8") 
        .then(function(data){
            notes=[].concat(JSON.parse(data))
            return res.json(notes);
        })
    });

    app.post("/api/notes", (req, res) => {
        let newNotes = req.body;
        readFileAsync(path.join(__dirname + "/db/db.json"), "utf8") 
        .then(function (data) {
            notes = [].concat(JSON.parse(data));
            newNotes.id = notes.length + 1;
            notes.push(newNotes);
            return notes
        }).then(function(data){
        writeFileAsync(path.join(__dirname + "/db/db.json"), JSON.stringify(data))
            res.json(newNotes);
        })
    });
}