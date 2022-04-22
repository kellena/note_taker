const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const path = require('path');
const fs = require('fs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
})

app.get("/api/notes", function(req, res) {
    readFileAsync(path.join(__dirname + "/db/db.json"), "utf8") 
    .then(function(data){
        notes=[].concat(JSON.parse(data))
        return res.json(notes);
    })
});



require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));