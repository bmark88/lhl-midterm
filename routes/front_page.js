const router = require('express').Router();
const dbQuery = require('../public/scripts/database')


module.exports = function(router) {
  router.get('/testing', (req, res) => {
    res.json({ message: "Hey Adrian" });
  });

  router.get('/unregistered', (req, res) => {
    dbQuery.getCategories() // can take an int for limit
      .then(data => {
        res.json(data);
      });
  });

  router.get('/pins/display', (req, res) => {
    dbQuery.getAllPins()
      .then(data => {
        res.json(data);
      });
  });

  router.post('/pins', (req, res) => {
    console.log('FORM DATA =====>', req.body);
    // console.log('THIS IS THE SESSION COOKIE USER ID =====>',req.session.user_id);
    const userID = req.session.user_id;

    console.log('THIS IS THE SESSION COOKIE USER ID =====>',userID)
    dbQuery.addPinToDb(req.body, userID)
      .then(() => {
        return res.redirect('/pins');
      })
      .catch(e => console.error('ERROR: ', e.stack));
    })

  router.post('/categories', (req, res) => {
    console.log('FORM DATA =====>', req.body);
    
    // console.log('THIS IS THE SESSION COOKIE USER ID =====>',req.session.user_id);
    // const userID = req.session.user_id;
    // console.log('THIS IS THE SESSION COOKIE USER ID =====>',userID)
    dbQuery.addCategoryToDb(req.body)
      .then(() => {
        return res.redirect('/categories');
      })
      .catch(e => console.error('ERROR: ', e.stack));
  })


  return router;
};
