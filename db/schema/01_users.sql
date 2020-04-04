DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS pins CASCADE;
DROP TABLE IF EXISTS likes CASCADE;
DROP TABLE IF EXISTS ratings CASCADE;
DROP TABLE IF EXISTS comments CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  avatar_url VARCHAR(255) NOT NULL DEFAULT './public/images/default_avatar_silhouette.png',
  dark_mode BOOLEAN DEFAULT false
);

CREATE TABLE categories (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  thumbnail_url VARCHAR(255) NOT NULL DEFAULT './public/images/default_category_thumbnail_url.jpg'
);

CREATE TABLE pins (
  id SERIAL PRIMARY KEY NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  thumbnail_url VARCHAR(255) NOT NULL DEFAULT './public/images/default_pin_thumbnail_url.png',
  category_id INTEGER REFERENCES categories(id),
  user_id INTEGER REFERENCES users(id),
  created_at TIMESTAMP
);

CREATE TABLE likes (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  pin_id INTEGER REFERENCES pins(id) ON DELETE CASCADE
);

CREATE TABLE ratings (
  id SERIAL PRIMARY KEY NOT NULL,
  pin_id INTEGER REFERENCES pins(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  score INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE comments (
  id SERIAL PRIMARY KEY NOT NULL,
  pin_id INTEGER REFERENCES pins(id),
  user_id INTEGER REFERENCES users(id),
  content TEXT NOT NULL
);