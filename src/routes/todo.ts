import { Router } from "express";
import {
  deleteTodoList,
  finishTodo,
  getTodoList,
  postTodoList,
  updateDescription,
  updateTitle,
  putTodoList,
} from "../controller/todo";

const todoRouter = Router();

todoRouter.get("/", getTodoList);
todoRouter.post("/", postTodoList);
todoRouter.put("/", putTodoList);
todoRouter.delete("/:id", deleteTodoList);
//finished Task route
todoRouter.patch("/finish/:id", finishTodo);
//update title and description in two different routes
todoRouter.patch("/:id", updateTitle);
todoRouter.patch("':id", updateDescription);

export default todoRouter;
