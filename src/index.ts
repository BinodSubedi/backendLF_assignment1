import express, { NextFunction, Request, Response } from "express";
import env from "./config";
import { GlobalError, globalErrorHandler } from "./utils/error";
import router from "./routes";
import { userContainerSuperUserInit } from "./model/userModel";
import loggerWithNameSpace from "./utils/logger";
import helmet from "helmet";
import rateLimiter from "express-rate-limit";

const app = express();

const limiter = rateLimiter({
  windowMs: 60 * 1000,
  limit: 10,
  message: "Too many requests",
});

app.use(helmet());

app.use(limiter);

app.use(express.json());

app.use("/api", router);

//Fall back route handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    message: "Route not found",
  });
});

//Global Error Handler
app.use(globalErrorHandler);

const port = env.port || 3000;

//Initializing Default superUser
(async () => {
  await userContainerSuperUserInit();
})();

app.listen(port, () => {
  console.log(`Server is listening at port ${port}....`);
});
