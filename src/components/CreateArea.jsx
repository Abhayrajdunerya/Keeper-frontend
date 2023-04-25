import React, { useState, useContext } from "react";
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';
import NoteContext from "../context/notes/NoteContext";

function CreateArea() {

    const context = useContext(NoteContext);

    const {addNote} = context;

    const [isExpended, setExpended] = useState(false);

    const [note, setNote] = useState({
       title: "",
       content: "" 
    });

    function handleChange(event) {
        const {name, value} = event.target;

        setNote (prevNote => {
            return {
                ...prevNote,
                [name]: value
            }
        });
    }

    function submitNote(event) {
        addNote(note.title, note.content);
        setNote({
          title: "",
          content: ""
        })
        event.preventDefault();
    }

    function expand() {
      setExpended(true);
    }

  return (
    <div>
      <form className="create-note">
        {
          isExpended && 
          <input 
              onChange={handleChange}
              name="title" 
              placeholder="Title" 
              value={note.title} 
              minLength={3}
              required
          />
        }
        <textarea 
            onClick={expand}
            onChange={handleChange}
            name="content" 
            placeholder="Take a note..." 
            value={note.content} 
            rows={isExpended ? 3 : 1} 
            minLength={5}
            required
        />
        <Zoom in={isExpended}>
            <Fab  className="fab" onClick={submitNote} disabled={note.title.length < 3 || note.content.length < 5}>
              <AddIcon />
            </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
