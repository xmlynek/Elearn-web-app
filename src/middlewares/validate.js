const Joi = require('joi');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');

// function inspired by Hagop Jamkojian
const parseRequestKeys = (request, keys) => {
  const output = {};
  keys.forEach((key) => {
    if (Object.prototype.hasOwnProperty.call(request, key)) {
      output[key] = request[key];
    }
  });
  return output;
};

// function inspired by Hagop Jamkojian
const validate = (schema) => (req, res, next) => {
  const requestData = parseRequestKeys(req, Object.keys(schema));
  const { value, error } = Joi.compile(schema)
    .prefs({ errors: { label: 'key' }, abortEarly: false })
    .validate(requestData);

  if (error) {
    const errorMessage = error.details
      .map((details) => details.message)
      .join(', ');
    return next(new ApiError(errorMessage, httpStatus.BAD_REQUEST));
  }
  Object.assign(req, value);
  return next();
};

module.exports = validate;
