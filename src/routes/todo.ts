import { Router } from "express";
import {
  deleteTodoList,
  finishTodo,
  getTodoList,
  postTodoList,
  updateTitle,
  putTodoList,
  getTodoById,
} from "../controller/todo";

const todoRouter = Router();

todoRouter.get("/", getTodoList);
// get todo by id
todoRouter.get("/:id", getTodoById);
todoRouter.post("/", postTodoList);
todoRouter.put("/", putTodoList);
todoRouter.delete("/:id", deleteTodoList);
//finished Task route
todoRouter.patch("/finish/:id", finishTodo);
todoRouter.patch("/:id", updateTitle);

export default todoRouter;
