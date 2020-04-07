const { Pool } = require('pg');

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
    .catch(err => {
      console.log('ERR =>>', err.stack);
      return err.stack;
    });
};

// LIKES
/**
 * Get the table for all of the user's likes (favorited posts)
 * @param {Number} id User id.
 * @return {Promise} Returns table of all the likes a user has.
 */
const getUserLikes = function(id) {
  const values = [id];
  return pool.query(`
  SELECT *
  FROM likes
  WHERE user_id = $1;
  `, values)
    .then(res => res.rows);
};

// PINS
/**
 * Get the table for all of the pins the user has made
 * @param {String} email User email.
 * @return {Promise} A promise to user.  This returns the whole table with information regarding 1 user
 */
const getUserPins = function(id) {
  const values = [id];
  return pool.query(`
  SELECT *
  FROM pins
  WHERE user_id = $1
  `, values)
    .then(res => res.rows);
};

const getAllPins = function(limit) {
  const values = [limit];
  let queryString = `
  SELECT *
  FROM pins
  LIMIT $1;
  `;

  return pool.query(queryString, values)
    .then(res => res.rows)
    .catch(err => {
      console.log('ERR =>>', err.stack);
      return err.stack;
    });
};

// CATEGORIES
/**
 * Get the table for all of categories in the db
 * @param {String} name Category string query
 * @return {Promise} returns table with all of the categories in the DB
 */
const getCategory = function(name) {
  const values = [name];
  return pool.query(`
  SELECT *
  FROM categories
  WHERE name = $1
  `, values)
    .then(res => res.rows);
};

// Get all categories. Takes a parameter to use for taking a limit (for pagination) later
const getCategories = function(limit) {
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
    .catch(err => {
      console.log('ERR =>>', err.stack);
      return err.stack;
    });
};

// COMMENTS
/**
 * Get all the comments on a pin
 * @param {Number} id Pin id
 * @return {Promise} returns table with all of comments on a pin
 */
const getPinComments = function(id) {
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
    .catch(err => {
      console.log('ERR =>>', err.stack);
      return err.stack;
    });
};
   const addCommentToDb = (pinID, commenter, content) => {
      const values = [pinID, commenter, content];
      pool.query(`
      INSERT INTO comments(pin_id, user_id, content)
      VALUES($1, $2, $3)
      `, values);
    }

    const addPinToDb = (pinObject, ownerOfPin) => {
    const values = [pinObject.name, pinObject.description, pinObject.image, ownerOfPin, pinObject.created_at];
    const queryString = `
    INSERT INTO pins (title, description, thumbnail_url, user_id, created_at)
    VALUES ($1, $2, $3, $4, $5);
    `;
  
    return pool
      .query(queryString, values)
      .then(res => {
        console.log("Succesful DB insert",res.rows)
        return res.rows;
      })
      .catch(e => console.error('query error ====>', e.stack));
    }

    const addCategoryToDb = (categoryObject) => {
      const values = [categoryObject.name, categoryObject.thumbnail_url];
      console.log("object ======= > ", categoryObject)
      const queryString = `
      INSERT INTO categories (name, thumbnail_url)
      VALUES ($1, $2);
      `;

      return pool
        .query(queryString, values)
        .then(res => {
          console.log("Succesful DB insert",res.rows)
          return res.rows;
        })
        .catch(e => console.error('ERROR WITH CATEGORY DB ====>', e.stack));
      }

module.exports = { getUserWithEmail, getUserLikes, getUserPins, getCategory, getPinComments, getUserWithUsername, addCommentToDb, getCategories, getAllPins, addPinToDb, addCategoryToDb };
