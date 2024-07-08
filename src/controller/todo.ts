import { Request, Response } from "express";
import { addOneTodo, getAllTodo } from "../model/todoModel";

export const getTodoList = (req: Request, res: Response) => {
  const todoList = getAllTodo();

  res.status(200).json({
    status: "success",
    list: todoList,
  });
};

export const postTodoList = (req: Request, res: Response) => {
  res.status(200).json({
    status: "success",
    list: [],
  });
};

export const putTodoList = (req: Request, res: Response) => {
  try {
    const todoVal = req.body;

    addOneTodo(req.body);

    res.status(200).json({
      status: "success",
      list: "added",
    });
  } catch (err) {
    throw err;
  }
};

export const patchTodoList = (req: Request, res: Response) => {
  res.status(200).json({
    status: "success",
    list: "updated",
  });
};

export const deleteTodoList = (req: Request, res: Response) => {
  res.status(200).json({
    status: "success",
    list: "deleted item",
  });
};
