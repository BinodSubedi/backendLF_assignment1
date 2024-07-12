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
import { validator } from "../validator";
import { todoPutReuestSchema } from "../validator/todoValidator";

const todoRouter = Router();

todoRouter.get("/", getTodoList);
// get todo by id
todoRouter.get("/:id", getTodoById);
todoRouter.post("/", postTodoList);
todoRouter.put("/", validator(todoPutReuestSchema), putTodoList);
todoRouter.delete("/:id", deleteTodoList);
//finished Task route
todoRouter.patch("/finish/:id", finishTodo);
todoRouter.patch("/:id", updateTitle);

export default todoRouter;
