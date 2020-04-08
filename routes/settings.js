const { Pool } = require('pg');

const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'midterm'
});

const dbQuery = require('../public/scripts/database');

//do the thing

module.exports = function (router) {

  console.log('inside settings.js');

  router.post('/username', (req, res) => {
    // console.log("REQ BODY USERNAME =======>>>>>", req.body.username);
    // console.log(req.session.user_id);
    dbQuery.changeUsername(req.session.user_id, req.body.username)
    .then(user => {
      if (user === undefined) {
        res.send({error: "error"});
        return;
      }
      return res.redirect("/settings");
    })
    .catch(e => res.send(e));
  })

  router.post('/email', (req, res) => {
    console.log(req.body.email)
    dbQuery.changeEmail(req.session.user_id, req.body.email)
    .then(user => {
      if (user === undefined) {
        res.send({error: "error"});
        return;
      }
      return res.redirect("/settings");
    })
    .catch(e => res.send(e));
  })

  router.post('/upload/image', (req, res) => {
    console.log("req.body ------> ", req.body.avatar)
    dbQuery.changeAvatar(req.session.user_id, req.body.avatar)
    .then(user => {
      if (user === undefined) {
        res.send({error: "error"});
        return;
      }
      return res.redirect("/settings");
    })
    .catch(e => res.send(e));
  })

  router.post('/password', (req, res) => {
    dbQuery.changePassword(req.session.user_id, req.body.password)
    .then(user => {
      if (user === undefined) {
        res.send({error: "error"});
        return;
      }
      return res.redirect("/settings");
    })
    .catch(e => res.send(e));
  })

  router.post('/nightmode', (req, res) => {
    dbQuery.changeNightMode(req.session.user_id)
    .then(data => {
      res.json(data);
    });
  })

  return router;
}
