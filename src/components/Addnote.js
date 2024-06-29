import React, { useContext, useEffect, useState } from "react";
import MyNContext from "../context/NoteContext/noteconContext";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";

const Addnote = () => {
  const a = useContext(MyNContext);
  const [note, setnote] = useState({ title: "", description: "", tag: "" });
  const handleclick = async (e) => {
    e.preventDefault();
    await a.AddingNote(note.title, note.description, note.tag);
    console.log("le baba  name", a.notes.name);
    setnote({ title: "", description: "", tag: "" });
  };
  const handlechange = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card>
            <Card.Body>
              <h1 className="text-center mb-4">Add your Notes</h1>
              <Form>
                <Form.Group controlId="title">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    value={note.title}
                    onChange={handlechange}
                    placeholder="Enter title"
                    name="title"
                  />
                </Form.Group>

                <Form.Group controlId="description" className="mt-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    value={note.description}
                    onChange={handlechange}
                    placeholder="Enter description"
                    name="description"
                    rows={3}
                  />
                </Form.Group>

                <Form.Group controlId="tag" className="mt-3">
                  <Form.Label>Tag</Form.Label>
                  <Form.Control
                    as="textarea"
                    value={note.tag}
                    onChange={handlechange}
                    placeholder="Enter tag"
                    name="tag"
                    rows={3}
                  />
                </Form.Group>

                <Button variant="primary" type="submit" onClick={handleclick} className="mt-3" >
                  Submit
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="justify-content-center mt-3">
        <Col md={6}>
          <h1 className="text-center mb-4">Your Notes</h1>
        </Col>
      </Row>
    </Container>
  );
};

export default Addnote;