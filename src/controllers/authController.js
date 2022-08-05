const httpStatus = require('http-status');
const { authService } = require('../services');
const catchAsync = require('../utils/catchAsync');

const register = catchAsync(async (req, res) => {
  const data = await authService.register(req.body);
  res
    .cookie('refreshToken', data.token.refreshToken, {
      httpOnly: true,
    })
    .status(httpStatus.CREATED)
    .send({
      user: data.user,
      token: data.token.accessToken,
    });
});

const login = catchAsync(async (req, res) => {
  const data = await authService.login(req.body);
  res
    .cookie('refreshToken', data.token.refreshToken, {
      httpOnly: true,
    })
    .send({
      user: data.user,
      token: data.token.accessToken,
    });
});

const refreshTokens = catchAsync(async (req, res) => {
  const tokens = await authService.refreshTokens(req.refreshToken);
  res
    .cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
    })
    .send({ token: tokens.accessToken });
});

const sendUserInfo = catchAsync(async (req, res) => {
  const data = await authService.getUserInfo(req.user);
  res.send({ user: data.user });
});

const logout = catchAsync(async (req, res) => {
  await authService.logout(req.refreshToken);
  res.clearCookie('refreshToken').status(httpStatus.NO_CONTENT).send();
});

const forgotPassword = catchAsync(async (req, res) => {
  await authService.forgotPassword(
    req.body.email,
    req.protocol,
    req.get('host')
  );
  res.send();
});

const resetPassword = catchAsync(async (req, res) => {
  await authService.resetPassword(req.params.token, req.body);
  res.send();
});

module.exports = {
  register,
  login,
  logout,
  refreshTokens,
  sendUserInfo,
  forgotPassword,
  resetPassword,
};
