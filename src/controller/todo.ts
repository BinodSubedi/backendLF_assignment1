import { Request, Response } from "express";
import { addOneTodo, getAllTodo } from "../model/todoModel";
import { deleteTodoService, finishTodoService } from "../services/todoServices";

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

export const updateTitle = (req: Request, res: Response) => {
  res.status(200).json({
    status: "success",
    list: "updated",
  });
};

export const updateDescription = (req: Request, res: Response) => {
  res.status(200).json({
    status: "success",
    list: "updated",
  });
};

export const finishTodo = (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    console.log(id);
    if (finishTodoService(parseInt(id))) {
      return res.status(201).json({
        status: "success",
        message: "Marked todo finished",
      });
    }
  } catch (err) {
    throw err;
  }
};

export const deleteTodoList = (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deleteItem = deleteTodoService(parseInt(id));

    if (deleteItem) {
      return res.status(200).json({
        status: "success",
        removedId: id,
      });
    } else {
      res.status(400).json({
        status: "fail",
        message: "Bad request",
      });
    }
  } catch (err) {
    throw err;
  }
};
