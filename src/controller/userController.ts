import { NextFunction, Request, Response } from "express";
import { createUserService, loginUserService } from "../services/userService";

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

export const loginUserController = async (req: Request, res: Response) => {
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
    throw err;
  }
};
