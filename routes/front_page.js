const router = require('express').Router();
const dbQuery = require('../public/scripts/database');


module.exports = function(router) {
  router.get('/testing', (req, res) => {
    return res.json({ message: "Hey Adrian" });
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
        return res.json(data);
      })
      .catch(e => e.stack);
  });

  router.post('/pins', (req, res) => {
    const userID = req.session.user_id;
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
          }
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
            }).catch(e => e.stack);
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
      });
  });

  router.post('/categories', (req, res) => {
    dbQuery.addCategoryToDb(req.body)
      .then(() => {
        return res.redirect('/categories');
      })
      .catch(e => e.stack);
  });

  router.post('/pins/delete', (req, res) => {
    dbQuery.deletePinFromDB(req.body)
      .then((result) => {
        console.log(result);

        return res.redirect('/pins');
      })
      .catch(e => e.stack);
  });

  router.post('/like', (req, res) => {
    dbQuery.addLikeToDb(req.session.user_id, req.body.pin_id)
      .then(() => {
        return res.redirect('/pins');
      })
      .catch(e => e.stack);
  });

  router.get('/category/display', (req, res) => {
    const catName = Object.keys(req.query)[0];

    dbQuery
      .catChildPins(catName)
      .then(data => {
        return res.json(data);
      });
  });

  router.get('/likes/display', (req, res) => {
    dbQuery.getUserLikes(req.session.user_id)
      .then(data => {
        return res.json(data);
      })
      .catch(e => e.stack);
  });

  router.post('/rating', (req, res) => {
    dbQuery.addRatingtoDb(req.body.value, req.session.user_id, req.body.pin)
      .then(() => {
        return res.redirect('/pins');
      }).catch(e => e.stack);
  });

  // router.get('/pins/:pin_id/comments', (req, res) => {
  //   dbQuery.getPinComments(req.body.pin_id)
  //     .done(data => {
  //       console.log('this is the data ===>', data);
  //       return data;
  //     });
  // });

  router.post('/pins/display/:search_word', (req, res) => {
    console.log('req.body ====>', req.body);
    dbQuery.getSearchedPins(req.body.searchWord)
    .then(data => {
      console.log("data at router post ------> ", data);
      return res.json(data);
    })
    .catch(e => console.error('error at front_page.js ===>', e.stack));
  })

  router.get('/pins/display/:search_word', (req, res) => {
    const searchWord = req.body.searchWord;
    dbQuery.getAllPins(searchWord)
      .then(data => {
        return res.json(data);
      })
      .catch(e => e.stack);
  });
  return router;
};
