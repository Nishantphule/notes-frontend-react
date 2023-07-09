import React, { useEffect, useState } from 'react';
import './App.css';
import { Note } from './Note';
import axios from 'axios';

function App() {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState("")
  const [showAll, setShowAll] = useState(true)

  // make the api call
  useEffect(() => {
    // axios
    axios
      .get('https://notes-b43we-node.onrender.com/api/notes')
      .then((res) => {
        setNotes(res.data)
      })
  }, [notes])


  // create
  const addNote = (e) => {
    e.preventDefault();

    const newNoteObj = {
      id: notes.length + 1,
      content: newNote,
      important: Math.random() < 0.5,
    }

    // setNotes([...notes, newNoteObj])

    // set note using axios
    axios
      .post("https://notes-b43we-node.onrender.com/api/notes", newNoteObj)
      .then((res) => {
        setNotes([...notes, res.data])
      })

    setNewNote("")
  }


  // update
  const toggleImp = (id) => {
    const url = `https://notes-b43we-node.onrender.com/api/notes/${id}`;
    const note = notes.find(note => note.id === id)
    const changeImp = {
      ...note,
      important: !note.important
    };

    axios
      .put(url, changeImp)
      .then((res) => {
        const updated = notes.map(note => {

          if (note.id === id) {
            return res.data
          }
          return note
        });

        setNotes(updated)
      })
  }


  // detele
  const deleteNote = (id) => {
    const url = `https://notes-b43we-node.onrender.com/api/notes/${id}`;
    axios
      .delete(url)
      .then((res) => {
        const updated = notes.filter(note => note.id !== id)
        setNotes(updated)
      })
  }

  const handleNoteChange = (e) => {
    setNewNote(e.target.value)
  }


  return (
    <div className="App">
      <h1>Notes</h1>
      <button onClick={() => setShowAll(!showAll)}>
        show {showAll ? "important" : "all"}
      </button>
      <ul>
        {
          showAll

            ? notes
              .map((note) => <Note key={note.id} note={note} toggleImp={toggleImp} deleteNote={deleteNote} />)

            : notes
              .filter((note) => note.important)
              .map((note) => <Note key={note.id} note={note} toggleImp={toggleImp} deleteNote={deleteNote} />)

        }
      </ul>

      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} placeholder='a new note...' />
        <button type='submit'>Save</button>
      </form>
    </div>
  );
}

export default App;
