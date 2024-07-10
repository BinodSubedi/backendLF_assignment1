import { Router } from "express";
import {
  createUserController,
  loginUserController,
  tokenRefreshController,
} from "../controller/userController";

export const userRouter = Router();

export const userAuthRouter = Router();

userRouter.put("/signup", createUserController);
userRouter.post("/login", loginUserController);
userRouter.post("/refresh", tokenRefreshController);
userAuthRouter.patch("/updatePassword");
