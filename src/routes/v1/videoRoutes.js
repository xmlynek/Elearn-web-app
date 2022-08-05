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
    auth.protect('ADMIN', 'TEACHER'),
    validate(videoValidation.createVideo),
    videoController.createVideo
  );

router
  .route('/:videoId')
  .get(validate(videoValidation.getVideoById), videoController.getVideoById)
  .delete(
    auth.protect('ADMIN', 'TEACHER'),
    validate(videoValidation.deleteVideo),
    videoController.deleteVideo
  )
  .put(
    auth.protect('ADMIN', 'TEACHER'),
    validate(videoValidation.updateVideo),
    videoController.updateVideo
  );

module.exports = router;
