import { todo } from "node:test";
import { SchemaError, TodoUpdateError } from "../utils/error";

export interface TODOElement {
  id?: number;
  userId: number;
  title: string;
  description: string;
  finished: boolean;
  created_at?: Date;
  finished_at: Date | null;
}

const todoContainer: TODOElement[] = [];

export const modelEnforcer = (valCheck: TODOElement) => {
  try {
    const values = Object.values(valCheck);

    Object.keys(valCheck).map((el, i) => {
      // console.log(`${el}::${values[i]}`);

      if (
        el == "title" ||
        el == "description" ||
        el == "finished" ||
        el == "created_at" ||
        el == "userId"
      ) {
        if (values[i] == undefined || values[i] == null) {
          throw new SchemaError();
        }
      }
    });
  } catch (err) {
    throw err;
  }
};

export const idExists = (id: number): [boolean, TODOElement?] => {
  const value = todoContainer.filter((el) => el.id == id);

  if (value.length == 0) {
    return [false];
  }

  return [true, value[0]];
};

export const updateTodo = (id: number, updatedElement: TODOElement) => {
  todoContainer.forEach((el, index, arr) => {
    if (el.id == id) {
      arr[index] = updatedElement;
    }
  });
};

export const getContLen = (): number => {
  return todoContainer.length;
};

export const addOneTodo = (todoVal: TODOElement) => {
  //Integrity Check

  try {
    const valCheck: TODOElement = {
      id: todoContainer.length + 1,
      title: todoVal.title!,
      description: todoVal.description,
      finished: false,
      created_at: new Date(),
      finished_at: null,
      userId: todoVal.userId,
    };

    modelEnforcer(valCheck);

    todoContainer.push(valCheck);
  } catch (err) {
    throw err;
  }
};

export const addManyAfterCheck = (data: TODOElement[]) => {
  try {
    todoContainer.push(...data);
  } catch (err) {
    throw new TodoUpdateError("Add many error");
  }
};

export const removeOneTodo = (id: number): boolean => {
  try {
    for (let i = 0; i < todoContainer.length; i++) {
      if (todoContainer[i].id == id) {
        todoContainer.splice(i, 1);
        return true;
      }
    }

    return false;
  } catch (err) {
    throw new TodoUpdateError("remove one error");
  }
};

export const getAllTodo = () => {
  return todoContainer;
};
