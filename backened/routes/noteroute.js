const express = require("express");
const router = express.Router();
const {db1} = require("../db");
const fetchuser = require("../middleware/fetchUser");
const { body, validationResult } = require("express-validator");


// Get all notes
router.get("/getnotes", fetchuser, async (req, res) => {
  console.log("GET ALL NOTES CALLED", req.user.id);
  try {
    const [rows] = await db1.query('SELECT * FROM notes WHERE user_id = ?', [req.user.id]);
    res.send(rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Database error");
  }
});
// router.post("/addnotes", ()=>{
//   console.log("working");
// })
// Add a new note
router.post(
  "/addnotes",
  fetchuser,
  [
    body("title").isLength({ min: 5 }),
    body("description").isLength({ min: 5 }),
    body("tag").isLength({ min: 5 }),
  ],
  async (req, res) => {
    console.log("ADD NOTES CALLED");
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("error");
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const [result] = await db1.query(
        'INSERT INTO notes (title, description, tag, user_id) VALUES (?, ?, ?, ?)',
        [req.body.title, req.body.description, req.body.tag, req.user.id]
      );
      const [savedNote] = await db1.query('SELECT * FROM notes WHERE id = ?', [result.insertId]);
      res.send(savedNote[0]);
    } catch (error) {
      console.error(error);
      res.status(500).send("Database error");
    }
  });

  router.put("/updatenotes/:id", fetchuser, async (req, res) => {
    console.log("UPDATE NOTES CALLED");
    console.log("update", req.params.id);
    const { title, description, tag } = req.body;
    let newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }
    
    try {
      const [notes] = await db1.query('SELECT * FROM notes WHERE id = ?', [req.params.id]);
      const note = notes[0];
      
      if (!note) {
        return res.status(404).send("Note does not exist");
      }
      if (note.user_id !== req.user.id) {
        return res.status(403).send("You are not allowed to update this note");
      }
      
      await db1.query('UPDATE notes SET ? WHERE id = ?', [newNote, req.params.id]);
      const [updatedNote] = await db1.query('SELECT * FROM notes WHERE id = ?', [req.params.id]);
      res.send(updatedNote[0]);
    } catch (error) {
      console.error(error);
      res.status(500).send("Database error");
    }
  });



// Delete a note
router.delete("/deletenotes/:id", fetchuser, async (req, res) => {
  console.log("DELETE NOTES CALLED");
  try {
    const [notes] = await db1.query('SELECT * FROM notes WHERE id = ?', [req.params.id]);
    const note = notes[0];
    
    if (!note) {
      return res.status(404).send("Note does not exist");
    }
    if (note.user_id !== req.user.id) {
      return res.status(403).send("You are not allowed to delete this note");
    }
    
    await db1.query('DELETE FROM notes WHERE id = ?', [req.params.id]);
    res.send("Note has been deleted");
  } catch (error) {
    console.error(error);
    res.status(500).send("Database error");
  }
});

module.exports = router;