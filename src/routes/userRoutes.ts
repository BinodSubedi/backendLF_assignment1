import { Router } from "express";
import {
  createUserController,
  loginUserController,
  tokenRefreshController,
  updateUserPasswordController,
} from "../controller/userController";
import { auth } from "../middleware/auth";

export const userRouter = Router();

export const userAuthRouter = Router();

userRouter.put("/signup", createUserController);
userRouter.post("/login", loginUserController);
userRouter.post("/refresh", tokenRefreshController);
userAuthRouter.patch("/updatePassword", auth, updateUserPasswordController);
