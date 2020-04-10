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
const dbQuery = require('../public/scripts/database');

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
//check passwords and return user if match, otherwise null
const login = function(email, password) {
  return dbQuery.getUserWithEmail(email)
    .then(user => {
      if (!user) {
        return;
      } else if (bcrypt.compareSync(password, user.password)) {
        return user;
      } else {
        return null;
      }
    });
};
//boolean
const isNewEmail = (input) => {
  return dbQuery.getUserWithEmail(input)
    .then(user => {
      if (user.id) {
      //this email is already in the db
        return false;
      }
      return true;
    });
};
//boolean
const isNewUsername = (input) => {
  return dbQuery.getUserWithUsername(input)
    .then(user => {
      if (user.id) {
      //this email is already in the db
        return false;
      }
      return true;
    });
};
//////////////////////////////

module.exports = function(router) {

  router.post("/login", (req, res) => {
    const {
      email,
      password
    } = req.body;

    login(email, password)
      .then(user => {
        console.log(user);
        if (!user) {
          return res.send("Email or password is incorrect!");
        }
        req.session.user_id = user.id;
        return res.redirect('/pins');
      })
      .catch(e => res.send(e));
  });

  router.post("/register", (req, res) => {
    const {
      username,
      email,
      password
    } = req.body;
    const hash = bcrypt.hashSync(password, 12);

    Promise.all([isNewEmail(email), isNewUsername(username)])
      .then(
        (values) => {
          if (values[0] && values[1]) {
            console.log('values ====> ',values);
            // if neither username or email matches any in db, create new user
            const queryString = `
              INSERT INTO users (username, email, password)
              VALUES ($1, $2, $3)
              `;
            const queryParams = [username, email, hash];
            pool.query(queryString, queryParams)
              .then(() => {
                return renderWithHeader(req, res, 'login');
              });
          } else {
            return res.send("user or email has been taken");
          }
        });
  });

  return router;
};


