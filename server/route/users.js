import express from 'express';
import validate from '../middlewares/validators/user';
import users from '../controller/users';

const router = express.Router();

router.post('/auth/signup', validate.validateSignUp, users.signup);
router.post('/auth/login', validate.validateLogin, users.login);
router.post('/auth/forgot-password', validate.validateForgotPassword, users.forgotPassword);
router.post('/auth/reset-password', validate.validateResetPassword, users.resetPassword);

export default router;
