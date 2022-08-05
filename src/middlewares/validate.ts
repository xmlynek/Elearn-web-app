import { NextFunction, Request, Response } from "express";
import { Schema } from "joi";

const Joi = require('joi');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');

// function inspired by Hagop Jamkojian
const parseRequestKeys = (request: any, keys: string[]) => {
  const output: any = {};
  keys.forEach((key) => {
    if (Object.prototype.hasOwnProperty.call(request, key)) {
      output[key] = request[key];
    }
  });
  return output;
};

// function inspired by Hagop Jamkojian
const validate = (schema: Schema) => (req: Request, res: Response, next: NextFunction) => {
  const requestData = parseRequestKeys(req, Object.keys(schema));
  const { value, error } = Joi.compile(schema)
    .prefs({ errors: { label: 'key' }, abortEarly: false })
    .validate(requestData);

  if (error) {
    const errorMessage = error.details
      .map((details: any) => details.message)
      .join(', ');
    return next(new ApiError(errorMessage, httpStatus.BAD_REQUEST));
  }
  Object.assign(req, value);
  return next();
};

module.exports = validate;
