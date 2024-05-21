import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import MyNContext from "../context/NoteContext/noteconContext";
import Addnote from "./Addnote";
import Note2dspItems from "./Note2dspItems";
const Note2dspl = () => {
  const history = useNavigate();
  const a = useContext(MyNContext);
  const { notes, GetAllNote, UpdateNote } = a;
  const [note, setnote] = useState({
    eid: "",
    etitle: "t",
    ediscription: "d",
    etag: "t",
  });
  useEffect(() => {
    // localStorage.removeItem("tocken");
    // console.log("in start", localStorage.getItem("tocken"));
    if (localStorage.getItem("tocken")) {
      GetAllNote();
    } else {
      history("/Signup");
    }
  }, []);
  const ref = useRef(null);
  const updatingnote = (currnote) => {
    ref.current.click();
    console.log(currnote._id, "hey bro");
    setnote({
      eid: currnote._id,
      etitle: currnote.title,
      ediscription: currnote.discription,
      etag: currnote.tag,
    });
  };
  const updatehandler = (e) => {
    console.log(note.eid);
    UpdateNote(note.eid, note.etitle, note.ediscription, note.etag);
  };
  const handlechange = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <>
      <Addnote />
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Update
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="mb-3">
              <label
                htmlFor="etitle"
                className="form-label"
                onChange={handlechange}
              >
                Title
              </label>
              <input
                value={note.etitle}
                type="text"
                className="form-control"
                id="etitle"
                placeholder="name@example.com"
                name="etitle"
                onChange={handlechange}
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="exampleFormControlTextarea1"
                className="form-label"
              >
                discription
              </label>
              <textarea
                value={note.ediscription}
                className="form-control"
                id="ediscription"
                name="ediscription"
                rows="3"
                onChange={handlechange}
              ></textarea>
            </div>
            <div className="mb-3">
              <label
                htmlFor="exampleFormControlTextarea1"
                className="form-label"
              >
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlTextarea1"
                    className="form-label"
                  >
                    Tag
                  </label>
                  <textarea
                    value={note.etag}
                    className="form-control"
                    id={note.etag}
                    name="etag"
                    rows="3"
                    onChange={handlechange}
                  ></textarea>
                </div>
              </label>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={updatehandler}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        {notes.map((notess) => {
          return (
            <Note2dspItems
              notes={notess}
              updatingnote={updatingnote}
              key={notess._id}
            />
          );
        })}
      </div>
    </>
  );
};

export default Note2dspl;
