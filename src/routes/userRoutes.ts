import { Router } from "express";
import {
  adminUserPasswordUpdate,
  createUserController,
  deleteUserController,
  getAllUser,
  loginUserController,
  tokenRefreshController,
  updateUserPasswordController,
} from "../controller/userController";
import { auth } from "../middleware/auth";
import todoRouter from "./todo";

export const userRouter = Router();

export const userAuthRouter = Router();

userAuthRouter.use("/todo", auth, todoRouter);
userRouter.put("/signup", createUserController);
userRouter.post("/login", loginUserController);
userRouter.post("/refresh", tokenRefreshController);

//Making routes that are only accesible for admin
userAuthRouter.get("/getUsers", auth, getAllUser);
userAuthRouter.delete("/deleteUser/:id", auth, deleteUserController);
userAuthRouter.patch("/updatePassword/:id", auth, adminUserPasswordUpdate);

userAuthRouter.patch("/updatePassword", auth, updateUserPasswordController);
