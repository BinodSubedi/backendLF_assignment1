import { Request, Response, NextFunction } from "express";
import loggerWithNameSpace from "./logger";

export const globalErrorHandler = (
  err: GlobalError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const logger = loggerWithNameSpace("Error handler");
  logger.error(err.name);
  res.status(err.statusCode).json({
    status: "fail",
    message: err.message,
  });
};

export class GlobalError extends Error {
  public name: string;
  public stack?: string;
  public statusCode: number;
  constructor(
    name: string,
    message: string,
    statusCode: number,
    stack?: string
  ) {
    super(message);
    this.name = name;
    this.stack = stack;
    this.statusCode = statusCode;
  }
}

export class SchemaError extends GlobalError {
  constructor(
    name: string = "Schema Error",
    message: string = "Schema didn't match",
    statusCode: number = 400,
    stack?: string
  ) {
    super(name, message, statusCode, stack);
  }
}

export class TodoCreateError extends GlobalError {
  constructor(
    name: string,
    message: string = "Todo Create Error",
    statusCode: number = 500,
    stack?: string
  ) {
    super(name, message, statusCode, stack);
  }
}

export class CreateError extends GlobalError {
  constructor(
    name: string,
    message: string = "Create Error",
    statusCode: number = 500,
    stack?: string
  ) {
    super(name, message, statusCode, stack);
  }
}

export class TodoUpdateError extends GlobalError {
  constructor(
    name: string,
    message: string = "Todo Update Error",
    statusCode: number = 500,
    stack?: string
  ) {
    super(name, message, statusCode, stack);
  }
}

export class UpdateError extends GlobalError {
  constructor(
    name: string,
    message: string = "Update Error",
    statusCode: number = 500,
    stack?: string
  ) {
    super(name, message, statusCode, stack);
  }
}

export class TodoReadError extends GlobalError {
  constructor(
    name: string,
    message: string = "Todo Read Error",
    statusCode: number = 500,
    stack?: string
  ) {
    super(name, message, statusCode, stack);
  }
}

export class ReadError extends GlobalError {
  constructor(
    name: string,
    message: string = "Read Error",
    statusCode: number = 500,
    stack?: string
  ) {
    super(name, message, statusCode, stack);
  }
}

export class TodoDeleteError extends GlobalError {
  constructor(
    name: string,
    message: string = "Todo Delete Error",
    statusCode: number = 500,
    stack?: string
  ) {
    super(name, message, statusCode, stack);
  }
}

export class DeleteError extends GlobalError {
  constructor(
    name: string,
    message: string = "Delete Error",
    statusCode: number = 500,
    stack?: string
  ) {
    super(name, message, statusCode, stack);
  }
}
