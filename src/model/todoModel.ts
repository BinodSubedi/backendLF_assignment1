import { SchemaError } from "../utils/error";

interface TODOElement {
  id?: number;
  title: string;
  description: string;
  finished: boolean;
  created_at?: Date;
  finished_at: Date | null;
}

const todoContainer: TODOElement[] = [];

const modelEnforcer = (valCheck: TODOElement) => {
  try {
    const values = Object.values(valCheck);

    Object.keys(valCheck).map((el, i) => {
      console.log(`${el}::${values[i]}`);

      if (
        el == "title" ||
        el == "description" ||
        el == "finished" ||
        el == "created_at"
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
    };

    modelEnforcer(valCheck);

    todoContainer.push(valCheck);
  } catch (err) {
    throw err;
  }
};

export const getAllTodo = () => {
  console.log(todoContainer);
  return todoContainer;
};
