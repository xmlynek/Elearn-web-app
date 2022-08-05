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
