const { PrismaClient } = require('@prisma/client');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');

const prisma = new PrismaClient();

const createTopic = async (title, file) => {
  const topic = prisma.topic.create({
    data: {
      title: title,
      filename: file.name,
      data: file.data,
      md5: file.md5,
      mimetype: file.mimetype,
      size: file.size,
      encoding: file.encoding,
    },
  });
  return topic;
};

const findAll = async () => {
  const topics = prisma.topic.findMany();
  return topics;
};

const findById = async (topicId) => {
  const topic = await prisma.topic.findUnique({
    where: { id: topicId },
  });
  if (!topic) {
    throw new ApiError(
      `Topic with id ${topicId} not found`,
      httpStatus.NOT_FOUND
    );
  }
  return topic;
};

const deleteTopic = async (topicId) => {
  await findById(topicId);
  return prisma.topic.delete({
    where: { id: topicId },
  });
};

const patchTopic = async (topicId, body, files) => {
  const topic = await findById(topicId);
  const file = files && files.file ? files.file : null;
  return prisma.topic.update({
    where: { id: topicId },
    data: {
      title: body.title ? body.title : topic.title,
      filename: file ? file.name : topic.filename,
      data: file ? file.data : topic.data,
      md5: file ? file.md5 : topic.md5,
      mimetype: file ? file.mimetype : topic.mimetype,
      size: file ? file.size : topic.size,
      encoding: file ? file.encoding : topic.encoding,
    },
  });
};

module.exports = {
  createTopic,
  findAll,
  findById,
  deleteTopic,
  patchTopic,
};
