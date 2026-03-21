require('dotenv').config()
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require('morgan')

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan('dev'))
app.use(express.json())

app.get("/", (req, res) => {
  res.send("Welcome to the Express.js Tutorial");
});

app.listen( process.env.PORT || 3000, () => {
  console.log("Server is running on http://localhost:3000");
});
