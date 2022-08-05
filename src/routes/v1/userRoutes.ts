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
