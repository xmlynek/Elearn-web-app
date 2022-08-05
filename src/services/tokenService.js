const crypto = require('crypto');
const { PrismaClient, TokenType } = require('@prisma/client');
const httpStatus = require('http-status');
const jwt = require('jsonwebtoken');
const ApiError = require('../utils/ApiError');

const prisma = new PrismaClient();

const getTokenHash = (tokenToHash) =>
  crypto.createHash('sha256').update(tokenToHash).digest('hex');

const saveTokenToDB = async (
  userId,
  tokenType,
  expirationDate,
  tokenToSave
) => {
  const token = await prisma.token.create({
    data: {
      token: getTokenHash(tokenToSave),
      type: tokenType,
      expiration_date: expirationDate,
      user_id: userId,
    },
  });
  return token;
};

// TODO
const deleteTokenFromDB = async (token) => {
  const tokenHash = getTokenHash(token);
  const foundToken = await prisma.token.findUnique({
    where: { token: tokenHash },
  });
  if (!foundToken) {
    throw new ApiError('Not Found', httpStatus.NOT_FOUND);
  }
  await prisma.token.delete({ where: { token: tokenHash } });
};

const deleteAllTokensByUserIdAndType = async (userId, tokenType) => {
  prisma.token.deleteMany({
    where: { AND: { user_id: userId, type: tokenType } },
  });
};

const getSecretAndExpirationByTokenType = (type) => {
  let secret;
  let expiration;
  switch (type) {
    case TokenType.REFRESH:
      secret = process.env.JWT_REFRESH_TOKEN_SECRET;
      expiration = process.env.JWT_REFRESH_TOKEN_EXPIRATION;
      break;
    case TokenType.ACCESS:
      secret = process.env.JWT_ACCESS_TOKEN_SECRET;
      expiration = process.env.JWT_ACCESS_TOKEN_EXPIRATION;
      break;
    case TokenType.PASSWORD_RESET:
      secret = process.env.JWT_PASSWORD_RESET_TOKEN_SECRET;
      expiration = process.env.JWT_PASSWORD_RESET_TOKEN_EXPIRATION;
      break;
    default:
      break;
  }
  return { secret, expiration };
};

const generateToken = async (userId, type) => {
  const { secret, expiration } = getSecretAndExpirationByTokenType(type);
  return jwt.sign({ id: userId }, secret, { expiresIn: expiration });
};

const createAuthTokens = async (user) => {
  const accessToken = await generateToken(user.id, TokenType.ACCESS);
  const refreshToken = await generateToken(user.id, TokenType.REFRESH);

  const expirationDate = new Date();
  expirationDate.setDate(
    expirationDate.getDate() +
      parseInt(process.env.JWT_REFRESH_TOKEN_EXPIRATION, 10)
  );
  await saveTokenToDB(user.id, TokenType.REFRESH, expirationDate, refreshToken);
  return {
    accessToken: accessToken,
    refreshToken: refreshToken,
  };
};

const createResetPasswordToken = async (userId) => {
  const resetPwdToken = await generateToken(userId, TokenType.PASSWORD_RESET);
  const encryptedPwd = getTokenHash(resetPwdToken);

  prisma.$transaction([
    prisma.token.deleteMany({
      where: { AND: { user_id: userId, type: TokenType.PASSWORD_RESET } },
    }),
    prisma.token.create({
      data: {
        type: TokenType.PASSWORD_RESET,
        user_id: userId,
        token: encryptedPwd,
        expiration_date: new Date(
          Date.now() + 10 * 60 * 1000 + 2 * 60 * 60 * 1000
        ),
      },
    }),
  ]);
  return resetPwdToken;
};

const verifyTokenInDB = async (token, type) => {
  let data;
  try {
    data = jwt.verify(token, getSecretAndExpirationByTokenType(type).secret);
  } catch (err) {
    throw new ApiError('Token has expired', 400);
  }

  const foundedToken = await prisma.token.findFirst({
    where: {
      AND: [
        {
          token: { equals: getTokenHash(token) },
          type: { equals: type },
          valid: { equals: true },
          user_id: { equals: data.id },
        },
      ],
    },
  });
  if (!foundedToken) {
    throw new ApiError('Invalid token', 400);
  }
  return foundedToken;
};

module.exports = {
  saveTokenToDB,
  generateToken,
  deleteAllTokensByUserIdAndType,
  createAuthTokens,
  verifyTokenInDB,
  deleteTokenFromDB,
  createResetPasswordToken,
};
