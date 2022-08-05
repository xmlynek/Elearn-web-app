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
