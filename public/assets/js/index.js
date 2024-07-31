let noteForm;
let noteTitle;
let noteText;
let saveNoteBtn;
let newNoteBtn;
let clearBtn;
let noteList;

if (window.location.pathname === '/notes') {
  noteForm = document.querySelector('.note-form');
  noteTitle = document.querySelector('#note-title');
  noteText = document.querySelector('#note-text');
  saveNoteBtn = document.querySelector('#save-note');
  newNoteBtn = document.querySelector('#new-note');
  clearBtn = document.querySelector('#clear-note');
  noteList = document.querySelector('#note-list');
}

// Show an element
const show = (elem) => {
  elem.style.display = 'inline';
};

// Hide an element
const hide = (elem) => {
  elem.style.display = 'none';
};

// activeNote is used to keep track of the note in the textarea
let activeNote = {};

const getNotes = () =>
  fetch('/api/notes', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .catch((error) => console.error('Error fetching notes:', error));

const saveNote = (note) => {
  console.log('Saving note:', note);
  return fetch('/api/notes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(note)
  })
  .then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .catch((error) => console.error('Error saving note:', error));
};

const deleteNote = (id) =>
  fetch(`/api/notes/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .catch((error) => console.error('Error deleting note:', error));

const renderActiveNote = () => {
  hide(saveNoteBtn);
  hide(clearBtn);

  if (activeNote && activeNote.id) {
    noteTitle.setAttribute('readonly', true);
    noteText.setAttribute('readonly', true);
    noteTitle.value = activeNote.title || '';
    noteText.value = activeNote.text || '';
  } else {
    show(saveNoteBtn);
    show(clearBtn);
    noteTitle.removeAttribute('readonly');
    noteText.removeAttribute('readonly');
    noteTitle.value = '';
    noteText.value = '';
  }
};

const handleNoteSave = () => {
  const newNote = {
    title: noteTitle.value,
    text: noteText.value
  };
  saveNote(newNote).then(() => {
    getAndRenderNotes();
    renderActiveNote();
  });
};

const handleNoteView = (e) => {
  e.preventDefault();
  const note = JSON.parse(e.target.getAttribute('data-note'));
  if (note) {
    activeNote = note;
  } else {
    activeNote = {};
  }
  renderActiveNote();
};

const handleNewNoteView = () => {
  activeNote = {};
  renderActiveNote();
};

const handleNoteDelete = (e) => {
  e.stopPropagation();
  const note = e.target;
  const noteId = JSON.parse(note.parentElement.getAttribute('data-note')).id;

  if (activeNote.id === noteId) {
    activeNote = {};
  }

  deleteNote(noteId).then(() => {
    getAndRenderNotes();
    renderActiveNote();
  });
};

const handleRenderSaveBtn = () => {
  if (!noteTitle.value.trim() || !noteText.value.trim()) {
    hide(saveNoteBtn);
    hide(clearBtn);
  } else {
    show(saveNoteBtn);
    show(clearBtn);
  }
};

const renderNoteList = (notes) => {
  noteList.innerHTML = '';

  notes.forEach((note) => {
    const li = document.createElement('li');
    li.classList.add('list-group-item');
    li.setAttribute('data-note', JSON.stringify(note));

    const span = document.createElement('span');
    span.innerText = note.title;
    span.addEventListener('click', handleNoteView);

    const delBtn = document.createElement('i');
    delBtn.classList.add('fas', 'fa-trash-alt', 'float-right', 'text-danger', 'delete-note');
    delBtn.addEventListener('click', handleNoteDelete);

    li.append(span, delBtn);
    noteList.append(li);
  });
};

const getAndRenderNotes = () => getNotes().then((notes) => renderNoteList(notes));

if (window.location.pathname === '/notes') {
  saveNoteBtn.addEventListener('click', handleNoteSave);
  newNoteBtn.addEventListener('click', handleNewNoteView);
  noteTitle.addEventListener('keyup', handleRenderSaveBtn);
  noteText.addEventListener('keyup', handleRenderSaveBtn);

  getAndRenderNotes();
}
