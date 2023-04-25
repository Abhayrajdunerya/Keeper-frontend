import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Note from './Note';
import CreateArea from './CreateArea';
import NoteContext from '../context/notes/NoteContext';

const Keeper = () => {

  const navigate = useNavigate();

  const context = useContext(NoteContext);
  const { notes, getNotes, editNote } = context;
  useEffect(() => {
    if (localStorage.getItem('token')) {
      getNotes()
    } else {
      navigate('/');
    }
  })

  const [note, setNote] = useState({id: "",title: "", content: ""});

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  }

  const updateNote = (currentNote) => {
    setNote({
      id: currentNote._id,
      title: currentNote.title,
      content: currentNote.content
    });
  }


  return (
    <div style={{padding: '1rem'}}>
      {/* <!-- Modal --> */}
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="title" className="form-label">Title</label>
                <input type="text" className="form-control" id="title" name="title" value={note.title} onChange={onChange} minLength={3} required />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">Content</label>
                {/* <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={onChange} /> */}
                <textarea className="form-control" id="content" name="content" value={note.content} onChange={onChange} minLength={5} required />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={() => editNote(note.id, note.title, note.content)} disabled={note.title.length < 3 || note.content.length < 5}>Save</button>
            </div>
          </div>
        </div>
      </div>

      <CreateArea />
      {notes.map((noteItem, index) => {
        return <Note
          key={index}
          noteItem={noteItem}
          updateNote={updateNote}
        />
      })}
    </div>
  )
}

export default Keeper;
