const { PrismaClient } = require('@prisma/client');
const httpStatus = require('http-status');
const evaluatedTestService = require('./evaluatedTestService');
const ApiError = require('../utils/ApiError');

const prisma = new PrismaClient();

const createTest = async (body) => {
  const test = prisma.test.create({
    data: {
      position: body.position,
      title: body.title,
      questions: {
        create: body.questions.map((q) => ({
          title: q.title,
          position: q.position,
          points: q.points,
          type: q.type,
          options: {
            create: q.options.map((opt) => ({
              title: opt.title,
              isCorrect: opt.isCorrect,
            })),
          },
        })),
      },
    },
    include: { questions: { include: { options: true } } },
  });
  return test;
};

const findAll = async () => {
  const tests = prisma.test.findMany({
    include: { questions: { include: { options: true } } },
  });
  return tests;
};

const findById = async (testId) => {
  const test = await prisma.test.findUnique({
    where: { id: testId },
    include: { questions: { include: { options: true } } },
  });
  if (!test) {
    throw new ApiError(
      `Test with id ${testId} not found`,
      httpStatus.NOT_FOUND
    );
  }
  return test;
};

const deleteTest = async (testId) => {
  await findById(testId);
  return prisma.test.delete({
    where: { id: testId },
    include: { questions: { include: { options: true } } },
  });
};

const updateTest = async (testId, updateBody) => {
  await findById(testId);
  const [test] = await prisma.$transaction([
    prisma.test.update({
      where: { id: testId },
      data: {
        position: updateBody.position,
        title: updateBody.title,
        questions: {
          deleteMany: { testId: testId },
          create: updateBody.questions.map((q) => ({
            title: q.title,
            position: q.position,
            points: q.points,
            type: q.type,
            options: {
              create: q.options.map((opt) => ({
                title: opt.title,
                isCorrect: opt.isCorrect,
              })),
            },
          })),
        },
      },
      include: { questions: { include: { options: true } } },
    }),
    prisma.evaluated_Test_User.updateMany({
      data: { testUpdated: true },
      where: { testId: testId },
    }),
  ]);
  return test;
};

const evaluateTest = async (testId, userId, requestBody) => {
  const test = await findById(testId);
  return evaluatedTestService.evaluateTest(test, userId, requestBody);
};

module.exports = {
  createTest,
  findAll,
  findById,
  deleteTest,
  updateTest,
  evaluateTest,
};
