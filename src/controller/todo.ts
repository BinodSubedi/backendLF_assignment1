import { Request, Response } from "express";
import { addOneTodo, getAllTodo } from "../model/todoModel";
import {
  deleteTodoService,
  finishTodoService,
  getOneTodoService,
  postTodoService,
  updateTodoTitleService,
} from "../services/todoServices";
import { TodoReadError } from "../utils/error";

export const getTodoList = (req: Request, res: Response) => {
  try {
    const todoList = getAllTodo();

    res.status(200).json({
      status: "success",
      list: todoList,
    });
  } catch (err) {
    throw new TodoReadError("Todo read error");
  }
};

export const getTodoById = (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const todoData = getOneTodoService(parseInt(id));

    if (todoData != undefined) {
      return res.status(200).json({
        status: "success",
        data: todoData,
      });
    }

    res.status(400).json({
      status: "fail",
      message: "couldn't find the todo with given id",
    });
  } catch (err) {
    throw err;
  }
};

export const postTodoList = (req: Request, res: Response) => {
  try {
    const { data } = req.body;

    const dataUpdateStatus = postTodoService(data);

    return res.status(200).json({
      status: "success",
      list: [],
    });
  } catch (err) {
    throw err;
  }
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
  try {
    const { id } = req.params;
    const { title } = req.body;

    if (updateTodoTitleService(parseInt(id), title)) {
      return res.status(200).json({
        status: "success",
        list: "title updated",
      });
    }

    return res.status(400).json({
      status: "fail",
      message: "something wrong with the request",
    });
  } catch (err) {
    throw err;
  }
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
