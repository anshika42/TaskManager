import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import MyNContext from "../context/NoteContext/noteconContext";
import { Container, Row, Col, Form, Button, Card} from 'react-bootstrap';
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
      eid: currnote.id,
      etitle: currnote.title,
      ediscription: currnote.description,
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


      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Update</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              value={note.etitle}
              type="text"
              id="etitle"
              placeholder="name@example.com"
              name="etitle"
              onChange={handlechange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              value={note.ediscription}
              id="ediscription"
              name="ediscription"
              rows="3"
              onChange={handlechange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Tag</Form.Label>
            <Form.Control
              as="textarea"
              value={note.etag}
              id={note.etag}
              name="etag"
              rows="3"
              onChange={handlechange}
            />
          </Form.Group>
        </Form>
      </div>
      <div className="modal-footer">
        <Button variant="secondary" data-bs-dismiss="modal">
          Close
        </Button>
        <Button variant="primary" data-bs-dismiss="modal" onClick={updatehandler}>
          Update
        </Button>
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

