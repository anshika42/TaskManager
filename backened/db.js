
const mysql = require('mysql2/promise');

const db =mysql.createPool({
  host:"localhost",
  user:"root",
  password:"1234",
  database: "user",
})


const db1 =mysql.createPool({
  host:"localhost",
  user:"root",
  password:"1234",
  database: "notes",
})


module.exports = {db,db1};

