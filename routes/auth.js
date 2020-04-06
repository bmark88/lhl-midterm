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

const login = function (email, password) {
  return getUserWithEmail(email)
    .then(user => {
      // if (bcrypt.compareSync(password, user.password)) {
      if (password === user.password) {
        return user;
      } else {
        return null;
      }
    });
}

const isNewEmail = (input) => {
  return getUserWithEmail(input)
  .then(user => {
    if (user.id) {
      //this email is already in the db
      console.log("isNewEmail = false");
      return false;
    }
    console.log("isNewEmail = true")
    return true;
  })
}
const isNewUsername = (input) => {
  return getUserWithUsername(input)
  .then(user => {
    if (user.id) {
      //this email is already in the db
      console.log("isNewUsername = false");
      return false;
    }
    console.log("isNewUsername = true")
    return true;
  })
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
        // res.send(user);
        // console.log('user ======>', user)
        // console.log('req.session ======>', req.session);
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
              return res.render('login');
        } else {
          res.send("user or email has been taken")
        }
      }
    )


    // cross reference email/username with db email
    // getUserWithEmail(email)
    //   .then(user => {
    //     if (email === user.email) {
    //       alreadyExists = true;
    //       return res.send('Email already exists!');
    //     }

    //     if (username === user.username) {
    //       alreadyExists = true;
    //       return res.send('Username already exists!');
    //     }

    //     return alreadyExists;
    //   })
    //   .then(
    //     // cross reference email/username with db username
    //     getUserWithUsername(username)
    //     .then(user => {
    //       if (username === user.username) {
    //         alreadyExists = true;
    //         return res.send('@@Username already exists!');
    //       }

    //       if (email === user.email) {
    //         alreadyExists = true;
    //         return res.send('@@Email already exists!');
    //       }

    //       return alreadyExists;
    //     }))
    //   .then(exists => {
    //     // if neither username or email matches any in db, create new user
    //     if (exists === false) {
    //       const queryString = `
    //       INSERT INTO users (username, email, password)
    //       VALUES ($1, $2, $3)
    //       `;
    //       const queryParams = [username, email, password]
    //       pool.query(queryString, queryParams);
    //       return res.render('login');
    //     }
    //   })
  });

  return router;
};


