const query = { 
  createUser: 'INSERT INTO users(user_id,firstname,lastname,country,email,password,img,reminder,created_at) values($1,$2,$3,$4,$5,$6,$7,$8,$9)',
  text: 'SELECT * FROM users WHERE email = $1',
  update: 'UPDATE users SET password_reset_token = ($1), password_reset_token_expiry = ($2), updated_at = ($3) WHERE email = ($4)',
  resetPassword: 'UPDATE users SET password = ($1), password_reset_token = ($2), password_reset_token_expiry = ($3), updated_at = ($4) WHERE email = ($5)',
  modifyEntry: 'UPDATE entries SET title = ($1), entry = ($2), img = ($3), updated_at = ($4) WHERE entry_id = ($5)',
  createEntry: `INSERT INTO entries(entry_id, user_id, title, entry, img, date, time, created_at) values($1,$2,$3,$4,$5,$6,$7,$8)`,
  deleteEntry: `DELETE FROM entries WHERE entry_id = ($1)`,
  entriesText: 'SELECT * FROM entries',
  entryText: 'SELECT * FROM entries WHERE entry_id = $1',
};

export default query;
