const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userModel = require("./Models/users");
const bodyParser = require("body-parser");
const path = require("path");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static("build"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 8080;

const mongoDb = process.env.MONGO_DB;
mongoose.connect(mongoDb);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));

app.post("/signUp", async (req, res) => {
  try {
    const user = new userModel({
      username: req.body.formValues.username,
      password: req.body.formValues.password,
      email: req.body.formValues.email,
    });
    user.save();
    req.redirect("/");
  } catch (err) {
    return err;
  }
});

app.listen(PORT, () => console.log("Server started"));

// app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
// app.use(passport.session());
// app.use(express.urlencoded({ extended: false }));

//login
// app.get("/", (req, res) => {
//   res.send();
// });

//creating new account
