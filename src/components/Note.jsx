import React, {useContext} from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import NoteContext from '../context/notes/NoteContext';

function Note(props) {

  const context = useContext(NoteContext);
  const {deleteNote} = context;
  const {noteItem, updateNote} = props;

    function handleDelete() {
      if (window.confirm('Are you sure to delete?')) {
        deleteNote(noteItem._id);
      }
    }

    function handleEdit() {
      updateNote(noteItem);
    }

  return (
    <div className="note">
      <h1>{noteItem.title}</h1>
      <p>{noteItem.content}</p>
      <button onClick={handleDelete}>
        <DeleteIcon />
      </button>
      <button onClick={handleEdit} data-bs-toggle="modal" data-bs-target="#exampleModal">
        <EditIcon />
      </button>
    </div>
  );
}

export default Note;
