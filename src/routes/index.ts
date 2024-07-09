import { Router } from "express";
import todoRouter from "./todo";
import { userAuthRouter, userRouter } from "./userRoutes";

const router = Router();

router.use("/todo", todoRouter);
router.use("/user", userRouter);
router.use("/auth", userAuthRouter);

export default router;
