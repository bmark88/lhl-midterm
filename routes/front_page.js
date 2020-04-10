const router = require('express').Router();
const dbQuery = require('../public/scripts/database')


module.exports = function(router) {
  router.get('/testing', (req, res) => {
    return res.json({ message: "Hey Adrian" });
  });

  router.get('/unregistered', (req, res) => {
    dbQuery.getCategories() // can take an int for limit
      .then(data => {
        return res.json(data);
        // return res.redirect('/categories'); //
      });
  });

  router.get('/pins/display', (req, res) => {
    dbQuery.getAllPins()
      .then(data => {
        return res.json(data);
      });
  });

  router.post('/pins', (req, res) => {
    // console.log('FORM DATA =====>', req.body);
    // console.log('THIS IS THE SESSION COOKIE USER ID =====>',req.session.user_id);
    const userID = req.session.user_id;
    let cadID;
    const pinData = {};

    dbQuery
      .getCategory(req.body.category)
      .then(data => {
        // if cat not in DB, create it
        if (data.length === 0) {
          console.log('NOT IN DB!')
          const newCat = {
            name: req.body.category,
            thumbnail_url: 'https://i.imgur.com/KvSsVVX.jpg'
          };
          dbQuery
            .addCategoryToDb(newCat)
            .then(data => {
              console.log('THIS IS DATA 1!!', data);
            });
        }
      })
      .then(data => {
        console.log('THIS IS DATA 2', data);
      });

    // get cat id

    // const catID = dbQuery.getCategory(req.body.category)
    //   .then(data => {
    //     catID = data[0].id;
    //     pinData = {
    //       ...req.body,
    //       category_id: catID
    //     }
    //   });

    // console.log('THIS IS THE SESSION COOKIE USER ID =====>',userID)

    console.log(pinData, 'PIN DATA BEFORE ENTRY');

    dbQuery.addPinToDb(pinData, userID)
      .then(() => {
        // console.log('Redirecting to /pins...')
        return res.redirect('/pins');
      })
      .catch(e => console.error('ERROR: ', e.stack));
    });

  router.post('/categories', (req, res) => {
    // console.log('FORM DATA =====>', req.body);

    // console.log('THIS IS THE SESSION COOKIE USER ID =====>',req.session.user_id);
    // const userID = req.session.user_id;
    // console.log('THIS IS THE SESSION COOKIE USER ID =====>',userID)
    dbQuery.addCategoryToDb(req.body)
      .then(() => {
        return res.redirect('/categories');
      })
      .catch(e => console.error('ERROR: ', e.stack));
  });

  router.post('/pins/delete', (req, res) => {
    dbQuery.deletePinFromDB(req.body)
      .then(() => {

        return res.render('pins');
      })
      .catch(e => console.error('ERROR: ', e.stack));
  });

  router.post('/like', (req, res) => {
    // console.log('THIS IS THE PIN ID ====>', req.body.pin_id);
    dbQuery.addLikeToDb(req.session.user_id, req.body.pin_id)
      .then(() => {
        return res.redirect('/pins');
      })
  })

  router.get('/testinglol', (req, res) => {
    const catName = Object.keys(req.query)[0];
    console.log(catName);

    dbQuery
      .catChildPins(catName)
      .then(data => {
        res.json(data);
      });
  });

  return router;
};
