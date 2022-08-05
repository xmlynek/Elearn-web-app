const { QuestionType } = require('@prisma/client');
const Joi = require('joi');

const createTest = {
  body: Joi.object()
    .keys({
      title: Joi.string().required().max(255),
      position: Joi.number().min(0).required(),
      questions: Joi.array()
        .items({
          title: Joi.string().required().max(255),
          position: Joi.number().min(0).required(),
          points: Joi.number().required().min(1.0),
          type: Joi.string()
            .required()
            .valid(
              QuestionType.INPUT,
              QuestionType.MULTIPLE_CHOICES,
              QuestionType.SINGLE_CHOICE
            ),
          options: Joi.array()
            .items({
              title: Joi.string().max(255).required(),
              isCorrect: Joi.boolean().required(),
            })
            .required()
            .has(
              Joi.object().keys({
                title: Joi.string().max(255).required(),
                isCorrect: Joi.boolean().required().invalid(false),
              })
            ),
        })
        .required()
        .min(1),
    })
    .required(),
};

const getTestById = {
  params: Joi.object()
    .keys({
      testId: Joi.number().required(),
    })
    .required(),
};

const updateTest = {
  params: getTestById.params,
  body: createTest.body,
};

const deleteTest = {
  params: getTestById.params,
};

const evaluateTest = {
  params: Joi.object()
    .keys({
      testId: Joi.number().required(),
    })
    .required(),
  body: Joi.object()
    .keys({
      started_at: Joi.date().required(),
      answers: Joi.array()
        .items({
          questionId: Joi.number().required(),
          type: Joi.string()
            .valid(
              QuestionType.INPUT,
              QuestionType.MULTIPLE_CHOICES,
              QuestionType.SINGLE_CHOICE
            )
            .required(),
          answer: Joi.array().items(Joi.any()).required(),
        })
        .required(),
    })
    .required(),
};

module.exports = {
  createTest,
  getTestById,
  updateTest,
  deleteTest,
  evaluateTest,
};
export {};
