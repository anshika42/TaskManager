const {db,db1} = require("./db");
const express = require("express");
const dotenv = require("dotenv");
const app = express();
//swagger
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');


var cors = require("cors");
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const option = {
  definition:{
    openapi:'3.0.0',
    info:{
      title:"Node js API Project for MongoDb",
      version:'1.0.0'
    },
    servers:[
      {
        api:'http://localhost:8080/'
      }
    ]
  },
  apis:['./routes/noteroute.js']
}
const swaggerSpec = swaggerJSDoc(option)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/auth", require("./routes/authroutes"));
app.use("/api/notes", require("./routes/noteroute"));
const port = process.env.PORT || 4000;  

async function checkDatabaseConnections() {
  try {
    await Promise.all([
      db.query('SELECT 1'),
      db1.query('SELECT 1'),
    ]);
    console.log('All databases connected successfully');

    // Start the server
    app.listen(port, () => {
      console.log(`App listening on port ${port}`);
    });
  } catch (error) {
    console.error('Database connection error:', error);
  }
}
// Call the function to check database connections
checkDatabaseConnections();