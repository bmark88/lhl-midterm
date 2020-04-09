const router = require('express').Router();
const dbQuery = require('../public/scripts/database')


module.exports = function(router) {
  router.get('/testing', (req, res) => {
    return res.json({ message: "Hey Adrian" });
  });

<<<<<<< HEAD
  router.get('/unregistered', (req, res) => {
    dbQuery.getCategories() // can take an int for limit
      .then(data => {
        return res.json(data);
        // return res.redirect('/categories'); //
      });
  });
=======
  // router.get('/unregistered', (req, res) => {
  //   dbQuery.getCategories() // can take an int for limit
  //     .then(data => {
  //       // res.json(data);
  //       res.redirect('/categories'); //
  //     });
  // });
>>>>>>> origin/navbar-login

  router.get('/pins/display', (req, res) => {
    dbQuery.getAllPins()
      .then(data => {
        return res.json(data);
<<<<<<< HEAD
      });
=======
      })
      .catch(e => e.stack);
>>>>>>> origin/navbar-login
  });

  router.post('/pins', (req, res) => {
    // console.log('FORM DATA =====>', req.body);
    // console.log('THIS IS THE SESSION COOKIE USER ID =====>',req.session.user_id);
    const userID = req.session.user_id;

    // console.log('THIS IS THE SESSION COOKIE USER ID =====>',userID)
    dbQuery.addPinToDb(req.body, userID)
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
      }).catch(e => e.stack);
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
