const Joi = require('joi');

const register = {
  body: Joi.object()
    .keys({
      firstname: Joi.string().required(),
      lastname: Joi.string().required(),
      email: Joi.string().required().email(),
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
      confirmPassword: Joi.string().required().equal(Joi.ref('password')),
    })
    .required(),
};

const login = {
  body: Joi.object()
    .keys({
      email: Joi.string().required(),
      password: Joi.string().required(),
    })
    .required(),
};

const forgotPassword = {
  body: Joi.object()
    .keys({
      email: Joi.string().email().required(),
    })
    .required(),
};

const resetPassword = {
  params: Joi.object()
    .keys({
      token: Joi.string().required(),
    })
    .required(),
  body: Joi.object()
    .keys({
      newPassword: Joi.string()
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
      confirmNewPassword: Joi.string().required().equal(Joi.ref('newPassword')),
    })
    .required(),
};

module.exports = {
  register,
  login,
  resetPassword,
  forgotPassword,
};
