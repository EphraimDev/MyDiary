import bcrypt from 'bcrypt';
import Authorization from '../middlewares/auth';
import Mailer from '../utils/mailer';
//import randomString from 'random-string';
import pool from '../model/config';
import GUID from '../utils/guid';
import moment from '../utils/moment';
import queryHelper from '../helper/queryhelper';


/**
 * @exports
 * @class UserController
 */
class UserController {
    /**
   * Creates a new user
   * @staticmethod
   * @param  {object} req - Request object
   * @param {object} res - Response object
   * @param {function} next - middleware next (for error handling)
   * @return {json} res.json
   */
  static signup(req, res, next) {
      const {firstname,lastname,country,email,password,img,reminder} = req.body
        
        const hashedPassword = bcrypt.hashSync(password, 10);

        pool.query(queryHelper.text, [email])
        .then(user => {
            if (user.rowCount >= 1) {
                return res.status(409).json({
                    message: 'User exists already'
                });
            } else {
                pool.query(queryHelper.createUser, [GUID, firstname, lastname, country,email,hashedPassword,img,reminder,moment.createdAt])
                .then(user => {
                    Mailer.createAccountMessage(email, firstname, lastname);
                    const token = Authorization.generateToken(user);
                    return res.status(201).json({
                        message: 'User created',
                        success: true,
                        token
                    });
                })
                .catch(err => next(err));
            }
        })
        .catch(err => next(err));
  }

}

export default UserController;
