const { Role } = require('@prisma/client');
const httpStatus = require('http-status');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const { userService } = require('../services');
const ApiError = require('../utils/ApiError');

const checkRefreshToken = () => async (req, res, next) => {
  const rfrshToken = req.cookies.refreshToken;
  if (!rfrshToken) {
    return next(
      new ApiError(
        'Invalid refresh token. Authentication required',
        httpStatus.UNAUTHORIZED
      )
    );
  }
  try {
    const data = jwt.verify(rfrshToken, process.env.JWT_REFRESH_TOKEN_SECRET);
    const user = await userService.findById(data.id);
    req.user = user;
    req.refreshToken = rfrshToken;
  } catch (err) {
    return next(
      new ApiError('Authentication required', httpStatus.UNAUTHORIZED)
    );
  }
  next();
};

const protect =
  (...roles) =>
  async (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
      if (err || !user || info) {
        return next(
          new ApiError('Authentication required', httpStatus.UNAUTHORIZED)
        );
      }
      req.user = user;

      if (
        !roles.includes(user.role) ||
        (user.role === Role.USER &&
          req.params.userId &&
          user.id !== +req.params.userId)
      ) {
        return next(
          new ApiError(
            'You dont have permission to perform this action!',
            httpStatus.FORBIDDEN
          )
        );
      }
      next();
    })(req, res, next);
  };

module.exports = {
  protect,
  checkRefreshToken,
};
