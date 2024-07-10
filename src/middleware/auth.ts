import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const auth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { accessToken } = req.body;

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

    req.body.id = decoded.id;

    next();
  } catch (err) {
    return res.status(500).json({
      status: "fail",
      message: "Something went wrong",
    });
  }
};
