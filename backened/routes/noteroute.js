const express = require("express");
const router = express.Router();
const notes = require("../models/Notes");
const fetchuser = require("../middleware/fetchUser");
const { body, validationResult } = require("express-validator");
router.get("/getnotes", fetchuser, async (req, res) => {
  console.log("GET AAL NOTES CALLED", req.user.id);
  mynotes = await notes.find({ user: req.user.id });
  res.send(mynotes);
});
router.post(
  "/addnotes",
  fetchuser,
  [
    body("title").isLength({ min: 5 }),
    body("discription").isLength({ min: 5 }),
    body("tag").isLength({ min: 5 }),
  ],
  async (req, res) => {
    console.log("ADDD NOTES CALLED");
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("error");
      return res.status(400).json({ errors: errors.array() });
    }
    note = new notes({
      title: req.body.title,
      discription: req.body.discription,
      tag: req.body.tag,
      user: req.user.id,
    });
    const savednotes = await note.save();
    res.send(savednotes);
  }
);
router.put("/updatenotes/:id", fetchuser, async (req, res) => {
  console.log("UPDATES CALLED");
  console.log("updt", req.params.id);
  const { title, discription, tag } = req.body;
  newnote = {};
  if (title) {
    newnote.title = title;
  }
  if (discription) {
    newnote.discription = discription;
  }
  if (tag) {
    newnote.tag = tag;
  }
  const comingnoteuser = await notes.findById(req.params.id);
  if (!comingnoteuser) {
    res.send("user dne");
  }
  if (!comingnoteuser.user) {
    res.send("u r not allowed with wrong id");
  }
  if (comingnoteuser.user.toString() != req.user.id) {
    res.send("u r not allowed");
  }
  note = await notes.findByIdAndUpdate(
    req.params.id,
    { $set: newnote },
    { new: true }
  );
  res.send(note);
});

router.delete("/deletenotes/:id", fetchuser, async (req, res) => {
  console.log("DELETE NOTES CALLED");
  const comingnoteuser = await notes.findById(req.params.id);
  if (!comingnoteuser) {
    return res.status(401).json({ errors: " .user dne" });
  }
  if (!comingnoteuser.user) {
    return res.status(402).json({ errors: " .user dne, u r not allowed" });
  }
  if (comingnoteuser.user.toString() != req.user.id) {
    return res.status(403).json({ errors: " sorry u r not allowed" });
  }
  note = await notes.findByIdAndDelete(req.params.id);
  return res.send("note has been deleted");
});
module.exports = router;
