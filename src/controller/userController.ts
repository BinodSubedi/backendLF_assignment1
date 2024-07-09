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
    const loginBool = loginUserService({ username, password });
  } catch (err) {
    throw err;
  }
};
