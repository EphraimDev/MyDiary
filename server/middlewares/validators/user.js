/**
 * @exports
 * @class UserValidation
 */
class UserValidation {
  /**
      * Validate sign up input
      *
      * @staticmethod
      * @param  {object} req - Request object
      * @param {object} res - Response object
      * @param {function} next - middleware next (for error handling)
      * @return {json} res.json
      */
  static validateSignUp(req, res, next) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/;
    const regex = /^[a-zA-Z- ]+( [a-zA-Z- ]+)*$/i;
    const imgRegex = /^https?:\/\/(?:[a-z-]+\.)+[a-z]{2,6}(?:\/[^#?]+)+\.(?:jpe?g|gif|png)$/;
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    const {
      firstname,
      lastname,
      email,
      password,
      country,
      img,
    } = req.body;
    if (typeof firstname !== 'string' || firstname.length < 1 || regex.test(firstname) === false) {
      res.status(400).json({ message: 'First name should only contain letters' });
    }
    if (typeof lastname !== 'string' || lastname.length < 1 || regex.test(lastname) === false) {
      res.status(400).json({ message: 'Last name should only contain letters' });
    }
    if (typeof country !== 'string' || country.length < 1 || regex.test(country) === false) {
      res.status(400).send({ message: 'Country should only contain letters' });
    }
    if (typeof email !== 'string' || email.toString().trim() === '' || emailRegex.test(email) === false) {
      res.status(400).send({ message: 'Check the email' });
    }
    if (typeof password !== 'string' || password.toString().trim() === '' || passwordRegex.test(password) === false) {
      res.status(400).send({ message: 'Password must contain minimum of eight characters, at least one uppercase letter, one lowercase letter, one number and one special character' });
    }
    if (img && (!imgRegex.test(img) || img.toString().trim() === '')) {
      res.status(400).send({ message: 'Add a valid image' });
    }
    next();
  }

  /**
      * Validate login input
      *
      * @staticmethod
      * @param  {object} req - Request object
      * @param {object} res - Response object
      * @param {function} next - middleware next (for error handling)
      * @return {json} res.json
      */
  static validateLogin(req, res, next) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/;
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    const {
      email,
      password,
    } = req.body;

    if (typeof email !== 'string' || email.toString().trim() === '' || emailRegex.test(email) === false) {
      res.status(400).send({ message: 'Check the email' });
    }
    if (typeof password !== 'string' || password.toString().trim() === '' || passwordRegex.test(password) === false) {
      res.status(400).send({ message: 'Password must contin minimum of eight characters, at least one uppercase letter, one lowercase letter, one number and one special character' });
    }
    return next();
  }

  /**
      * Validate email for forgot password method
      *
      * @staticmethod
      * @param  {object} req - Request object
      * @param {object} res - Response object
      * @param {function} next - middleware next (for error handling)
      * @return {json} res.json
      */
  static validateForgotPassword(req, res, next) {
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    const {
      email,
    } = req.body;

    if (typeof email !== 'string' || email.toString().trim() === '' || emailRegex.test(email) === false) {
      res.status(400).send({ message: 'Invalid email' });
    }
    return next();
  }

  /**
      * Validate reset password method
      *
      * @staticmethod
      * @param  {object} req - Request object
      * @param {object} res - Response object
      * @param {function} next - middleware next (for error handling)
      * @return {json} res.json
      */
  static validateResetPassword(req, res, next) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/;
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    const {
      email,
      password,
      token,
    } = req.body;

    if (typeof email !== 'string' || email.toString().trim() === '' || emailRegex.test(email) === false) {
      res.status(400).send({ message: 'Check the email' });
    }
    if (typeof password !== 'string' || password.toString().trim() === '' || passwordRegex.test(password) === false) {
      res.status(400).send({ message: 'Password must contin minimum of eight characters, at least one uppercase letter, one lowercase letter, one number and one special character' });
    }
    if (!token) {
      return res.status(400).send({ message: 'Type in the correct token' });
    }
    next();
  }
}

export default UserValidation;
