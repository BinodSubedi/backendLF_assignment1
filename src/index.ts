import express, { NextFunction, Request, Response } from "express";
import env from "./config";
import { GlobalError } from "./utils/error";
import router from "./routes";
import { userContainerSuperUserInit } from "./model/userModel";

const app = express();
app.use(express.json());

app.use("/api", router);

//Fall back route handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    message: "Route not found",
  });
});

//Global Error Handler
app.use((err: GlobalError, req: Request, res: Response, next: NextFunction) => {
  res.status(err.statusCode).json({
    status: "fail",
    message: err.message,
  });
});

const port = env.port || 3000;

//Initializing Default superUser
(async () => {
  await userContainerSuperUserInit();
})();

app.listen(port, () => {
  console.log(`Server is listening at port ${port}....`);
});
