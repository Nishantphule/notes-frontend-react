import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Note } from './Note.1';

export function Notes() {
    const [notes, setNotes] = useState([]);

    const fetchNotes = () => {
        axios
            .get('https://notes-b43we-node.onrender.com/api/notes')
            .then((res) => {
                setNotes(res.data);
            });
    };

    useEffect(() => fetchNotes(), [notes]);

    return (
        <div>
            <h1>My Notes:</h1>

            <ul>
                {notes.map((note) => {
                    return <Note note={note.content} />;
                })}
            </ul>

        </div>
    );
}
