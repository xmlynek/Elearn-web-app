const { Role } = require('@prisma/client');
const Joi = require('joi');

const createUser = {
  body: Joi.object()
    .keys({
      firstname: Joi.string().required(),
      lastname: Joi.string().required(),
      email: Joi.string().required().email(),
      role: Joi.string().valid(Role.USER, Role.TEACHER, Role.ADMIN).required(),
      password: Joi.string()
        .required()
        .min(8)
        .custom((value, helpers) => {
          if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
            return helpers.message(
              'password must contain at least 1 letter and 1 number'
            );
          }
          return value;
        }),
    })
    .required(),
};

const getUserById = {
  params: Joi.object()
    .keys({
      userId: Joi.number().required(),
    })
    .required(),
};

const getUserByEmail = {
  params: Joi.object()
    .keys({
      email: Joi.string().email().required(),
    })
    .required(),
};

const patchUserData = {
  params: Joi.object()
    .keys({
      userId: Joi.number().required(),
    })
    .required(),
  body: Joi.object()
    .keys({
      firstname: Joi.string().optional(),
      lastname: Joi.string().optional(),
      email: Joi.string().optional().email(),
      password: Joi.string().required(),
      newPassword: Joi.string()
        .optional()
        .min(8)
        .custom((value, helpers) => {
          if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
            return helpers.message(
              'password must contain at least 1 letter and 1 number'
            );
          }
          return value;
        }),
      confirmNewPassword: Joi.alternatives().conditional('newPassword', {
        is: Joi.exist(),
        then: Joi.string().required().equal(Joi.ref('newPassword')),
        otherwise: Joi.string().optional(),
      }),
    })
    .required(),
};

const updateUserData = {
  params: Joi.object()
    .keys({
      userId: Joi.number().required(),
    })
    .required(),
  body: Joi.object()
    .keys({
      firstname: Joi.string().required(),
      lastname: Joi.string().required(),
      email: Joi.string().required().email(),
      role: Joi.string().valid(Role.USER, Role.TEACHER, Role.ADMIN).required(),
    })
    .required(),
};

const deleteUser = {
  params: getUserById.params,
};

const getUsersTest = {
  params: Joi.object()
    .keys({
      userId: Joi.number().required(),
      evalTestId: Joi.number().required(),
    })
    .required(),
};

module.exports = {
  createUser,
  getUserById,
  getUserByEmail,
  patchUserData,
  updateUserData,
  deleteUser,
  getUsersTest,
};
