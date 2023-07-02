const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const encrypt = require("mongoose-encryption");
require("dotenv").config();

mongoose.connect("mongodb://127.0.0.1:27017/todoDB2");

const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

mongoose.connect("mongodb://127.0.0.1:27017/todoDB2");

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});

// var encKey = process.env.SOME_32BYTE_BASE64_STRING;
// var sigKey = process.env.SOME_64BYTE_BASE64_STRING;
// userSchema.plugin(encrypt, { encryptionKey: encKey, signingKey: sigKey });

const User = new mongoose.model("User", userSchema);

app.get("/", function (req, res) {
  res.render("home");
});

app.get("/login", function (req, res) {
  res.render("login");
});

app.post("/login", function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  User.findOne({ email: username }).then(function (foundUser) {
    console.log(foundUser);

    if (foundUser) {
      if (foundUser.password === password) res.render("secrets");
    }
  });
});

app.get("/register", function (req, res) {
  res.render("register");
});

app.post("/register", function (req, res) {
  const newUser = new User({
    email: req.body.username,
    password: req.body.password,
  });

  newUser.save().then(function (err) {
    res.render("secrets");
  });
});

app.listen(3000, function () {
  console.log("Server has started on port 3000");
});
