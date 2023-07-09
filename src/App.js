import React, { useState } from 'react';
import './App.css';
// import { Note } from './Note';
import { Link, Route, Routes } from 'react-router-dom';
import { Home } from './Home';
import { Notes } from './Notes';

function AddNote(){
  
  const [newNote,setNewNote] = useState({});

  
  const addNote = (e) => {
    e.preventDefault();
    const data = {}
    Array.from(e.target.elements).forEach((element) => {
      if(element.name!==""){
        data[element.name] = element.value;
      }
    });
    setNewNote(data)
    console.log(newNote)
  }
  return (
    <div>
      <h1>Create A New Note</h1>
      
      <form onSubmit={addNote}>
        <input placeholder='type a new note...' name='content'></input>
        <br/>
        <br/>
        <label>Is Important:</label>
        <select name='important'>
          <option value="">--Select an option--</option>
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </select>
        <br/>
        <br/>
        <button type='submit'>Add Note</button>
      </form>
    </div>
  )
}


function App() {
  return (
    <div className="App">
      <div className='navBar'>
        <div>
          <Link to="/">Home</Link>
        </div>
        <div>
          <Link to="/notes">Read notes</Link>
        </div>
        <div>
          <Link to="/addNote">Read notes</Link>
        </div>
      </div>


      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/notes' element={<Notes />} />
        <Route path='/addNote' element={<AddNote />} />
      </Routes>
    </div>

  );
}

export default App;
