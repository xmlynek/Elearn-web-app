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

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     tags: [Auth]
 *     summary: "Register as student"
 *     operationId: "register"
 *     requestBody:
 *       description: "Registration request body"
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Registration'
 *     responses:
 *       "201":
 *         description: "Created"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: "#/components/schemas/User"
 *                 token:
 *                   $ref: "#/components/schemas/Token"
 *         headers:
 *           Set-Cookie:
 *             description: >
 *               Contains the http only cookie named `refreshToken`.
 *               You need to include this cookie in subsequent requests.
 *             schema:
 *               type: string
 *             example: refreshToken=abcde12345; Path=/; HttpOnly
 *       '400':
 *         $ref: '#/components/responses/BadRequest'
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: "Log in"
 *     operationId: "login"
 *     requestBody:
 *       description: "Login request body"
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Login"
 *     responses:
 *       "200":
 *         description: "Log in was successful"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: "#/components/schemas/User"
 *                 token:
 *                   $ref: "#/components/schemas/Token"
 *         headers:
 *           Set-Cookie:
 *             description: >
 *               Contains the http only cookie named `refreshToken`.
 *               You need to include this cookie in subsequent requests.
 *             schema:
 *               type: string
 *             example: refreshToken=abcde12345; Path=/; HttpOnly
 *       "400":
 *         $ref: '#/components/responses/BadRequest'
 *       "404":
 *         $ref: '#/components/responses/EmailNotFound'
 */

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     tags: [Auth]
 *     summary: "Log out"
 *     operationId: "logout"
 *     parameters:
 *     - in: "cookie"
 *       name: "refreshToken"
 *       description: "Works only with httpOnly cookies"
 *       schema:
 *         $ref: '#/components/schemas/TokenString'
 *     responses:
 *       "204":
 *         description: "Logout successfully"
 *         headers:
 *           Set-Cookie:
 *             description: >
 *               Removes http only cookie `refreshToken`.
 *             schema:
 *               type: string
 *             example: refreshToken=; Path=/; HttpOnly
 *       "401":
 *         $ref: '#/components/responses/InvalidRefreshToken'
 */

/**
 * @swagger
 * /auth/refresh-token:
 *   post:
 *     tags: [Auth]
 *     summary: "Refresh both tokens"
 *     operationId: "refresh-token"
 *     parameters:
 *     - in: "cookie"
 *       name: "refreshToken"
 *       description: "Works only with httpOnly cookies"
 *       schema:
 *          $ref: '#/components/schemas/TokenString'
 *     responses:
 *       "200":
 *         description: "OK"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Token'
 *         headers:
 *           Set-Cookie:
 *             description: >
 *               Contains the http only cookie named `refreshToken`.
 *               You need to include this cookie in subsequent requests.
 *             schema:
 *               type: string
 *             example: refreshToken=abcde12345; Path=/; HttpOnly
 *       "401":
 *         $ref: '#/components/responses/InvalidRefreshToken'
 */

/**
 * @swagger
 * /auth/forgot-password:
 *   post:
 *     tags: [Auth]
 *     summary: "Send reset password email"
 *     operationId: "forgot-password"
 *     requestBody:
 *       description: "Forgot password request body"
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/ForgotPassword"
 *     responses:
 *       "200":
 *         description: "OK"
 *       "400":
 *         $ref: '#/components/responses/BadRequest'
 *       "404":
 *         $ref: '#/components/responses/EmailNotFound'
 */

/**
 * @swagger
 * /auth/reset-password/{token}:
 *   post:
 *     tags: [Auth]
 *     summary: "Reset password"
 *     operationId: "reset-password"
 *     parameters:
 *     - name: "token"
 *       in: "path"
 *       required: true
 *       description: "Generated reset token"
 *       schema:
 *         $ref: '#/components/schemas/TokenString'
 *     requestBody:
 *       description: "Reset password request body"
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/ResetPassword"
 *     responses:
 *       "200":
 *         description: "OK"
 *       "400":
 *         $ref: '#/components/responses/TokenHasExpired'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * /auth/user:
 *   get:
 *     tags: [Auth]
 *     summary: Get your user data
 *     operationId: 'user'
 *     parameters:
 *     - in: "cookie"
 *       name: "refreshToken"
 *       description: "Works only with httpOnly cookies"
 *       schema:
 *         $ref: "#/components/schemas/TokenString"
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 */
