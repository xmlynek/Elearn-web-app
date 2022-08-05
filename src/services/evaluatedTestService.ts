
const { PrismaClient  } = require('@prisma/client');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const {
  calculateTestMaxPoints,
  processUserTestAnswers,
} = require('../utils/testUtils');

const prisma = new PrismaClient();

const evaluateTest = async (test: any, userId: number, requestBody: any) => {
  const maxPoints = calculateTestMaxPoints(test);
  const { totalPoints, answers } = processUserTestAnswers(
    test,
    requestBody.answers
  );
  const evalTest = await prisma.evaluated_Test_User.create({
    data: {
      userId: userId,
      testId: test.id,
      maxPoints: maxPoints,
      started_at: requestBody.started_at,
      resultPoints: totalPoints,
      answers: {
        createMany: {
          data: answers,
        },
      },
    },
    include: { answers: true },
  });
  return evalTest;
};

const getAllEvaluedTestsByUserId = async (userId: number) => {
  const tests = await prisma.evaluated_Test_User.findMany({
    where: {
      userId: userId,
    },
    include: { test: true },
  });
  return tests;
};

const getEvaluatedTestById = async (evalTestId: number, userId: number) => {
  const test = await prisma.evaluated_Test_User.findUnique({
    where: { id: evalTestId },
    include: {
      answers: true,
      test: { include: { questions: { include: { options: true } } } },
    },
  });
  if (!test || (test && test.userId !== userId)) {
    throw new ApiError(
      `Evaluated test with id ${evalTestId} not found`,
      httpStatus.NOT_FOUND
    );
  }
  return test;
};

module.exports = {
  getAllEvaluedTestsByUserId,
  getEvaluatedTestById,
  evaluateTest,
};
export {};
