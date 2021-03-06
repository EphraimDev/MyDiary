import pool from '../model/dbConfig';

const text = `DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users(
    id SERIAL NOT NULL,
    user_id TEXT PRIMARY KEY NOT NULL,
    firstname TEXT NOT NULL,
    lastname TEXT NOT NULL,
    country TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    img TEXT UNIQUE,
    reminder TEXT,
    password_reset_token TEXT,
    password_reset_token_expiry BIGINT,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    deleted_at TIMESTAMP
)`;

const users = () => {
  pool.query(text)
    .then(response => console.log(response))
    .catch(err => console.error(err));
};

export default users;
