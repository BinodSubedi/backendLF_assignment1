import request from "supertest";
import express from "express";
import router from "../../src/routes";
import { globalErrorHandler } from "../../src/utils/error";
import env from "../../src/config";

const app = express();
app.use(express.json());
app.use("/api", router);
app.use(globalErrorHandler);

const port = env.port || 3000;
