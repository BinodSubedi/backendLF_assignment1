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
