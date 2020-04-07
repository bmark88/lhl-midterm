const { Pool } = require('pg');

const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'midterm'
});

// const router = require('express/').Router();
const { addCommentToDb } = require('../public/scripts/database');


module.exports = function (router) {

  console.log('inside comments.js');

  router.post('/comments', (req, res) => {
    console.log(req.body);
    console.log(req.session.user_id);
    res.send("hello");
    addCommentToDb(req.body.pin_ID, req.session.user_id, req.body.content);
  })
  return router;

};
