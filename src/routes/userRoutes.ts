import { Router } from "express";
import {
  createUserController,
  loginUserController,
} from "../controller/userController";

export const userRouter = Router();

export const userAuthRouter = Router();

userRouter.put("/signup", createUserController);
userRouter.post("/login", loginUserController);
userAuthRouter.post("/refresh");
userAuthRouter.patch("/updatePassword");
