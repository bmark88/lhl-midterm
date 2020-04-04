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
const getUserWithEmail = function(email) {
  const values = [email];
  return pool.query(`
  SELECT *
  FROM users
  WHERE users.email = $1;
  `, values)
    .then(res => {
      console.log(res.rows);
      return res.rows;
    })
    .catch(err => {
      console.log('ERR =>>', err.stack);
      return err.stack;
    });
};
exports.getUserWithEmail = getUserWithEmail;

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
