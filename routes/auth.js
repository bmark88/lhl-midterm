const bcrypt = require('bcrypt');
const router = require('express').Router();
const getUserWithEmail = require('../server/database');

module.exports = function(database) {

  //log in
   /**
   * Check if a user exists with a given username and password
   * @param {String} email
   * @param {String} password encrypted
   */
  const login =  function(email, password) {
    return getUserWithEmail(email)
    .then(user => {
      if (bcrypt.compareSync(password, user.password)) {
        return user;
      }
      return null;
    });
  }
  exports.login = login;

  // /login
  router.post("/login", (req, res) => {
    //save the email and password that were entered into variables
    const {email, password} = req.body;
    //if either email or password form is empty, redirect to error page.
    if (!(email || password)) {
      res.send("ERROR: empty field");
      return;
    }
    login(email, password)
    .then(user => {
      if (!user) {
        res.send("no user");
      };
      // req.session.userId = user.id;
      res.send({user: {name: user.name, email: user.email, id: user.id}});
    })
    .catch(e => res.send(e));
  });
  return router;
};