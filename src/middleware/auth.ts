import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { json } from "stream/consumers";

export const auth = (req: Request, res: Response, next: NextFunction) => {
  try {
    // const { accessToken } = req.body;

    const tokenRaw = req.headers.authorization;

    if (tokenRaw == undefined) {
      return res.status(400).json({
        message: "No Bearer token provided",
      });
    }

    const accessToken = tokenRaw.split(" ")[1];

    const decoded: any = jwt.decode(accessToken);

    if (decoded == undefined || decoded == null) {
      return res.status(500).json({
        status: "fail",
        message: "failed to decode jwt token",
      });
    }

    if (decoded.exp < Date.now() / 1000) {
      return res.status(400).json({
        status: "fail",
        message: "Token already expired",
      });
    }

    req.body.userId = decoded.id;

    next();
  } catch (err) {
    return res.status(500).json({
      status: "fail",
      message: "Something went wrong",
    });
  }
};
