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
    const userID = req.session.user_id;

    dbQuery
      .getCategories(req.body.category)
      .then(data => {

        // if not in DB
        if (data.length === 0) {
          console.log('Category not in DB...')

          const newCat = {
            name: req.body.category,
            thumbnail_url: 'https://i.imgur.com/KvSsVVX.jpg'
          };

          dbQuery
            .addCategoryToDb(newCat)
            .then(() => {
              // const catID =
              // dbQuery.addPinToDb(,_);
            });

        // if in DB
        } else {
          console.log('Category in DB...');
          dbQuery.getCategory(req.body.category)
            .then(data => {
              const catID = data[0].id;
              const pinData = {
                ...req.body,
                category_id: catID
              };
              dbQuery.addPinToDb(pinData, userID)
              .then(
                res.redirect('/pins');
              );
            });
          }
      });
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
