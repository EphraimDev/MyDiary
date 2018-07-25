import bcrypt from 'bcrypt';
import Authorization from '../middlewares/auth';
import Mailer from '../utils/mailer';
import randomString from 'random-string';
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

  /**
   * Login a user
   * @staticmethod
   * @param  {object} req - Request object
   * @param {object} res - Response object
   * @param {function} next - middleware next (for error handling)
   * @return {json} res.json
   */
  static login(req, res, next) {
    const { email, password} = req.body;

    pool.query(queryHelper.text, [email], (err, user) => {
        
        if (err) {
            return res.status(500).json({message: 'Could not connect to the database'})
        }
        if (user.rowCount < 1) {
            return res.status(401).json({
                message: 'Email or password incorrect'
            });
        }
        
        UserController.verifyPassword(password, user.rows[0].password)
            .then(result => {
                if (!result) {
                    return res.status(401).json({
                        message: 'Email or password incorrect'
                    });
                } else {
                        const token = Authorization.generateToken(user);
                         return res.status(200).json({
                            message: 'Login successful',
                            token
                        });
                    }
            })
            .catch(err => next(err));
    })
  }

  /**
   * @method verifyPassword
   * @memberof Users
   * @param {string} password
   * @param {string} hash
   * @return {Promise} Promise of true or false
   */
  static verifyPassword(password, hash) {
    return bcrypt.compare(password, hash);
  }

  /**
   * Sends password token to user
   * @method forgotPassword
   * @memberof Users
   * @param {object} req
   * @param {object} res
   * @returns {(function|object)} Function next() or JSON object
   */
  static forgotPassword(req, res) {
    const {email} = req.body;
 
    pool.query(queryHelper.text, [email], (err, user) => {
        if (err) {
            return res.status(500).json({message: 'Could not connect to the database'})
        }
        if (user.rowCount < 1) {
            return res.status(401).json({
                message: 'Email is incorrect'
            });
        }
        
        const token = randomString({ length: 6 });
        const duration = Date.now() + 3600000;
        

        pool.query(queryHelper.update, [token,duration,moment.updatedAt,email], (err, user) => {
            if (err) {
                return res.status(500).json({message: 'Could not connect to the database'})
            }
            Mailer.forgotPasswordMail(token, email);

            return res.status(200).json({ 
                message: 'A reset token has been sent to your email address',
                token
            });
        })

    })
}


}

export default UserController;
