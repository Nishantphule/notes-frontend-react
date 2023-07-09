import React from 'react';

export function Note({ note,toggleImp,deleteNote }) {
    return (
        <li>
            {note.content}
            <button onClick={()=>toggleImp(note.id)}>
                {note.important ? "make not important" : "make important"}
            </button>
            <button  onClick={()=>deleteNote(note.id)}>Delete</button>
        </li>

    );
}