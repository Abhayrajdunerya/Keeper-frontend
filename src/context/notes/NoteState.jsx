import React, { useState } from 'react'
import NoteContext from './NoteContext';

const NoteState = (props) => {

    // const host = "http://localhost:8000/api";
    // const host = "https://keper-backend.onrender.com/api";
    // const host = process.env.REACT_APP_API;
    const host = import.meta.env.VITE_API;


    const [notes, setNotes] = useState([]);

    // Get all Notes
    const getNotes = async () => {
        // API Call
        const response = await fetch(`${host}/note/fetchAllNotes`, {
            method: "GET",
            headers: {
                'auth-token': localStorage.getItem('token')
            }
        });
        const json = await response.json();
        setNotes(json);
    }

    // Add a Note
    const addNote = async (title, content) => {
        // API Call
        const response = await fetch(`${host}/note/addNote`, {
            method: "POST",
            headers: {
                'Content-Type': "application/x-www-form-urlencoded",
                'auth-token': localStorage.getItem('token')
            },
            body: new URLSearchParams({
                'title': title,
                'content': content
            })
        });
        const json = await response.json();
        setNotes(notes.concat(json));
    }

    // Delete a Note
    const deleteNote = async (id) => {
        // API Call
        await fetch(`${host}/note/deleteNote/${id}`, {
            method: "DELETE",
            headers: {
                'auth-token': localStorage.getItem('token')
            }
        });

        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes);
    }

    // Edit a Note
    const editNote = async (id, title, content) => {
        // API Call
        const response = await fetch(`${host}/note/updateNote/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': "application/x-www-form-urlencoded",
                'auth-token': localStorage.getItem('token')
            },
            body: new URLSearchParams({
                'title': title,
                'content': content
            })
        });
        response.json();

        // // Logic to edit in client
        let newNotes = JSON.parse(JSON.stringify(notes));
        for (let index = 0; index < notes.length; index++) {
            const element = notes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].content = content;
                break;
            }
        }
        setNotes(newNotes);
    }

    return (
        <NoteContext.Provider value={{ notes, setNotes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;