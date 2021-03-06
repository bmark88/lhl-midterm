const {
  Pool
} = require('pg');

const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'midterm'
});

const bcrypt = require('bcrypt');
const router = require('express').Router();
const {
  getUserWithEmail,
  getUserWithUsername
} = require('../public/scripts/database');
const cookieSession = require('cookie-session');

router.use(cookieSession({
  name: 'session',
  keys: ['user_id'],
}));

//////////////////////////////////////
// HELPER FUNCTION
/////////////////////////////////////
//when page is rendered, header will change if logged in or out
const renderWithHeader = (req, res, route) => {
  let userID = req.session && req.session.user_id;
  if (userID) {
    return pool.query(`
    SELECT *
    FROM users
    WHERE id = $1;`, [userID])
      .then(result => {
        if (result.rows.length === 0) {
          const templateVars = { isLoggedIn: false, username: null, avatar_url: null };
          return res.render(route, templateVars);
        }
        const {username, avatar_url} = result.rows[0];
        const templateVars = { isLoggedIn: true, username, avatar_url };
        return res.render(route, templateVars);
      })
      .catch(e => {
        return e.stack;
      });
  } else {
    const templateVars = { isLoggedIn: false, username: null, avatar_url: null };
    return res.render(route, templateVars);
  }
};
module.exports = function() {

  //log in
  /**
   * Check if a user exists with a given username and password
   * @param {String} email
   * @param {String} password encrypted
   */

  router.post("/login", (req, res) => {
    const {
      email,
      password
    } = req.body;
    if (!email || !password) {
      return res.send("ERROR: empty field");
    }
    login(email, password)
      .then(user => {
        if (!user) {
          return res.send("Email or password is incorrect!");
        }


        req.session.user_id = user.id;
        return res.redirect('pins');
      })
      .catch(e => res.send(e));
  });

  router.post("/register", (req, res) => {
    const {
      username,
      email,
      password
    } = req.body;
    // let alreadyExists = false;
    Promise.all([isNewEmail(email), isNewUsername(username)])
      .then(
        (values) => {
          if (values[0] && values[1]) {
          // if neither username or email matches any in db, create new user
            const queryString = `
              INSERT INTO users (username, email, password)
              VALUES ($1, $2, $3)
              `;
            const queryParams = [username, email, password];
            pool.query(queryString, queryParams);
            return renderWithHeader(req, res, 'login');
          } else {
            return res.send("user or email has been taken");
          }
        });
  });

  return router;
};
