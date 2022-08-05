import { Role } from '@prisma/client';
const router = require('express').Router();
const topicController = require('../../controllers/topicController');
const { topicValidation } = require('../../validations');
const validate = require('../../middlewares/validate');
const auth = require('../../middlewares/auth');

router
  .route('/')
  .get(topicController.getAllTopics)
  .post(
    auth.protect(Role.TEACHER, Role.ADMIN),
    validate(topicValidation.createTopic),
    topicController.createTopic
  );

router
  .route('/:topicId')
  .get(
    auth.protect(Role.STUDENT, Role.TEACHER, Role.ADMIN),
    validate(topicValidation.getTopicById),
    topicController.getTopicById
  )
  .patch(
    auth.protect(Role.TEACHER, Role.ADMIN),
    validate(topicValidation.patchTopic),
    topicController.patchTopic
  )
  .delete(
    auth.protect(Role.TEACHER, Role.ADMIN),
    validate(topicValidation.deleteTopic),
    topicController.deleteTopic
  );

module.exports = router;
export {};

/**
 * @swagger
 * tags: Topics
 */

/**
 * @swagger
 * /topics:
 *   get:
 *     tags: [Topics]
 *     summary: Get all topics
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema: 
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Topic' 
 *   post:
 *     tags: [Topics]
 *     summary: Create new topic
 *     description: "Topic can be created either by TEACHER or ADMIN"
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       description: Create topic request body
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Topic'
 *           example:
 *             title: Introduction to UWB technology
 *             filename: uwb_intro.pdf
 *             data: [1,2,3]
 *             md5: 3a56284a5df3c4062bb42a82d86f3217
 *             mimetype: application/pdf
 *             size: 241334
 *             encoding: 7bit
 *     responses:
 *       "201": 
 *         description: Created
 *         content:
 *           application/json:
 *             schema: 
 *               $ref: '#/components/schemas/Topic' 
 *       "400":
 *          $ref: '#/components/responses/BadRequest'
 *       "401":
 *          $ref: '#/components/responses/Unauthorized'
 *       "403":
 *          $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /topics/{topicId}:
 *   get:
 *     tags: [Topics]
 *     summary: Get topic by id
 *     description: "Topic can be seen by all authenticated users. (STUDENT, TEACHER, ADMIN)"
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *     - in: path
 *       name: topicId
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
 *               $ref: '#/components/schemas/Topic'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound' 
 *         
 *   patch:
 *     tags: [Topics]
 *     summary: Patch topic data
 *     description: "This action can be performed either by TEACHER or ADMIN"
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *     - in: path
 *       name: topicId
 *       required: true
 *       schema:
 *         type: integer
 *       example: 1
 *     requestBody:
 *       required: true
 *       description: Patch topic request body
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Topic'
 *           example:
 *             title: Introduction to UWB technology part 2
 *             filename: uwb_intro_2.pdf
 *             data: [1,2,3,4,5,6]
 *             md5: 3axx284a5df344062bb42a82d86f3abc
 *             mimetype: application/pdf
 *             size: 261334
 *             encoding: 7bit
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Topic'
 *             example:
 *               id: 1
 *               title: Introduction to UWB technology part 2
 *               filename: uwb_intro_2.pdf
 *               data: [1,2,3,4,5,6]
 *               md5: 3axx284a5df344062bb42a82d86f3abc
 *               mimetype: application/pdf
 *               size: 261334
 *               encoding: 7bit
 *       "400":
 *         $ref: '#/components/responses/BadRequest'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *   delete:
 *     tags: [Topics]
 *     summary: Delete topic
 *     description: "Topic can by deleted either by TEACHER or ADMIN"
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *     - in: path
 *       name: topicId
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