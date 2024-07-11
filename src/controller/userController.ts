import { NextFunction, Request, Response } from "express";
import {
  adminDeleteUserService,
  adminUserPasswordUpdateService,
  createUserService,
  getAllUserService,
  loginUserService,
  refreshUserTokenService,
  updateUserPasswordService,
} from "../services/userService";
import {
  getAllUsersModel,
  getUserById,
  updateUserById,
  UserAccessLevel,
} from "../model/userModel";
import { StatusCodes } from "http-status-codes";
import loggerWithNameSpace from "../utils/logger";
import { log } from "console";

const logger = loggerWithNameSpace("Controller");

export const createUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userData = req.body;
    const data = await createUserService(userData);

    logger.info("Success createUserController");
    return res.status(201).json({
      status: "success",
      Created_user: data,
    });
  } catch (err) {
    next(err);
  }
};

export const loginUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, password } = req.body;
    const loginBool = await loginUserService({ username, password });

    if (loginBool[0]) {
      logger.info("Success loginUserController");
      return res.status(200).json({
        status: "success",
        message: "login success",
        refreshToken: loginBool[1],
        accessToken: loginBool[2],
      });
    }

    logger.warn("loginUserController wrong credentials");
    return res.status(400).json({
      status: "fail",
      message: "Wrong credentials",
    });
  } catch (err) {
    next(err);
  }
};

export const tokenRefreshController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { refreshToken } = req.body;

    if (refreshToken == undefined) {
      logger.warn("tokenRefreshController bad request");
      return res.status(400).json({
        status: "fail",
        message: "Bad request",
      });
    }

    const newToken = await refreshUserTokenService(refreshToken);

    logger.info("Success tokenRefreshController");
    return res.status(200).json({
      status: "success",
      newRefreshToken: newToken,
    });
  } catch (err) {
    next(err);
  }
};

export const updateUserPasswordController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId, password } = req.body;

    const requiredUser = getUserById(userId);

    if (requiredUser == undefined) {
      logger.warn("updateUserPasswordController user not found");
      return res.status(400).json({
        status: "fail",
        message: "User not found",
      });
    }

    updateUserPasswordService(userId, password, requiredUser);

    logger.info("Success updateUserPasswordController");
    return res.status(201).json({
      status: "success",
      message: "password Updated",
    });
  } catch (err) {
    next(err);
  }
};

export const getAllUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.body;

    const data = getAllUserService(userId);

    if (data == undefined) {
      logger.warn("getAllUser un-authorized request");
      return res.status(StatusCodes.FORBIDDEN).json({
        message: "Un-authorized request",
      });
    }

    logger.info("Success getAllUser");
    res.status(StatusCodes.OK).json({
      total: data.length,
      users: data,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteUserController = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.body;
    const { id } = req.params;

    if (userId == id) {
      logger.warn("deleteUserController forbidden action");
      return res.status(400).json({
        message: "Forbidden action, can't delete admin",
      });
    }

    const supposiveAdmin = getUserById(userId);

    if (supposiveAdmin?.accessLevel != UserAccessLevel.SuperUser) {
      logger.warn("Un-authorized request in deleteUserController");
      return res.status(StatusCodes.FORBIDDEN).json({
        message: "Un-authorized request",
      });
    }

    adminDeleteUserService(parseInt(id));

    logger.info("Success deleteUserController");
    res.status(StatusCodes.OK).json({
      message: "User deleted",
    });
  } catch (err) {
    next(err);
  }
};

export const adminUserPasswordUpdate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { password, userId } = req.body;

    adminUserPasswordUpdateService(parseInt(id), userId, password);

    logger.info("Success adminUserPasswordUpdate");
    res.status(StatusCodes.OK).json({
      message: "User Password updated",
    });
  } catch (err) {
    next(err);
  }
};
