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

  // console.log('inside comments.js');

  router.post('/comments', (req, res) => {
    // console.log(req.body);
    // console.log(req.session.user_id);
    // res.send("hello");
    addCommentToDb(req.body.pin_id, req.session.user_id, req.body.content);
    return res.redirect('/pins')
  });

  router.post('/pins/:pin_id/comments', (req, res) => {
    addCommentToDb(req.body.pin_id, req.session.user_id, req.body.content);
    // return res.redirect('pins');
    return res.render('pins')
  })

  // router.get('/pins/:pin_id/comments', (req, res) => {
  //   addCommentToDb(req.body.pin_id, req.session.user_id, req.body.content);
  //   return res.redirect('pins');
  // })
  return router;

};
