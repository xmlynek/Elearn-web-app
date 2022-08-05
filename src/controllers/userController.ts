import {Request, Response} from "express-serve-static-core";
const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { userService, evaluatedTestService } = require('../services');

const formatUserResponse = (user: any) => ({
  id: user.id,
  firstname: user.firstname,
  lastname: user.lastname,
  email: user.email,
  role: user.role,
});

const createUser = catchAsync(async (req: Request, res: Response) => {
  const user = await userService.createUser(req.body);
  res.status(httpStatus.CREATED).send(formatUserResponse(user));
});

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const users = await userService.findAll(req.user.role);
  res.send(users.map((user: any) => formatUserResponse(user)));
});

const getUserById = catchAsync(async (req: Request, res: Response) => {
  const user = await userService.findById(+req.params.userId);
  res.send(formatUserResponse(user));
});

const getUserByEmail = catchAsync(async (req: Request, res: Response) => {
  const user = await userService.findByEmail(req.params.email);
  res.send(formatUserResponse(user));
});

const patchUserData = catchAsync(async (req: Request, res: Response) => {
  const user = await userService.patchUserData(+req.params.userId, req.body);
  res.send(formatUserResponse(user));
});

const updateUserData = catchAsync(async (req: Request, res: Response) => {
  const user = await userService.updateUserData(+req.params.userId, req.body);
  res.send(formatUserResponse(user));
});

const deleteUser = catchAsync(async (req: Request, res: Response) => {
  await userService.deleteUser(+req.params.userId);
  res.status(httpStatus.NO_CONTENT).send();
});

const getAllEvaluedTestsByUserId = catchAsync(async (req: Request, res: Response) => {
  res.send(
    await evaluatedTestService.getAllEvaluedTestsByUserId(+req.params.userId)
  );
});

const getUsersEvaluatedTest = catchAsync(async (req: Request, res: Response) => {
  res.send(
    await evaluatedTestService.getEvaluatedTestById(
      +req.params.evalTestId,
      +req.params.userId
    )
  );
});

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  getUserByEmail,
  deleteUser,
  patchUserData,
  updateUserData,
  getAllEvaluedTestsByUserId,
  getUsersEvaluatedTest,
};
export {};
