import pool from '../model/dbConfig';
import queryHelper from '../helper/queryhelper';

const validToken = () => {
    pool.query(queryHelper.text, ['abgf@yahoo.com'], (err, user) => {
        //console.log(user);
        const token = user.rows[0].password_reset_token;
        console.log(token);
            return token
    })
}

const resetUser = validToken();
console.log(resetUser);
export default resetUser;