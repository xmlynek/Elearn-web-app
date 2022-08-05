import { Role, User } from "@prisma/client";

const { PrismaClient } = require('@prisma/client');
const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');
const ApiError = require('../utils/ApiError');


const prisma = new PrismaClient();

const createUser = async (reqBody: User) => {
  if (await prisma.user.findUnique({ where: { email: reqBody.email } })) {
    throw new ApiError(
      'User with this email already exists',
      httpStatus.BAD_REQUEST
    );
  }
  const user = await prisma.user.create({
    data: {
      email: reqBody.email,
      firstname: reqBody.firstname,
      lastname: reqBody.lastname,
      password: await bcrypt.hash(reqBody.password, 12),
      role: reqBody.role ? reqBody.role : Role.USER,
    },
  });
  return user;
};

const findAll = async (userRole: Role) => {
  const users = await prisma.user.findMany();
  return users;
};

const findById = async (userId: number) => {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    throw new ApiError(
      `User with id ${userId} not found`,
      httpStatus.NOT_FOUND
    );
  }
  return user;
};

const findByEmail = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: { email: email },
  });
  if (!user) {
    throw new ApiError(
      `User with email ${email} not found`,
      httpStatus.NOT_FOUND
    );
  }
  return user;
};

const patchUserData = async (userId: number, patchBody: any) => {
  const user = await findById(userId);
  if (await bcrypt.compare(patchBody.password, user.password)) {
    return prisma.user.update({
      data: {
        email: patchBody.email ? patchBody.email : user.email,
        firstname: patchBody.firstname ? patchBody.firstname : user.firstname,
        lastname: patchBody.lastname ? patchBody.lastname : user.lastname,
        password: patchBody.newPassword
          ? await bcrypt.hash(patchBody.newPassword, 12)
          : user.password,
      },
      where: {
        id: userId,
      },
    });
  }
  throw new ApiError('Invalid password', httpStatus.BAD_REQUEST);
};

const resetPassword = async (userId: number, newPassword: string) => {
  await findById(userId);
  return await prisma.user.update({
    data: {
      password: await bcrypt.hash(newPassword, 12),
    },
    where: {
      id: userId,
    },
  });
};

// only admin can call this function
const updateUserData = async (userId: number, updateBody: User) => {
  await findById(userId);
  return prisma.user.update({
    data: {
      firstname: updateBody.firstname,
      lastname: updateBody.lastname,
      email: updateBody.email,
      role: updateBody.role,
    },
    where: { id: userId },
  });
};

const deleteUser = async (userId: number) => {
  let user = await findById(userId);
  user = await prisma.user.delete({ where: { id: userId } });
  return user;
};

module.exports = {
  createUser,
  findAll,
  findById,
  findByEmail,
  patchUserData,
  updateUserData,
  deleteUser,
  resetPassword,
};
export {};
