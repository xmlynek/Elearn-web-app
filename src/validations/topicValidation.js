const Joi = require('joi');

const createTopic = {
  body: Joi.object()
    .keys({
      title: Joi.string().required().max(255),
    })
    .required(),
  files: Joi.object()
    .keys({
      file: Joi.object()
        .keys({
          name: Joi.string().required(),
          data: Joi.any().required(),
          size: Joi.number().required(),
          mimetype: Joi.string().required(),
          encoding: Joi.string().required(),
          md5: Joi.string().required(),
        })
        .unknown()
        .required(),
    })
    .required(),
};

const getTopicById = {
  params: Joi.object()
    .keys({
      topicId: Joi.number().required(),
    })
    .required(),
};

const patchTopic = {
  params: Joi.object()
    .keys({
      topicId: Joi.number().required(),
    })
    .required(),
  body: Joi.object()
    .keys({
      title: Joi.string().max(255).optional(),
    })
    .optional(),
  files: Joi.object()
    .keys({
      file: Joi.object()
        .keys({
          name: Joi.string().required(),
          data: Joi.any().required(),
          size: Joi.number().required(),
          mimetype: Joi.string().required(),
          encoding: Joi.string().required(),
          md5: Joi.string().required(),
        })
        .unknown(),
    })
    .optional()
    .allow(null),
};

const deleteTopic = {
  params: getTopicById.params,
};

module.exports = {
  createTopic,
  getTopicById,
  patchTopic,
  deleteTopic,
};
