import { Role } from '@prisma/client';
const express = require('express');
const testController = require('../../controllers/testController');
const validate = require('../../middlewares/validate');
const { testValidation } = require('../../validations');
const auth = require('../../middlewares/auth');

const router = express.Router();

router
  .route('/')
  .get(testController.getAllTests)
  .post(
    auth.protect(Role.TEACHER, Role.ADMIN),
    validate(testValidation.createTest),
    testController.createTest
  );

router
  .route('/:testId')
  .get(
    auth.protect(Role.STUDENT, Role.TEACHER, Role.ADMIN),
    validate(testValidation.getTestById),
    testController.getTestById
  )
  .put(
    auth.protect(Role.TEACHER, Role.ADMIN),
    validate(testValidation.updateTest),
    testController.updateTest
  )
  .delete(
    auth.protect(Role.TEACHER, Role.ADMIN),
    validate(testValidation.deleteTest),
    testController.deleteTest
  );

router
  .route('/:testId/evaluate')
  .post(
    auth.protect(Role.STUDENT, Role.TEACHER, Role.ADMIN),
    validate(testValidation.evaluateTest),
    testController.evaluateTest
  );

module.exports = router;
export {};

/**
 * @swagger
 * tags: Tests
 */

/**
 * @swagger
 * /tests:
 *   get:
 *     tags: [Tests]
 *     summary: Get all tests
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Test'
 *   post:
 *     tags: [Tests]
 *     summary: Create new test
 *     description: This request can by performed only either by TEACHER or ADMIN.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Create test request body
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Test'
 *           example:
 *             title: UWB intro
 *             position: 1
 *             questions: 
 *               -
 *                 title: What does not UWB means?
 *                 position: 1
 *                 points: 1.25
 *                 type: INPUT
 *                 options:
 *                   -
 *                     title: Kebab
 *                     isCorrect: true
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Test'
 *       "400":
 *         $ref: '#/components/responses/BadRequest'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /tests/{testId}:
 *   get:
 *     tags: [Tests]
 *     summary:  Get test by id
 *     description: User has to be authenticated to perform this request and must have one of the following roles. (STUDENT, TEACHER, ADMIN)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *     - in: path
 *       name: testId
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
 *               $ref: '#/components/schemas/Test'
 *       "400":
 *         $ref: '#/components/responses/BadRequest'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *   put:
 *     tags: [Tests]
 *     summary: Update test
 *     description: Test can be updated either by TEACHER or ADMIN.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *     - in: path
 *       name: testId
 *       required: true
 *       schema:
 *         type: integer
 *       example: 1
 *     requestBody:
 *       description: Update test request body
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Test'
 *           example:
 *             title: UWB intro (update)
 *             position: 1
 *             questions: 
 *               -
 *                 title: What does not UWB means?
 *                 position: 1
 *                 points: 2.5
 *                 type: INPUT
 *                 options:
 *                   -
 *                     title: Ultra-Wideband
 *                     isCorrect: true
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Test'
 *             example:
 *               id: 1
 *               title: UWB intro (update)
 *               position: 1
 *               questions: 
 *                 -
 *                   id: 2
 *                   title: What does not UWB means?
 *                   position: 1
 *                   points: 2.5
 *                   type: INPUT
 *                   options:
 *                     -
 *                       id: 2
 *                       title: Ultra-Wideband
 *                       isCorrect: true
 *       "400":
 *         $ref: '#/components/responses/BadRequest'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *   delete:
 *     tags: [Tests]
 *     summary: Delete test
 *     description: Test can be deleted either by TEACHER or ADMIN.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *     - in: path
 *       name: testId
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
 * /tests/{testId}/evaluate:
 *   post:
 *     tags: [Tests]
 *     summary: Evaluate test
 *     description: "Test can be evaluted by all authenticated users. (STUDENT, TEACHER, ADMIN)"
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *     - in: path
 *       name: testId
 *       required: true
 *       schema:
 *         type: integer
 *       example: 1
 *     requestBody:
 *       description: Evaluate test request body
 *       required: true
 *       content:
 *         application/json:
 *           schema: 
 *             $ref: '#/components/schemas/EvaluateTestRequestBody'
 *     responses:
 *       "201": 
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EvaluatedTest'
 *       "400":
 *         $ref: '#/components/responses/BadRequest'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */          