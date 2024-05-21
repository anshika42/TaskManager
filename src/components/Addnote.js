import React, { useContext, useEffect, useState } from "react";
import MyNContext from "../context/NoteContext/noteconContext";
const Addnote = () => {
  const a = useContext(MyNContext);
  const [note, setnote] = useState({ title: "", discription: "", tag: "" });
  const handleclick = async (e) => {
    e.preventDefault();
    await a.AddingNote(note.title, note.discription, note.tag);
    console.log("le baba  name", a.notes.name);
    setnote({ title: "", discription: "", tag: "" });
  };
  const handlechange = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <h1 style={{textAlign:"center", margin:"18px"}}>Add your Notes</h1>
      <div className="mb-3">
        <label htmlFor="title" className="form-label" onChange={handlechange}>
          Title
        </label>
        <input
          value={note.title}
          type="text"
          className="form-control"
          id="title"
          placeholder=""
          name="title"
          onChange={handlechange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleFormControlTextarea1" className="form-label">
          Description
        </label>
        <textarea
          value={note.discription}
          className="form-control"
          id="discription"
          name="discription"
          rows="3"
          onChange={handlechange}
        ></textarea>
      </div>
      <div className="mb-3">
        <label htmlFor="exampleFormControlTextarea1" className="form-label">
          <div className="mb-3">
            <label htmlFor="exampleFormControlTextarea1" className="form-label">
              Tag
            </label>
            <textarea
              value={note.tag}
              className="form-control"
              id="tag"
              name="tag"
              rows="3"
              onChange={handlechange}
            ></textarea>
          </div>
        </label>
      </div>

      <button onClick={handleclick}>submit</button>
      <h1 style={{textAlign:"center", margin:"18px"}}>Your Notes</h1>
    </div>
  );
};

export default Addnote;
