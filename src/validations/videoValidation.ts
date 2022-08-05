const Joi = require('joi');

const createVideo = {
  body: Joi.object()
    .keys({
      title: Joi.string().required().max(255),
      description: Joi.string().required(),
      author: Joi.string().required().max(255),
      length: Joi.number().required().min(1),
      url: Joi.string().required().max(255),
    })
    .required(),
};

const getVideoById = {
  params: Joi.object()
    .keys({
      videoId: Joi.number().required(),
    })
    .required(),
};

const updateVideo = {
  params: getVideoById.params,
  body: createVideo.body,
};

const deleteVideo = {
  params: getVideoById.params,
};

module.exports = {
  createVideo,
  getVideoById,
  updateVideo,
  deleteVideo,
};
export {};
