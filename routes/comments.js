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

  router.post('/comments', (req, res) => {
    addCommentToDb(req.body.pin_ID, req.session.user_id, req.body.content);
  })
  return router;

};
