const datab = require("./db");
const express = require("express");
const app = express();
const port =process.env.PORT|| 4000;

var cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

datab();
app.use("/api/auth", require("./routes/authroutes"));
app.use("/api/notes", require("./routes/noteroute"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
