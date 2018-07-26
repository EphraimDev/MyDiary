CREATE TABLE users 
(
    id SERIAL,
    user_id TEXT,
    firstname TEXT,
    lastname TEXT,
    country TEXT,
    email TEXT,
    password TEXT,
    img TEXT UNIQUE,
    reminder TEXT,
    password_reset_token TEXT,
    password_reset_token_expiry BIGINT,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    deleted_at TIMESTAMP
);

CREATE TABLE entries 
(
    id SERIAL,
    user_id TEXT,
    title TEXT,
    entry TEXT,
    date TEXT,
    time TEXT,
    img TEXT,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    deleted_at TIMESTAMP
)

INSERT INTO users (user_id, firstname, lastname, country, email, password, img, reminder, created_at)
VALUES ('116e6a3c-2528-f165-f78c-94435cea4ab5', 'Joshua', 'Drey', 'Nigeria', 'joshua@gmail.com', '$2a$08$KXYdOZAMdcDW8Ef8RCKZAeDJnMPZaCSk1JbRjlQXX1oA69ZyciytG', 'https://img.buzzfeed.com/buzzfeed-static/static/2017-03/20/16/campaign_images/buzzfeed-prod-fastlane-01/build-a-perfect-man-and-well-reveal-your-emotiona-2-24401-1490040929-0_dblbig.jpg', '06:30 AM', 'NOW()')

INSERT INTO users (user_id, firstname, lastname, country, email, password, img, reminder, created_at)
VALUES ('a7e48835-9e8c-5f03-494e-cbdbc975f5ec', 'John', 'James', 'Nigeria', 'james@gmail.com', '$2a$08$KXYdOZAMdcDW8Ef8RCKZAshduePZaCSk1JbRjlQXX1oA69ZyciytG', 'https://img.buzzfeed.com/buzzfeed-static/static/2017-03/20/16/campaign_images/buzzfeed-prod-fastlane-01/build-a-perfect-man-and-well-reveal-your-emotiona-2-24401-1490040929-0_dblbig.jpg', '06:30 AM', 'NOW()')

INSERT INTO entries (user_id, title, entry, date, time, img, created_at)
VALUES ('116e6a3c-2528-f165-f78c-94435cea4ab5', 'First Love', 'I miss my first love', '2018/07/24', '13:40:25', 'https://img.buzzfeed.com/buzzfeed-static/static/2017-03/20/16/campaign_images/buzzfeed-prod-fastlane-01/build-a-perfect-man-and-well-reveal-your-emotiona-2-24401-1490040929-0_dblbig.jpg', 'NOW()')

INSERT INTO entries (user_id, title, entry, date, time, img, created_at)
VALUES ('116e6a3c-2528-f165-f78c-94435cea4ab5', 'First Love', 'I miss my first love', '2018/07/26', '13:40:25', 'https://img.buzzfeed.com/buzzfeed-static/static/2017-03/20/16/campaign_images/buzzfeed-prod-fastlane-01/build-a-perfect-man-and-well-reveal-your-emotiona-2-24401-1490040929-0_dblbig.jpg', 'NOW()')