const httpStatus = require('http-status');
const { topicService } = require('../services');
const catchAsync = require('../utils/catchAsync');

const createTopic = catchAsync(async (req, res) => {
  const topic = await topicService.createTopic(req.body.title, req.files.file);
  res.status(httpStatus.CREATED).send(topic);
});

const getAllTopics = catchAsync(async (req, res) => {
  const topics = await topicService.findAll();
  res.send(topics);
});

const getTopicById = catchAsync(async (req, res) => {
  const topic = await topicService.findById(+req.params.topicId);
  res.send(topic);
});

const deleteTopic = catchAsync(async (req, res) => {
  await topicService.deleteTopic(+req.params.topicId);
  res.status(httpStatus.NO_CONTENT).send();
});

const patchTopic = catchAsync(async (req, res) => {
  const topic = await topicService.patchTopic(
    +req.params.topicId,
    req.body,
    req.files
  );
  res.send(topic);
});

module.exports = {
  createTopic,
  getAllTopics,
  getTopicById,
  deleteTopic,
  patchTopic,
};
