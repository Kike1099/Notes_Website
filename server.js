
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
    const noteId = parseInt(req.params.id);
    const noteIndex = notes.findIndex(note => note.id === noteId);

    if (noteIndex !== -1) {
        notes[noteIndex].title = req.body.title || notes[noteIndex].title;
        notes[noteIndex].content = req.body.content || notes[noteIndex].content;
        notes[noteIndex].tag = req.body.tag ? req.body.tag.split(',').map(tag => tag.trim()) : notes[noteIndex].tag;
        notes[noteIndex].updateDate = new Date(); // Actualizar la fecha de modificación

        res.status(200).json({
            message: 'Nota actualizada correctamente',
            note: notes[noteIndex]
        });
    } else {
        
        res.status(404).json({
            message: 'Nota no encontrada'
        });
    }
})



app.listen(PORT, () => {
    console.info(`Server running at port ${PORT}`);
});

// const express = require('express');
// const path = require('path');

// const app = express();
// const PORT = process.env.PORT || 4000;
// const PUBLIC = path.join(__dirname, 'public')

// const {v4:uuidv4} = require('uuid');

// app.set('view engine', 'ejs');
// app.engine('html', require('ejs').renderFile);

// app.use(express.urlencoded({extended: true}));
// app.use(express.json);
// // app.use(express.static(PUBLIC));

// let notes = [];

// app.get('/', (req, res) => {
//     res.render('index.html', { notes });
// });

// app.get('/notes/new', (req, res) => {
//     res.render('addnote.html', { note: null });
// });

// app.get('/notes/:id/edit', (req, res) => {
//     res.render('addnote.html', { note });
// });

// app.post('/notes', (req, res) => {
//     const addnote = {
//         id: uuidv4(),
//         title: req.body.title,
//         content: req.body.content,
//         tags: req.body.tags.split(',').map(tag => tag.trim()),
//         creationDate: new Date(),
//         updateDate: new Date()
//     };
//     notes.push(addnote);
//     res.redirect('/');
// });

// app.put('/notes/:id', (req, res) => {
//     const note = notes.find(note => note.id === req.params.id);
//     if(note){
//         note.title = req.body.title;
//         note.content = req.body.content;
//         note.tags = req.body.tags.split(',').map(tag => tag.trim());
//         note.updateDate = new Date();
//     }
//     res.redirect('/');
// });

// app.delete('/notes/:id/delete', (req, res) => {
//     notes =  notes.filter(note => note.id !== req.params.id);
//     res.redirect('/');
// });

// app.listen(PORT, () => {
//     console.info(`Server running at port ${PORT}`);
// });