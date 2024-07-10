import { NextFunction, Request, Response } from "express";
import {
  createUserService,
  loginUserService,
  refreshUserTokenService,
} from "../services/userService";

export const createUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userData = req.body;
    const data = await createUserService(userData);

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
      return res.status(200).json({
        status: "success",
        message: "login success",
        refreshToken: loginBool[1],
        accessToken: loginBool[2],
      });
    }

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
      return res.status(400).json({
        status: "fail",
        message: "Bad request",
      });
    }

    const newToken = await refreshUserTokenService(refreshToken);

    return res.status(200).json({
      status: "success",
      newRefreshToken: newToken,
    });
  } catch (err) {
    next(err);
  }
};

export const updateUserPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
  } catch (err) {
    next(err);
  }
};
