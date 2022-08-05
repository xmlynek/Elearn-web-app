const httpStatus = require('http-status');
const { testService } = require('../services');
const catchAsync = require('../utils/catchAsync');

const createTest = catchAsync(async (req, res) => {
  const test = await testService.createTest(req.body);
  res.status(httpStatus.CREATED).send(test);
});

const getAllTests = catchAsync(async (req, res) => {
  const tests = await testService.findAll();
  res.send(tests);
});

const getTestById = catchAsync(async (req, res) => {
  const test = await testService.findById(+req.params.testId);
  res.send(test);
});

const deleteTest = catchAsync(async (req, res) => {
  await testService.deleteTest(+req.params.testId);
  res.status(httpStatus.NO_CONTENT).send();
});

const updateTest = catchAsync(async (req, res) => {
  const test = await testService.updateTest(+req.params.testId, req.body);
  res.send(test);
});

const evaluateTest = catchAsync(async (req, res) => {
  res
    .status(httpStatus.CREATED)
    .send(
      await testService.evaluateTest(+req.params.testId, req.user.id, req.body)
    );
});

module.exports = {
  createTest,
  getAllTests,
  getTestById,
  deleteTest,
  updateTest,
  evaluateTest,
};
