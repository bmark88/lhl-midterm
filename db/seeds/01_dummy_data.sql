-- Fake data

-- USERS
INSERT INTO users (email, username, password, avatar_url, dark_mode)
VALUES ('a@gmail.com', 'user_a', 'password_a', 'https://picsum.photos/200', true),
('b@gmail.com', 'user_b', 'password_b', 'https://picsum.photos/200', false),
('c@gmail.com', 'user_c', 'password_c', 'https://picsum.photos/200', true);

-- CATEGORIES
INSERT INTO categories(name, thumbnail_url)
VALUES ('Dogs', 'https://picsum.photos/200/300'),
('Math', 'https://picsum.photos/200/300'),
('Science', 'https://picsum.photos/200/300');

-- PINS
INSERT INTO pins (title, description, thumbnail_url, category_id, user_id, created_at, pin_url)
VALUES ('Derp Dog', 'description', 'https://picsum.photos/200', 1, 1, '2018-1-20', 'https://www.cdc.gov/'),
('Bigger Dog', 'description', 'https://picsum.photos/200', 1, 3, '2018-2-21', 'https://www.amazon.com/'),
('Blue Doge', 'description', 'https://picsum.photos/200', 2, 3, '2018-3-15', 'https://www.youtube.com/');

-- LIKES
INSERT INTO likes (user_id, pin_id)
VALUES (3, 3),
(3, 3),
(3, 3);

-- RATINGS
INSERT INTO ratings (pin_id, user_id, score)
VALUES (3, 1, 4),
(3, 2, 5),
(3, 3, 4);

-- COMMENTS
INSERT INTO comments (pin_id, user_id, content)
VALUES (3, 1, 'content'),
(3, 2, 'content'),
(3, 3, 'content');
