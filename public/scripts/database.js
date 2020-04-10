const {
  Pool
} = require('pg');

const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'midterm'
});

// GOAL: write functions that will make us get information for the whole table i.e. Users, Categories, Pins etc

// USERS
/**
 * Get a single user from db given email
 * @param {String} email User email.
 * @return {Promise} A promise to user.  This returns the whole table with information regarding 1 user
 */
const getUserWithEmail = (email) => {
  const values = [email];
  return pool.query(`
  SELECT *
  FROM users
  WHERE users.email = $1;
  `, values)
    .then(res => {
      if (res.rows.length === 0) {
        return false;
      }
      return res.rows[0];
    })
    .catch(err => err.stack);
};

// LIKES
/**
 * Get the table for all of the user's likes (favorited posts)
 * @param {Number} id User id.
 * @return {Promise} Returns table of all the likes a user has.
 */
const getUserLikes = function (id) {
  const values = [id];
  return pool.query(`
  SELECT *
  FROM likes
  JOIN pins ON (pins.id = likes.pin_id)
  WHERE likes.user_id = $1;
  `, values)
    .then(res => res.rows);
};

// PINS
/**
 * Get the table for all of the pins the user has made
 * @param {String} email User email.
 * @return {Promise} A promise to user.  This returns the whole table with information regarding 1 user
 */
const getUserPins = function (id) {
  const values = [id];
  return pool.query(`
  SELECT *
  FROM pins
  WHERE user_id = $1
  `, values)
    .then(res => res.rows);
};

const getAllPins = function (limit) {
  const values = [limit];
  let queryString = `
  SELECT *
  FROM pins
  LIMIT $1;
  `;

  return pool.query(queryString, values)
    .then(res => res.rows)
    .catch(err => err.stack);
};

// CATEGORIES
/**
 * Get the table for all of categories in the db
 * @param {String} name Category string query
 * @return {Promise} returns table with all of the categories in the DB
 */
const getCategory = function (name) {
  const values = [name];
  return pool.query(`
  SELECT *
  FROM categories
  WHERE name = $1
  `, values)
    .then(res => res.rows);
};

// Get all categories. Takes a parameter to use for taking a limit (for pagination) later
const getCategories = function (limit) {
  let queryString = `
  SELECT *
  FROM categories
  `;

  if (limit) {
    queryString += ` LIMIT ${limit}`
  }
  queryString += ';';
  return pool.query(queryString)
    .then(res => res.rows)
    .catch(err => err.stack);
};

// COMMENTS
/**
 * Get all the comments on a pin
 * @param {Number} id Pin id
 * @return {Promise} returns table with all of comments on a pin
 */
const getPinComments = function (id) {
  const values = [id];
  return pool.query(`
  SELECT *
  FROM comments
  JOIN pins ON comments.pin_id = $1
  `)
    .then(res => res.rows);
};

const getUserWithUsername = (username) => {
  const values = [username];
  return pool.query(`
  SELECT *
  FROM users
  WHERE users.username = $1;
  `, values)
    .then(res => {
      if (res.rows.length === 0) {
        return false;
      }
      return res.rows[0];
    })
    .catch(err => err.stack);
};

const addCommentToDb = (pinID, commenter, content) => {
  const values = [pinID, commenter, content];
  pool.query(`
      INSERT INTO comments(pin_id, user_id, content)
      VALUES($1, $2, $3)
      `, values);
}

const addPinToDb = (pinObject, ownerOfPin) => {
  const values = [pinObject.name, pinObject.description, pinObject.image, 1, ownerOfPin, pinObject.created_at, pinObject.url];
  const queryString = `
    INSERT INTO pins (title, description, thumbnail_url, category_id, user_id, created_at, pin_url)
    VALUES ($1, $2, $3, $4, $5, $6, $7);
    `;

  return pool
    .query(queryString, values)
    .then(res => {
      return res.rows;
    })
    .catch(e => e.stack);
}

const addCategoryToDb = (categoryObject) => {
  const values = [categoryObject.name, categoryObject.thumbnail_url];
  const queryString = `
      INSERT INTO categories (name, thumbnail_url)
      VALUES ($1, $2);
      `;

  return pool
    .query(queryString, values)
    .then(res => {
      return res.rows;
    })
    .catch(e => e.stack);
}
const deletePinFromDB = (pinObject, ownerOfPin) => {
  const queryString = `
        DELETE FROM pins
        WHERE id = $1;
        `;

  const queryParams = [pinObject.pin_id];
  return pool
    .query(queryString, queryParams)
    .then(res => {
      return res.rows;
    })
    .catch(e => e.stack);
}

//SETTINGS

const changeUsername = (userID, newUsername) => {
  //query to check if the username belongs to another user
  const isNewUsername = (input) => {
    return getUserWithUsername(input)
      .then(user => {
        if (user.id) {
          //this email is already in the db;
          return false;
        }
        return true;
      })
  }
  //find out if the username is new
  return isNewUsername(newUsername)
    .then(res => {
      if (!res) {
        //the username is taken
        return res.send("username already taken");
      }
      return pool.query(`
      UPDATE users
      SET username = $1
      WHERE id = $2;
      `, [newUsername, userID]);
    }).catch(e => e.stack)
}

const changeEmail = (userID, email) => {
  const isNewEmail = (input) => {
    return getUserWithEmail(input)
      .then(user => {
        if (user.id) {
          //this email is already in the db
          return false;
        }
        return true;
      }).catch(e => e.stack)
  }
  return isNewEmail(email)
    .then(isNew => {
      if (!isNew) {
        res.send({
          error: "email taken"
        });
        return;
      }
      return pool.query(`
      UPDATE users
      SET email = $1
      WHERE id = $2;
      `, [email, userID]);
    }).catch(e => e.stack);
}

const changeAvatar = (userID, avatar) => {
  return pool.query(`
  UPDATE users
  SET avatar_url = $1
  WHERE id = $2;
  `, [avatar, userID]);
}

const changePassword = (userID, password) => {
  return pool.query(`
  UPDATE users
  SET password = $1
  WHERE id = $2;
  `, [password, userID]);
}
//get the users current night-mode preference and set to opposite
const changeNightMode = (userid) => {
  return pool.query(`
  SELECT dark_mode
  FROM users
  WHERE id = $1;`, [userid])
    .then(res => {
      newPref = !(res.rows[0].dark_mode);
      return pool.query(`
    UPDATE users
    SET dark_mode = $1
    WHERE id = $2;`, [newPref, userid]);
    })
    .catch(e => e.stack);
}

//get the users current night-mode preference and set to opposite
const addLikeToDb = (userid, pin_id) => {
  return pool.query(`
    SELECT * FROM likes
    WHERE user_id = $1
    AND pin_id = $2;
  `, [userid, pin_id])
    .then(result => {
      if (result.rowCount) {
        return pool.query(`
          DELETE FROM likes 
          WHERE user_id = $1
          AND pin_id = $2
        `, [userid, pin_id])
      }

      return pool.query(`
        INSERT INTO likes (user_id, pin_id)
        VALUES ($1, $2);`, [userid, pin_id])
    })
    .then(result => {
      return result;
    })
};

const catChildPins = function (data) {
  let queryString = `
  SELECT *
  FROM categories
  JOIN pins ON categories.id = pins.category_id
  WHERE categories.name LIKE '%${data}%';
  `;

  return pool
    .query(queryString)
    .then(res => res.rows);
};
const addRatingtoDb = (rating, userID, pinID) => {
  //check if this user has already rated this post
  return pool.query(`
  SELECT id
  FROM ratings
  WHERE user_id = $1 AND pin_id = $2;`, [userID, pinID])
    .then(result => {
      if (result.rowCount) {
        //if this user already rated this post, updat their rating
        return pool.query(`
      UPDATE ratings
      SET score = $1
      WHERE user_id = $2 AND pin_id = $3;`, [rating, userID, pinID])
      }
      //if user has not rated this post, add new row
      const queryParams = [pinID, userID, rating];
      const queryString = `
    INSERT INTO ratings(pin_id, user_id, score)
    VALUES ($1, $2, $3);
    `
      return pool.query(queryString, queryParams)
    }).catch(e => e.stack);
}

module.exports = {
  getUserWithEmail,
  getUserLikes,
  getUserPins,
  getCategory,
  getPinComments,
  getUserWithUsername,
  addCommentToDb,
  getCategories,
  getAllPins,
  addPinToDb,
  addCategoryToDb,
  changeUsername,
  changeEmail,
  changeAvatar,
  changePassword,
  deletePinFromDB,
  changeNightMode,
  addLikeToDb,
  catChildPins,
  addRatingtoDb
};
