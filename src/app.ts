import { NextFunction, Request, Response } from "express";

const express = require(`express`);
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const path = require('path');
const cookieParses = require('cookie-parser');
const fileUpload = require('express-fileupload');
const passport = require('passport');
const httpStatus = require('http-status');
const xssClean = require('xss-clean');
const compression = require('compression');

const ApiError = require('./utils/ApiError');
const {
  videoRoutes,
  authRoutes,
  testRoutes,
  topicRoutes,
  userRoutes,
  docsRoutes,
} = require('./routes/v1');
const { errorHandler, errorConverter } = require('./middlewares/errorHandler');
const jwtStrategy = require('./config/passport');

const app = express();

// middlewares
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(
  '/api',
  rateLimit({
    max: 200,
    windowMs: 10 * 60 * 1000,
    message: 'You have already sent too many requests',
  })
);

app.use(xssClean());

app.use(
  fileUpload({
    createParentPath: true,
  })
);

app.use(compression());

app.use(cookieParses());

app.use(express.json({ limit: '20kb' }));

// enable cors
// app.use(cors());
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

// passport jwt auth
passport.use('jwt', jwtStrategy);
app.use(passport.initialize());

app.use(express.static(path.resolve(__dirname, '../client/build')));

// routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/videos', videoRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/tests', testRoutes);
app.use('/api/v1/topics', topicRoutes);
app.use('/api/v1/api-docs', docsRoutes);

// send back a 404 error for any unknown api request
app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.all('*', (req: Request, res: Response, next: NextFunction) => {
  next(
    new ApiError(
      `API Endpoint ${req.originalUrl} Not Found`,
      httpStatus.NOT_FOUND
    )
  );
});

// error handling middlewares
app.use(errorConverter);
app.use(errorHandler);

module.exports = app;
export {};