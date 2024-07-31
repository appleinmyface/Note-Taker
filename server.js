const express = require('express');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const dbPath = path.join(__dirname, 'db/db.json');

// API route to get notes
app.get('/api/notes', (req, res) => {
  fs.readFile(dbPath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to read notes data' });
    } else {
      res.json(JSON.parse(data));
    }
  });
});

// API route to post a new note
app.post('/api/notes', (req, res) => {
  const newNote = { ...req.body, id: uuidv4() };
  
  fs.readFile(dbPath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to read notes data' });
    } else {
      const notes = JSON.parse(data);
      notes.push(newNote);
      
      fs.writeFile(dbPath, JSON.stringify(notes, null, 2), (err) => {
        if (err) {
          console.error(err);
          res.status(500).json({ error: 'Failed to save note' });
        } else {
          res.json(newNote);
        }
      });
    }
  });
});

// API route to delete a note by id
app.delete('/api/notes/:id', (req, res) => {
  const { id } = req.params;

  fs.readFile(dbPath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to read notes data' });
    } else {
      let notes = JSON.parse(data);
      notes = notes.filter(note => note.id !== id);

      fs.writeFile(dbPath, JSON.stringify(notes, null, 2), (err) => {
        if (err) {
          console.error(err);
          res.status(500).json({ error: 'Failed to delete note' });
        } else {
          res.json({ message: 'Note deleted successfully' });
        }
      });
    }
  });
});

// HTML routes
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/notes.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(PORT, () => console.log(`App listening on http://localhost:${PORT}`));
