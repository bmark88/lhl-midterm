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
const settings = require('./routes/settings');
const comments = require('./routes/comments');
const auth = require('./routes/auth');

//////////////////////////////////////
// HELPER FUNCTION
/////////////////////////////////////
//when page is rendered, header will change if logged in or out
const renderWithHeader = (req, res, route) => {
  console.log("route =========> ", route)
  console.log("req.session.user_id ====> ", req.session.user_id)
  let userID = req.session.user_id;
  if (userID) {
    return db.query(`
    SELECT *
    FROM users
    WHERE id = $1;`, [userID])
    .then(res => {
      const {username, avatar_url} = res.rows[0];
      console.log("username ----> ", username, "avatar -------> ", avatar_url)
      const templateVars = { isLoggedIn: true, username, avatar_url }
      return res.render(route, templateVars);
      })
      .catch(e => e.stack);
  } else {
    const templateVars = { isLoggedIn:false }
    return res.render(route, templateVars);
  }
}
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
app.use(settings(router));
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
  renderWithHeader(req, res, 'index');
});

app.get("/login", (req, res) => {
  renderWithHeader(req, res, 'login');
});

app.get("/register", (req, res) => {
  renderWithHeader(req, res, 'register');
});

app.get("/categories", (req, res) => {
  renderWithHeader(req, res, 'categories');
});

app.get("/pins", (req, res) => {
  if (req.session.user_id) {
    renderWithHeader(req, res, 'pins');
  } else {
    res.redirect('/');
  }
});

app.get("/settings", (req, res) => {
  if (req.session.user_id) {
    renderWithHeader(req, res, 'settings');
  }
  return res.redirect('/');
});

app.post('/logout', (req, res) => {
  req.session = null;
  res.redirect('/login');
})

app.get("/likes", (req, res) => {
  if (req.session.user_id) {
    return renderWithHeader(req, res, 'likes');
  }
  return res.redirect('/');
});

app.get('/comments', (req, res) => {
  if (req.session.user_id) {
    return renderWithHeader(req, res, 'pins');
  }
  return res.redirect('/');
});

// app.get("/modal", (req, res) => {
//   return res.render("modal");
// })

app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});
