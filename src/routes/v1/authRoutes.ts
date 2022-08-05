const express = require('express');
const { authController } = require('../../controllers');
const { checkRefreshToken } = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { authValidation } = require('../../validations');

const router = express.Router();

router.post(
  '/register',
  validate(authValidation.register),
  authController.register
);
router.post('/login', validate(authValidation.login), authController.login);
router.post('/logout', checkRefreshToken(), authController.logout);
router.post(
  '/refresh-token',
  checkRefreshToken(),
  authController.refreshTokens
);
router.post(
  '/forgot-password',
  validate(authValidation.forgotPassword),
  authController.forgotPassword
);
router.post(
  '/reset-password/:token',
  validate(authValidation.resetPassword),
  authController.resetPassword
);
router.get('/user', checkRefreshToken(), authController.sendUserInfo);

module.exports = router;
