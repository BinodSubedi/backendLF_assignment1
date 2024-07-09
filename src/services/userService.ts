import {
  createNewUser,
  getUserByUsername,
  passwordComparer,
  User,
} from "../model/userModel";

export const createUserService = (data: User) => {
  try {
    const userOut = createNewUser(data);
    return userOut;
  } catch (err) {
    console.log("reached end");
    throw err;
  }
};

export const loginUserService = async (data: {
  username: string;
  password: string;
}): Promise<[boolean, string?, string?]> => {
  const requiredUser: User | undefined = getUserByUsername(data.username);
  if (requiredUser == undefined) {
    return [false];
  }

  if (await passwordComparer(data.password, requiredUser!.password)) {
    // Create access and refresh token here
  }
  return [false];
};
