-- Fake data

-- USERS
INSERT INTO users (id, email, username, password, avatar_url, dark_mode)
VALUES (1, 'a@gmail.com', 'user_a', 'password_a', 'https://picsum.photos/200', 'true'),
(2, 'b@gmail.com', 'user_b', 'password_b', 'https://picsum.photos/200', 'false'),
(3, 'c@gmail.com', 'user_c', 'password_c', 'https://picsum.photos/200', 'true');

-- PINS
INSERT INTO pins (id, title, description, thumbnail_url, category_id, user_id, created_at)
VALUES (1, 'Derp Dog', 'description', 'https://picsum.photos/200
', 1, 1, '2018-1-20'),
(2, 'Bigger Dog', 'description', 'https://picsum.photos/200
', 1, 3, '2018-2-21'),
(3, 'Blue Doge', 'description', 'https://picsum.photos/200
', 2, 3, '2018-3-15');

-- CATEGORIES
INSERT INTO categories(id, name, thumbnail_url)
VALUES (1, 'Dogs', 'https://picsum.photos/200/300
'),
(2, 'Math', 'https://picsum.photos/200/300
'),
(3, 'Science', 'https://picsum.photos/200/300
');

-- LIKES
INSERT INTO likes (id, user_id, pin_id)
VALUES (1, 3, 3),
(2, 3, 3),
(3, 3, 3);

-- COMMENTS
INSERT INTO comments (id, pin_id, user_id, content)
VALUES (1, 3, 1, 'content'),
(2, 3, 2, 'content'),
(3, 3, 3, 'content');

-- RATINGS
INSERT INTO ratings (id, pin_id, user_id, score)
VALUES (1, 3, 1, 4),
(2, 3, 2, 5),
(3, 3, 3, 4);
