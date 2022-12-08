const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();

const userRouts = require("./Api/routes/userRouts");
const tutorialRouts = require("./Api/routes/tutorialRouts");

const app = express();

var cors = require("cors");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

mongoose
  .connect(process.env.MONGO_CONNECTION, { useNewUrlParser: true })
  .then(console.log("connected"))
  .catch((err) => {
    console.log("xxxxxxxxxxxxxxxxxx");
    console.log(err);
  });

app.use(userRouts);
app.use(tutorialRouts);

app.listen(3000);
