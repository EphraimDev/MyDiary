import bcrypt from 'bcrypt';
import randomString from 'random-string';
import Authorization from '../middlewares/auth';
import Mailer from '../utils/mailer';
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
    const {
      firstname, lastname, country, email, password, img, reminder,
    } = req.body;

    const hashedPassword = bcrypt.hashSync(password, 10);

    pool.query(queryHelper.text, [email])
      .then((users) => {
        if (users.rowCount >= 1) {
          return res.status(409).json({
            message: 'User exists already',
          });
        }
        pool.query(queryHelper.createUser, [GUID, firstname, lastname, country, email, hashedPassword, img, reminder, moment.createdAt], (err, user) => {
          pool.query(queryHelper.text, [email])
          .then((user)=>{
            Mailer.createAccountMessage(email, firstname, lastname);
            const token = Authorization.generateToken(user.rows[0]);
            return res.status(201).json({
              message: 'User created',
              success: true,
              token,
            })
          })
          .catch(err => next(err)) 
          })
            
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
    const { email, password } = req.body;

    pool.query(queryHelper.text, [email], (err, user) => {
      if (user.rowCount < 1) {
        return res.status(401).json({
          message: 'Email or password incorrect',
        });
      }

      UserController.verifyPassword(password, user.rows[0].password)
        .then((result) => {
          if (!result) {
            return res.status(401).json({
              message: 'Email or password incorrect',
            });
          }
          const token = Authorization.generateToken(user.rows[0]);
          return res.status(200).json({
            message: 'Login successful',
            success: true,
            user,
            token,
          });
        })
        .catch(err => next(err));
    });
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
    const { email } = req.body;

    pool.query(queryHelper.text, [email], (err, user) => {
      if (user.rowCount < 1) {
        return res.status(401).json({
          message: 'Email is incorrect',
        });
      }

      const token = randomString({ length: 6 });
      const duration = Date.now() + 3600000;

      pool.query(queryHelper.update, [token, duration, moment.updatedAt, email], (err, user) => {
        Mailer.forgotPasswordMail(token, email);

        return res.status(200).json({
          message: 'A reset token has been sent to your email address',
          token,
        });
      });
    });
  }

  /**
   * Sends password token to user
   * @method resetPassword
   * @memberof Users
   * @param {object} req
   * @param {object} res
   * @returns {(function|object)} Function next() or JSON object
   */
  static resetPassword(req, res) {
    const { email, password, token } = req.body;

    pool.query(queryHelper.text, [email], (err, user) => {
      if (user.rowCount < 1) {
        return res.status(401).json({
          message: 'Incorrect email',
        });
      }

      if (token !== user.rows[0].password_reset_token) {
        return res.status(400).json({
          message: 'Password reset token is invalid or has expired',
        });
      }

      const passwordResetToken = null;
      const duration = null;

      const hashedPassword = bcrypt.hashSync(password, 10);
      pool.query(queryHelper.resetPassword, [hashedPassword, passwordResetToken, duration, queryHelper.updatedAt, email], (err, user) => {
        Mailer.resetPasswordMail(email);
        const userToken = Authorization.generateToken(user);
        return res.status(200).json({
          message: 'Password has been reset successfully',
          userToken,
        });
      });
    });
  }
}

export default UserController;
