import React, { useState } from "react";
import MyNContext from "./noteconContext";
const NoteState = (props) => {
  const host = "http://localhost:4000";
  const [notes, setNotes] = useState([]);
  const GetAllNote = async () => {
    const response = await fetch(`${host}/api/notes/getnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-tocken": localStorage.getItem("tocken"),
      },
    });
    console.log(response);
    const jsonres = await response.json();
    console.log(jsonres);
    setNotes(jsonres);
  };
  const AddingNote = async (title, discription, tag) => {
    console.log(title, discription, tag);
    await fetch(`${host}/api/notes/addnotes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-tocken": localStorage.getItem("tocken"),
      },
      body: JSON.stringify({ title, discription, tag }),
    });
    console.log("in adding notes", localStorage.getItem("tocken"));
    const response = await fetch(`${host}/api/notes/getnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-tocken": localStorage.getItem("tocken"),
      },
    });
    const jsonres = await response.json();
    setNotes(jsonres);
  };
  const DeleteNote = async (id) => {
    fetch(`${host}/api/notes/deletenotes/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-tocken": localStorage.getItem("tocken"),
      },
    });
    const response = await fetch(`${host}/api/notes/getnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-tocken": localStorage.getItem("tocken"),
      },
    });
    console.log("is getting deleted ", id);
    const jsonres = await response.json();
    console.log(jsonres);
    setNotes(jsonres);
    const newNote = notes.filter((note) => {
      return note._id !== id;
    });

    setNotes(newNote);
  };
  const UpdateNote = async (id, title, discription, tag) => {
    await fetch(`${host}/api/notes/updatenotes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-tocken": localStorage.getItem("tocken"),
      },
      body: JSON.stringify({ title, discription, tag }),
    });
    const response = await fetch(`${host}/api/notes/getnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-tocken": localStorage.getItem("tocken"),
      },
    });
    console.log("is getting deleted ", id);
    const jsonres = await response.json();
    setNotes(jsonres);
  };

  return (
    <MyNContext.Provider
      value={{ notes, AddingNote, DeleteNote, UpdateNote, GetAllNote }}
    >
      {props.children}
    </MyNContext.Provider>
  );
};
export default NoteState;
