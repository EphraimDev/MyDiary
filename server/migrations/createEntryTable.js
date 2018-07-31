import pool from '../model/dbConfig';

const text = `DROP TABLE IF EXISTS entries CASCADE;
CREATE TABLE entries(
    id SERIAL NOT NULL,
    entry_id TEXT PRIMARY KEY NOT NULL,
    user_id TEXT REFERENCES users(user_id),
    title TEXT NOT NULL,
    entry TEXT NOT NULL,
    date TEXT NOT NULL,
    time TEXT NOT NULL,
    img TEXT,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    deleted_at TIMESTAMP
)`;

const entries = () => {
  pool.query(text)
    .then(response => console.log(response))
    .catch(err => console.error(err));
};

export default entries;
