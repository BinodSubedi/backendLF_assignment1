import bcrypt from "bcrypt";
import { CreateError, SchemaError, UpdateError } from "../utils/error";

export interface User {
  id?: number;
  username: string;
  gender: string;
  email: string;
  password: string;
  refreshToken?: string | null;
}

const userContainer: User[] = [];

const userSchemaEnforcer = (data: User) => {
  try {
    const values = Object.values(data);

    let requiredUnitsCounter = 0;

    Object.keys(data).map((el, i) => {
      if (
        el == "username" ||
        el == "gender" ||
        el == "email" ||
        el == "password"
      ) {
        requiredUnitsCounter++;

        if (values[i] == undefined || values[i] == null) {
          //Throw some custom schema didn't match error

          throw new SchemaError("User schema uncorroborated");
        }
      }
    });

    if (requiredUnitsCounter != 4) {
      throw new SchemaError("Field missing");
    }
  } catch (err) {
    throw err;
  }
};

const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 10);
};

const userSchemaMapper = async (data: User): Promise<User> => {
  try {
    userSchemaEnforcer(data);

    return {
      id: userContainer.length + 1,
      username: data.username,
      gender: data.gender,
      email: data.email,
      password: await hashPassword(data.password),
    };
  } catch (err) {
    throw err;
  }
};

export const passwordComparer = async (
  passwordNormal: string,
  passwordHashed: string
): Promise<boolean> => {
  return await bcrypt.compare(passwordNormal, passwordHashed);
};

export const getUserByUsername = (username: string): User | undefined => {
  const user = userContainer.filter((el) => el.username == username);

  if (user.length == 1) {
    user[0].refreshToken = null;
    return user[0];
  }

  return undefined;
};

export const getUserById = (id: number) => {
  const user = userContainer.filter((el) => el.id == id);

  if (user.length == 1) {
    return user[0];
  }

  return undefined;
};

export const updateUserById = (id: number, updateStruct: User) => {
  try {
    userSchemaEnforcer(updateStruct);
    try {
      for (let i = 0; i < userContainer.length; i++) {
        if (userContainer[i].id == id) {
          userContainer[i] = updateStruct;
          break;
        }
      }
      // console.log(userContainer);
      return;
    } catch (err) {
      throw new UpdateError("User update error");
    }
  } catch (err) {
    throw err;
  }
};

export const createNewUser = async (data: User): Promise<User> => {
  try {
    const userData = await userSchemaMapper(data);

    try {
      userContainer.push(userData);
    } catch (err) {
      throw new CreateError("User create error");
    }
    return userData;
  } catch (err) {
    throw err;
  }
};
