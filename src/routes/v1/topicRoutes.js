const router = require('express').Router();
const topicController = require('../../controllers/topicController');
const { topicValidation } = require('../../validations');
const validate = require('../../middlewares/validate');
const auth = require('../../middlewares/auth');

router
  .route('/')
  .get(topicController.getAllTopics)
  .post(
    auth.protect('TEACHER', 'ADMIN'),
    validate(topicValidation.createTopic),
    topicController.createTopic
  );

router
  .route('/:topicId')
  .get(
    auth.protect('USER', 'TEACHER', 'ADMIN'),
    validate(topicValidation.getTopicById),
    topicController.getTopicById
  )
  .patch(
    auth.protect('TEACHER', 'ADMIN'),
    validate(topicValidation.patchTopic),
    topicController.patchTopic
  )
  .delete(
    auth.protect('TEACHER', 'ADMIN'),
    validate(topicValidation.deleteTopic),
    topicController.deleteTopic
  );

module.exports = router;
