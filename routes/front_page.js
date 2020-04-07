const router = require('express').Router();
const dbQuery = require('../public/scripts/database')


module.exports = function(database) {
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

  return router;
};
