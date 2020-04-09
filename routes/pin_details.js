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
  console.log("req.session.user_id ====> ", req.session.user_id)
  let userID = req.session.user_id;
  if (userID) {
    return pool.query(`
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

module.exports = function () {

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
        console.log(user);
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
          console.log(values)
          // if neither username or email matches any in db, create new user
              const queryString = `
              INSERT INTO users (username, email, password)
              VALUES ($1, $2, $3)
              `;
              const queryParams = [username, email, password]
              pool.query(queryString, queryParams);
              return renderWithHeader(req, res, 'login');
        } else {
          res.send("user or email has been taken")
        }
      })
  });

  return router;
};
