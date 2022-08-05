import { Role } from '@prisma/client';
const express = require('express');
const videoController = require('../../controllers/videoController');
const { videoValidation } = require('../../validations');
const validate = require('../../middlewares/validate');
const auth = require('../../middlewares/auth');

const router = express.Router();

router
  .route('/')
  .get(videoController.getAllVideos)
  .post(
    auth.protect(Role.ADMIN, Role.TEACHER),
    validate(videoValidation.createVideo),
    videoController.createVideo
  );

router
  .route('/:videoId')
  .get(validate(videoValidation.getVideoById), videoController.getVideoById)
  .delete(
    auth.protect(Role.ADMIN, Role.TEACHER),
    validate(videoValidation.deleteVideo),
    videoController.deleteVideo
  )
  .put(
    auth.protect(Role.ADMIN, Role.TEACHER),
    validate(videoValidation.updateVideo),
    videoController.updateVideo
  );

module.exports = router;
export {};

/**
 * @swagger
 * tags: Videos
 */

/**
 * @swagger
 * /videos:
 *   get:
 *     tags: [Videos]
 *     summary: Get all videos
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Video'
 *   post:
 *     tags: [Videos]
 *     summary: Create new video
 *     description: "Video can be created either by TEACHER or ADMIN"
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Create video request body
 *       required: true
 *       content:
 *         application/json:
 *           schema: 
 *             $ref: '#/components/schemas/Video'
 *           example:
 *             title: 'FiRa Presents: UWB at the Physical Layer'
 *             author: 'FiRa Consortium'
 *             length: 5
 *             description: 'Short video about evolution of UWB technology with IEEE 802.15.4a'
 *             url: 'https://www.youtube-nocookie.com/embed/mvO-bbU-CnU'
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Video'
 *       "400":
 *         $ref: '#/components/responses/BadRequest'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
*/

/**
 * @swagger
 * /videos/{videoId}:
 *   get:
 *     tags: [Videos]
 *     summary: Get video by id
 *     parameters:
 *     - in: path
 *       name: videoId
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
 *               $ref: '#/components/schemas/Video'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *   put:
 *     tags: [Videos]
 *     summary: Update video informations
 *     description: "Video can be updated either by TEACHER or ADMIN"
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *     - in: path
 *       name: videoId
 *       required: true
 *       schema:
 *         type: integer
 *       example: 1
 *     requestBody:
 *       required: true
 *       description: Update video request body
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Video'
 *           example:
 *             title: 'UWB Introduction'
 *             author: 'Khoail96'
 *             length: 2
 *             description: 'Short animated video about UWB technology'
 *             url: 'https://www.youtube-nocookie.com/embed/lt5Mrj9H2tg'
 *     responses:
 *       "200":
 *         description: OK - Updated video
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Video'
 *             example:
 *               id: 1
 *               title: 'UWB Introduction'
 *               author: 'Khoail96'
 *               length: 2
 *               description: 'Short animated video about UWB technology'
 *               url: 'https://www.youtube-nocookie.com/embed/lt5Mrj9H2tg'
 *       "400":
 *         $ref: '#/components/responses/BadRequest'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *   delete:
 *     tags: [Videos]
 *     summary: Delete video
 *     description: Video can be deleted either by TEACHER or ADMIN
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *     - in: path
 *       name: videoId
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