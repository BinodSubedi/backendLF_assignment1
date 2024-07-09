import { deleteTodoList } from "../controller/todo";
import {
  addManyAfterCheck,
  getContLen,
  idExists,
  modelEnforcer,
  removeOneTodo,
  TODOElement,
  updateTodo,
} from "../model/todoModel";
import { TodoReadError, TodoUpdateError } from "../utils/error";

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

export const updateTodoTitleService = (id: number, title: string): boolean => {
  try {
    const existCheck = idExists(id);
    if (existCheck[0]) {
      const val: TODOElement | undefined = existCheck[1];
      val!.title = title;
      updateTodo(id, val!);
      return true;
    }
    return false;
  } catch (err) {
    throw new TodoUpdateError("Todo title update error");
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

export const getOneTodoService = (id: number): TODOElement | undefined => {
  try {
    const existCheck = idExists(id);

    if (existCheck[0]) {
      return existCheck[1];
    }
  } catch (err) {
    throw new TodoReadError("Todo getOne error");
  }
};

export const postTodoService = (data: TODOElement[]) => {
  try {
    const buffContainer = [];

    for (let i = 0; i < data.length; i++) {
      const valCheck: TODOElement = {
        id: getContLen() + 1,
        title: data[i].title!,
        description: data[i].description,
        finished: false,
        created_at: new Date(),
        finished_at: null,
      };

      modelEnforcer(valCheck);

      buffContainer.push(valCheck);

      addManyAfterCheck(buffContainer);
    }
  } catch (err) {
    throw err;
  }
};
