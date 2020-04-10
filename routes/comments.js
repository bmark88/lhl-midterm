const { Pool } = require('pg');

const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'midterm'
});

// const router = require('express/').Router();
const { addCommentToDb, getPinComments } = require('../public/scripts/database');


module.exports = function(router) {

  router.post('/comments', (req, res) => {
    addCommentToDb(req.body.pin_ID, req.session.user_id, req.body.content);
  });

  router.post('/pins/:pin_id/comments', (req, res) => {
    addCommentToDb(req.body.pin_id, req.session.user_id, req.body.content)
      .then(data => {
        return res.json(data);
      });
  });

  // router.get('/pins/:pin_id/comments', (req, res) => {
  //   getPinComments(req.body.pin_id)
  //   .done(data => {
  //     console.log('this is the data ===>', data);
  //     return data;
  //   });
  // });

  return router;
};