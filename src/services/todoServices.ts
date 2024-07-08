import { deleteTodoList } from "../controller/todo";
import {
  idExists,
  removeOneTodo,
  TODOElement,
  updateTodo,
} from "../model/todoModel";
import { TodoUpdateError } from "../utils/error";

export const finishTodoService = (id: number): boolean => {
  try {
    const existCheck = idExists(id);
    if (existCheck[0]) {
      const val: TODOElement | undefined = existCheck[1];
      val!.finished = true;
      updateTodo(id, val!);
      return true;
    }
    return false;
  } catch (err) {
    throw new TodoUpdateError("Todo update error");
  }
};

export const deleteTodoService = (id: number): boolean => {
  try {
    const existCheck = idExists(id);

    if (existCheck[0]) {
      const removed = removeOneTodo(id);

      if (removed) {
        return true;
      }
    }

    return false;
  } catch (err) {
    throw err;
  }
};
