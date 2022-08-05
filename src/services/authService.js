const bcrypt = require('bcryptjs');
const { TokenType } = require('@prisma/client');
const httpStatus = require('http-status');
const { userService, emailService, tokenService } = require('.');
const ApiError = require('../utils/ApiError');

const userTokenDataToJson = async (user, token) => {
  const copiedUser = {};
  await Object.assign(copiedUser, user);
  copiedUser.password = null;
  return {
    user: copiedUser,
    token: token,
  };
};

const register = async (userRequestBody) => {
  const user = await userService.createUser(userRequestBody);
  const tokens = await tokenService.createAuthTokens(user);
  return userTokenDataToJson(user, tokens);
};

const login = async (body) => {
  const { email, password } = body;
  const user = await userService.findByEmail(email);
  if (await bcrypt.compare(password, user.password)) {
    const tokens = await tokenService.createAuthTokens(user);
    return userTokenDataToJson(user, tokens);
  }
  throw new ApiError('Incorrect email or password', httpStatus.UNAUTHORIZED);
};

const logout = async (refreshToken) => {
  await tokenService.deleteTokenFromDB(refreshToken);
};

const refreshTokens = async (token) => {
  try {
    const retToken = await tokenService.verifyTokenInDB(
      token,
      TokenType.REFRESH
    );
    const user = await userService.findById(retToken.user_id);
    await tokenService.deleteTokenFromDB(token);
    return tokenService.createAuthTokens(user);
  } catch (err) {
    throw new ApiError(
      'Something went wrong. Authenticate again',
      httpStatus.UNAUTHORIZED
    );
  }
};

const getUserInfo = async (user) => userTokenDataToJson(user, null);

const forgotPassword = async (email, protocol, host) => {
  const user = await userService.findByEmail(email);
  const resetPwdToken = await tokenService.createResetPasswordToken(user.id);

  const resetURL = `${
    process.env.NODE_ENV === 'development' ? protocol : 'https'
  }://${host}/reset-password/${resetPwdToken}`;

  try {
    await emailService.sendEmail({
      subject: 'Obnovenie Hesla',
      message: `Pre obnovenie hesla kliknite na uvedený odkaz: ${resetURL}. Pokiaľ ste nežiadali o zmenu hesla, tak tento email môžete ignorovať.`,
      email: email,
    });
  } catch (err) {
    tokenService.deleteAllTokensByUserIdAndType(
      user.id,
      TokenType.PASSWORD_RESET
    );
    throw new ApiError('Error sending email, try later.', 500);
  }
  return resetPwdToken;
};

const resetPassword = async (resetPwdToken, body) => {
  const token = await tokenService.verifyTokenInDB(
    resetPwdToken,
    TokenType.PASSWORD_RESET
  );

  await userService.resetPassword(token.user_id, body.newPassword);
  await tokenService.deleteAllTokensByUserIdAndType(
    token.user_id,
    TokenType.REFRESH
  );
  await tokenService.deleteTokenFromDB(resetPwdToken);
};

module.exports = {
  login,
  refreshTokens,
  register,
  logout,
  getUserInfo,
  forgotPassword,
  resetPassword,
};
