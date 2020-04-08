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
    dbQuery.changeUsername(req.session.user_id, req.body.username);
  })

  return router;

};
