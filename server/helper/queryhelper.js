const query = {
        "createUser": `INSERT INTO users(user_id,firstname,lastname,country,email,password,img,reminder,created_at) values($1,$2,$3,$4,$5,$6,$7,$8,$9)`,
        "text": `SELECT * FROM users WHERE email = $1`,
        "update":`UPDATE users SET password_reset_token = ($1), password_reset_token_expiry = ($2), updated_at = ($3) WHERE email = ($4)`,
    };

export default query;