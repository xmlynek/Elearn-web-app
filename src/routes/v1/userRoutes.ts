import { Role } from '@prisma/client';
const express = require('express');
const userController = require('../../controllers/userController');
const validate = require('../../middlewares/validate');
const { userValidation } = require('../../validations');
const auth = require('../../middlewares/auth');

const router = express.Router();

router
  .route('/')
  .get(auth.protect(Role.ADMIN, Role.TEACHER), userController.getAllUsers)
  .post(
    auth.protect(Role.ADMIN),
    validate(userValidation.createUser),
    userController.createUser
  );

router
  .route('/:userId')
  .get(
    auth.protect(Role.ADMIN, Role.TEACHER),
    validate(userValidation.getUserById),
    userController.getUserById
  )
  .delete(
    auth.protect(Role.ADMIN),
    validate(userValidation.deleteUser),
    userController.deleteUser
  )
  .put(
    auth.protect(Role.ADMIN),
    validate(userValidation.updateUserData),
    userController.updateUserData
  )
  .patch(
    auth.protect(Role.STUDENT, Role.TEACHER, Role.ADMIN),
    validate(userValidation.patchUserData),
    userController.patchUserData
  );

router
  .route('/:userId/tests')
  .get(
    auth.protect(Role.STUDENT, Role.TEACHER, Role.ADMIN),
    validate(userValidation.getUserById),
    userController.getAllEvaluedTestsByUserId
  );

router
  .route('/:userId/tests/:evalTestId')
  .get(
    auth.protect(Role.STUDENT, Role.TEACHER, Role.ADMIN),
    validate(userValidation.getUsersTest),
    userController.getUsersEvaluatedTest
  );

module.exports = router;
export {};


/**
 * @swagger
 * tags: Users
 */

/**
 * @swagger
 * /users:
 *   get:
 *     tags: [Users]
 *     summary: Get all users
 *     description: Only TEACHER or ADMIN can get list of all users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *   post:
 *     tags: [Users]
 *     summary: Create new user
 *     description: Only ADMIN can create new user
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Create user request body
 *       required: true
 *       content:
 *         application/json:
 *           schema: 
 *             $ref: '#/components/schemas/User'
 *           example:
 *             firstname: Andrew
 *             lastname: Kebab
 *             email: andrew.kebab@email.com
 *             password: password1
 *             role: STUDENT
 *     responses: 
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       "400":
 *         $ref: '#/components/responses/BadRequest'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /users/{userId}:
 *   get:
 *     tags: [Users]
 *     summary: Get user by id
 *     description: Either TEACHER or ADMIN can perform this request
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *     - in: path
 *       name: userId
 *       required: true
 *       schema:
 *         type: integer
 *       example: 1
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       "400":
 *         $ref: '#/components/responses/BadRequest'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *   put:
 *     tags: [Users]
 *     summary: Update user
 *     description: Only ADMIN can change user's data
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *     - in: path
 *       name: userId
 *       required: true
 *       schema:
 *         type: integer
 *       example: 1
 *     requestBody:
 *       description: Update user request body
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *           example:
 *             firstname: Andrew
 *             lastname: Kebabos
 *             email: andrew.kebabos@email.com
 *             role: ADMIN
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *             example:
 *               id: 1
 *               firstname: Andrew
 *               lastname: Kebabos
 *               password: password1
 *               email: andrew.kebabos@email.com
 *               role: ADMIN
 *       "400":
 *         $ref: '#/components/responses/BadRequest'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *   patch:
 *     tags: [Users]
 *     summary: Patch user data
 *     description: User with any role can patch only his own data, not others.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *     - in: path
 *       name: userId
 *       required: true
 *       schema:
 *         type: integer
 *       example: 1
 *     requestBody:
 *       description: Update user request body
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstname:
 *                 type: string
 *               lastname:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *                 format: password
 *               newPassword:
 *                 type: string
 *                 format: password
 *                 minLength: 8
 *                 description: At least one number and one letter
 *               confirmNewPassword:
 *                 type: string
 *                 format: password
 *                 description: Must match new password above
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       "400":
 *         $ref: '#/components/responses/BadRequest'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *   delete:
 *     tags: [Users]
 *     summary: Delete user
 *     description: Only ADMIN can delete other users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *     - in: path
 *       name: userId
 *       required: true
 *       schema:
 *         type: integer
 *       example: 1
 *     responses:
 *       "204":
 *         description: No Content
 *       "400":
 *         $ref: '#/components/responses/BadRequest'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * /users/{userId}/tests:
 *   get:
 *     tags: [Users]
 *     summary: Get all evaluted tests for given user
 *     description: Every authenticated user with any role can perform this request
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *     - in: path
 *       name: userId
 *       required: true
 *       schema:
 *         type: integer
 *       example: 1
 *     responses: 
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/EvaluatedTest'
 *             example:
 *               -
 *                 id: 1
 *                 started_at: '2022-08-01T20:07:07.000Z'
 *                 finished_at: '2022-08-01T20:07:23.372Z'
 *                 maxPoints: 5
 *                 resultPoints: 5
 *                 testId: 1
 *                 testUpdated: false
 *                 userId: 1
 *                 test: 
 *                   id: 1
 *                   position: 1
 *                   title: UWB intro
 *       "400":
 *         $ref: '#/components/responses/BadRequest'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * /users/{userId}/tests/{evalTestId}:
 *   get:
 *     tags: [Users]
 *     summary: Get evaluted test with given id for given user
 *     description: Each authenticated user with any role can perform this request
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *     - in: path
 *       name: userId
 *       required: true
 *       schema:
 *         type: integer
 *       example: 1
 *     - in: path
 *       name: evalTestId
 *       required: true
 *       schema:
 *         type: integer
 *       example: 1
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EvaluatedTest'
 *             example:
 *               id: 1
 *               started_at: '2022-08-01T20:07:07.000Z'
 *               finished_at: '2022-08-01T20:07:23.372Z'
 *               maxPoints: 5
 *               resultPoints: 5
 *               testId: 1
 *               testUpdated: false
 *               userId: 1
 *               answers:
 *                 - 
 *                   id: 1
 *                   finishedTestId: 1
 *                   questionId: 1
 *                   points: 5
 *                   full_answer: UWB
 *                   isCorrect: true
 *               test:
 *                 id: 1
 *                 title: UWB intro
 *                 position: 1
 *                 questions:
 *                   -
 *                     id: 1
 *                     title: Abbreviation of Ultra-Wideband
 *                     position: 1
 *                     points: 5
 *                     type: INPUT
 *                     options:
 *                       -
 *                         id: 1
 *                         title: UWB
 *                         isCorrect: true
 *       "400":
 *         $ref: '#/components/responses/BadRequest'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */