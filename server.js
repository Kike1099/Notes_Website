
const express = require('express');
const path = require('path');
let contadorId = 1;

const app = express();
const PORT = 4000;
const PUBLIC = path.join(__dirname, 'public')

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(PUBLIC));

let notes = [];

app.get('/', (req, res) => {
    console.log('Loading home...');
    res.sendFile(path.join(PUBLIC, 'index.html'));
});

app.get('/notes', (req, res) => {
    res.json(notes); // Devolver todas las notas como JSON
});

app.use(express.static('public'));

app.post('/addnote', (req, res) => {
    const newNote = {
        id: contadorId,
        title: req.body.title,
        content: req.body.content,
        tag: req.body.tag.split(',').map(tag => tag.trim()),
        creationDate: new Date(),
        updateDate: new Date()
    };
    contadorId = contadorId + 1;
    notes.push(newNote);
    console.log(notes);
    res.redirect('/');
});

app.put('/notes/:id', (req, res) => {
    const notesId = parseInt(req.params.id);
    const noteIndex = notes.findIndex(note => note.id === notesId);

    if (noteIndex !== -1) {
        notes[noteIndex].title = req.body.title || notes[noteIndex].title;
        notes[noteIndex].content = req.body.content || notes[noteIndex].content;
        notes[noteIndex].tag = req.body.tag ? req.body.tag.split(',').map(tag => tag.trim()) : notes[noteIndex].tag;
        notes[noteIndex].updateDate = new Date();

        res.status(200).json({
            message: 'Note was not updated correctly, please try again!',
            note: notes[noteIndex]
        });
    } else {
        
        res.status(404).json({
            message: 'Note was not found, refresh the website or create a new one!'
        });
    }
})

app.delete('/notes/:id', (req, res) => {
    const notesId = parseInt(req.params.id);
    const noteIndex = notes.findIndex(note => note.id === notesId);

    if (noteIndex !== -1) {
        notes.splice(noteIndex, 1);
        res.status(200).json({ message: 'Note was removed correctly!' });
        console.log('Was removed')
    } else {
        res.status(404).json({ message: 'Note was not found, refresh the website or create a new one!' });
    }
});


app.listen(PORT, () => {
    console.info(`Server running at port ${PORT}`);
});