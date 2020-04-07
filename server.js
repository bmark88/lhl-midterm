// load .env data into process.env
require('dotenv').config();

// Web server config
const PORT       = process.env.PORT || 8080;
const ENV        = process.env.ENV || "development";
const express    = require("express");
const bodyParser = require("body-parser");
const app        = express();
const morgan     = require('morgan');
const cookieSession = require('cookie-session');

const router = require('express').Router();
router.use(cookieSession({
  name: 'session',
  keys: ['user_id'],
}));

// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
const db = new Pool(dbParams);
db.connect();

// Other variables
const comments = require('./routes/comments');
const auth = require('./routes/auth');

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const front_page = require('./routes/front_page');

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use(front_page(router));

// Note: mount other resources here, using the same pattern above
app.use(auth(router));
app.use(comments(router));
// app.use(cookieSession({
//   name: 'session',
//   keys: ['user_id'],
//   }));

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
app.get("/", (req, res) => {
  let userID = req.session.user_id;

  res.render("categories");
});

app.get("/login", (req, res) => {
  let userID = req.session.user_id;

  res.render("login");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.get("/categories", (req, res) => {
  let userID = req.session.user_id;


  res.render("categories");
});

app.post("/categories", (req, res) => {
  console.log(req.body);

  res.render("categories");
})

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.get("/pins", (req, res) => {
  let userID = req.session.user_id;
  res.render("pins");
});

app.get("/settings", (req, res) => {
  let userID = req.session.user_id;
  res.render("settings");
});

app.get("/likes", (req, res) => {
  let userID = req.session.user_id;

  res.render("likes");
});

app.get('/comments', (req, res) => {
  let userID = req.session.user_id;
  console.log(req.body);
  res.render('pins');
});

app.get("/modal", (req, res) => {
  res.render("modal");
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
