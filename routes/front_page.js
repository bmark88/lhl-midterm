const router = require('express').Router();
const getCategories = require('../public/scripts/database')

module.exports = function(database) {
  router.get('/testing', (req, res) => {
    res.json({ message: "Hey Adrian" });
  });

  router.get('/unregistered', (req, res) => {
    // query db with promise, return data
    getCategories(10)
      .then(data => {
        res.json(data);
      });
  });

  return router;
};
