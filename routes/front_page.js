const router = require('express').Router();
const dbQuery = require('../public/scripts/database')


module.exports = function(router) {
  router.get('/testing', (req, res) => {
    return res.json({ message: "Hey Adrian" });
  });

  // router.get('/unregistered', (req, res) => {
  //   dbQuery.getCategories() // can take an int for limit
  //     .then(data => {
  //       // res.json(data);
  //       res.redirect('/categories'); //
  //     });
  // });

  router.get('/pins/display', (req, res) => {
    dbQuery.getAllPins()
      .then(data => {
        return res.json(data);
      })
      .catch(e => e.stack);
  });

  router.post('/pins', (req, res) => {
    const userID = req.session.user_id;
    console.log('Data from Create New pin form =>', req.body)
    const category = req.body.category;

    // check if category exists in DB
    dbQuery
      .getCategory(category)
      .then(data => {
        // if empty => not in DB
        if (data.length === 0) {
          const newCat = {
            name: category,
            thumbnail_url: 'https://picsum.photos/200'
          };
          dbQuery.addCategoryToDb(newCat)
            .then(() => {
              dbQuery
                .getCategory(category)
                .then(data => {
                  const catID = data[0].id;
                  const pinObject = {
                    ...req.body,
                    category_id: catID
                  };
                  dbQuery.addPinToDb(pinObject, userID).then(() => {
                    res.redirect('/pins');
                  });
                });
            });
        } else {
          dbQuery
            .getCategory(category)
            .then(data => {
              const catID = data[0].id;
              const pinObject = {
                ...req.body,
                category_id: catID
              };
              dbQuery.addPinToDb(pinObject, userID).then(() => {
                res.redirect('/pins');
              });
            });
        }
      })
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

        return res.redirect('/pins');
      })
      .catch(e => console.error('ERROR: ', e.stack));
  });

  router.post('/like', (req, res) => {
    // console.log('THIS IS THE PIN ID ====>', req.body.pin_id);
    dbQuery.addLikeToDb(req.session.user_id, req.body.pin_id)
      .then(() => {
        return res.redirect('/pins');
      })
    .catch(e => e.stack);
  });

  router.get('/testinglol', (req, res) => {
    const catName = Object.keys(req.query)[0];
    console.log(catName);

    dbQuery
      .catChildPins(catName)
      .then(data => {
        res.json(data);
      });
  });

  // router.get('/likes', (req, res) => {
  //   dbQuery.getUserLikes(req.session.user_id)
  //   .then(result => {
  //     console.log('this is result for likes', result)
  //     return result;
  //   })
  // });

  router.get('/likes/display', (req, res) => {
    dbQuery.getUserLikes(req.session.user_id)
      .then(data => {
        console.log(data);
        return res.json(data);
      })
      .catch(e => e.stack);
    })

  router.post('/rating', (req, res) => {
    console.log("value ----> ", req.body.value)
    console.log("userid ----> ", req.session.user_id)
    console.log("pinid ----> ", req.body.pin)

    dbQuery.addRatingtoDb(req.body.value, req.session.user_id, req.body.pin)
    .then(() => {
      return res.redirect('/pins')
    }).catch(e => e.stack);
  })
  return router;
};
