import { NextFunction, Request, Response } from "express";

const { Prisma } = require('@prisma/client');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const logger = require('../config/logger');

type MyResponse = {
  statusCode: number;
  message: string;
  stack?: any;
  err?: any;
}

// function inspired by Hagop Jamkojian
const errorConverter = (err: any, req: Request, res: Response, next: NextFunction) => {
  let error = err;
  if (!(error instanceof ApiError)) {
    const statusCode =
      error.statusCode ||
      error instanceof Prisma.PrismaClientValidationError ||
      error instanceof Prisma.PrismaClientKnownRequestError ||
      error instanceof Prisma.PrismaClientUnknownRequestError
        ? httpStatus.BAD_REQUEST
        : httpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || httpStatus[statusCode];
    error = new ApiError(message, statusCode);
  }
  next(error);
};

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  let { statusCode, message } = err;
  if (process.env.NODE_ENV === 'production' && !err.isOperational) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
    logger.error(err);
  }
  res.locals.errorMessage = message;

  const response: MyResponse = {
    statusCode: statusCode,
    message: message,
  };
  if (process.env.NODE_ENV === 'development') {
    response.stack = err.stack;
    response.err = err;
    logger.error(err.stack);
  }

  res.status(statusCode).send(response);
};

module.exports = {
  errorHandler,
  errorConverter,
};
export {};