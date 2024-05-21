const express = require("express");
const router = express.Router();
const user = require("../models/Userschema");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jsonwebtokensecret = "mysecret@3";
const fetchuser = require("../middleware/fetchUser");
router.post(
  "/save",
  [
    body("email").isEmail(),
    body("password").isLength({ min: 5 }),
    body("name").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    let success = false;
    console.log("SAVE CALLED");
    if (!errors.isEmpty()) {
      console.log("error");
      return res.status(400).json({ success: success, errors: errors.array() });
    }
    const salt = await bcrypt.genSalt(10);
    const encryptedpass = await bcrypt.hash(req.body.password, salt);
    user
      .create({
        name: req.body.name,
        email: req.body.email,
        password: encryptedpass,
      })
      .then((user) => {
        success = true;
        const jwtdata = jwt.sign({ id: user.id }, jsonwebtokensecret);
        res.json({ success: success, jwtdata });
      });
  }
);
router.post(
  "/login",
  [body("email").isEmail(), body("password").exists()],
  async (req, res) => {
    console.log("LOGIN CALLED");
    const errors = validationResult(req);
    let success = false;
    if (!errors.isEmpty()) {
      console.log("error");
      return res.status(400).json({ success: success, errors: errors.array() });
    }
    const usermail = req.body.email;
    const userpass = req.body.password;
    try {
      const users = await user.findOne({ email: usermail });
      if (!users) {
        return res
          .status(401)
          .json({ success: success, error: "sorry use correct credentials 1" });
      }
      const comp = await bcrypt.compare(userpass, users.password);
      if (!comp) {
        return res
          .status(402)
          .json({ success: success, error: "sorry use correct credentials 2" });
      } else {
        const jwtdata = jwt.sign({ id: users.id }, jsonwebtokensecret);

        console.log("le beta", jwtdata);
        success = true;
        res.json({ success: success, jwtdata: jwtdata });
      }
    } catch (error) {
      return res.status(403).json({ error: "sorry  3" });
    }
  }
);
router.post("/getuserdetail", fetchuser, async (req, res) => {
  console.log("SAVE CALLED");
  try {
    const userid = req.user.id;
    const users = await user.findById(userid);
    res.send(users);
  } catch (error) {
    res.status(404).send({ error: "shi se bharo yr" });
  }
});

module.exports = router;
