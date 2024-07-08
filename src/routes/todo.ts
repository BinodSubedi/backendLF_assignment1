import { Router } from "express";
import { deleteTodoList, getTodoList, patchTodoList, postTodoList, putTodoList, } from "../controller/todo";

const todoRouter = Router();

todoRouter.get('/',getTodoList);
todoRouter.post('/',postTodoList);
todoRouter.put('/',putTodoList);
todoRouter.delete('/:id',deleteTodoList);
todoRouter.patch('/:id',patchTodoList)


export default todoRouter;
