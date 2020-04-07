const router = require('express').Router();
const dbQuery = require('../public/scripts/database')


module.exports = function(router) {
  router.get('/testing', (req, res) => {
    res.json({ message: "Hey Adrian" });
  });

  router.get('/unregistered', (req, res) => {
    dbQuery.getCategories(5)
      .then(data => {
        res.json(data);
      });
  });

  router.get('/pins/display', (req, res) => {
    dbQuery.getAllPins(5)
      .then(data => {
        res.json(data);
      });
  });

  router.post('/pins', (req, res) => {
    console.log('FORM DATA =====>', req.body);
    dbQuery.addPinToDb(req.body)
      .then(() => {
        return res.redirect('/pins/display');
      })
      .catch(e => console.error('ERROR: ', e.stack));
  })
  return router;
};
