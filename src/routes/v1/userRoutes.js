const express = require('express');
const userController = require('../../controllers/userController');
const validate = require('../../middlewares/validate');
const { userValidation } = require('../../validations');
const auth = require('../../middlewares/auth');

const router = express.Router();

router
  .route('/')
  .get(auth.protect('ADMIN', 'TEACHER'), userController.getAllUsers)
  .post(
    auth.protect('ADMIN'),
    validate(userValidation.createUser),
    userController.createUser
  );

router
  .route('/:userId')
  .get(
    auth.protect('ADMIN', 'TEACHER'),
    validate(userValidation.getUserById),
    userController.getUserById
  )
  .delete(
    auth.protect('ADMIN'),
    validate(userValidation.deleteUser),
    userController.deleteUser
  )
  .put(
    auth.protect('ADMIN'),
    validate(userValidation.updateUserData),
    userController.updateUserData
  )
  .patch(
    auth.protect('USER', 'TEACHER', 'ADMIN'),
    validate(userValidation.patchUserData),
    userController.patchUserData
  );

router
  .route('/:userId/tests')
  .get(
    auth.protect('USER', 'TEACHER', 'ADMIN'),
    validate(userValidation.getUserById),
    userController.getAllEvaluedTestsByUserId
  );

router
  .route('/:userId/tests/:evalTestId')
  .get(
    auth.protect('USER', 'TEACHER', 'ADMIN'),
    validate(userValidation.getUsersTest),
    userController.getUsersEvaluatedTest
  );

module.exports = router;
