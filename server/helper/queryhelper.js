const query = {
        "createUser": `INSERT INTO users(user_id,firstname,lastname,country,email,password,img,reminder,created_at) values($1,$2,$3,$4,$5,$6,$7,$8,$9)`,
        "text": `SELECT * FROM users WHERE email = $1`,
    };

export default query;