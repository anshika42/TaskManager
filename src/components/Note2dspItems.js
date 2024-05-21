import React, { useContext, useEffect, useState } from "react";
import MyNContext from "../context/NoteContext/noteconContext";
const Note2dspItems = (props) => {
  const a = useContext(MyNContext);

  return (
    <div className="col-md-4">
      <div className="card my-3">
        <div className="card-body">
          <h5 className="card-title">{props.notes.title}</h5>
          <p className="card-text">{props.notes.discription}</p>
          <p className="card-text">{props.notes.tag}</p>
          <div>
            <i
              className="fa-solid fa-pen-to-square m-3"
              onClick={() => {
                props.updatingnote(props.notes);
              }}
            ></i>
            <i
              className="fa-solid fa-trash-can m-3"
              onClick={() => {
                a.DeleteNote(props.notes._id);
              }}
            ></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Note2dspItems;
