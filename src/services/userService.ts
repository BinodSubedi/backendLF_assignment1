import jwt, { JwtPayload } from "jsonwebtoken";
import env from "./../config";
import bcrypt from "bcrypt";

import {
  createNewUser,
  deleteUser,
  getAllUsersModel,
  getUserById,
  getUserByUsername,
  passwordComparer,
  updateUserById,
  User,
  UserAccessLevel,
} from "../model/userModel";
import { DeleteError, UpdateError } from "../utils/error";

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

    const accessToken = jwt.sign(
      { id: requiredUser.id },
      env.jwt.secret!.toString(),
      {
        expiresIn: env.jwt.accessTokenExpiry,
      }
    );

    const refreshToken = jwt.sign(
      { id: requiredUser.id },
      env.jwt.secret!.toString(),
      {
        expiresIn: env.jwt.refreshTokenExpiry,
      }
    );

    // setting up refreshToken in the storage for later verification
    requiredUser.refreshToken = refreshToken;
    updateUserById(requiredUser.id!, requiredUser);

    return [true, refreshToken, accessToken];
  }
  return [false];
};

export const refreshUserTokenService = async (
  refreshToken: string
): Promise<string> => {
  try {
    const decoded: any = jwt.decode(refreshToken);
    // console.log(decoded.id);

    const userExistingdata = getUserById(decoded.id);

    if (userExistingdata?.refreshToken != refreshToken) {
      throw new UpdateError("Wrong refresh token");
    }

    const newRefreshToken = await jwt.sign(
      {
        id: decoded.id,
      },
      env.jwt.secret!.toString(),
      {
        expiresIn: env.jwt.refreshTokenExpiry,
      }
    );

    userExistingdata!.refreshToken = newRefreshToken;
    updateUserById(decoded.id, userExistingdata!);
    return newRefreshToken;
  } catch (err) {
    throw err;
  }
};

export const updateUserPasswordService = async (
  id: number,
  password: string,
  requiredUser: User
) => {
  try {
    requiredUser.password = await bcrypt.hash(password, 10);
    updateUserById(id, requiredUser);
  } catch (err) {
    throw new UpdateError("User password update error");
  }
};

export const getAllUserService = (userId: number): User[] | undefined => {
  const user = getUserById(userId);

  if (user?.accessLevel != UserAccessLevel.SuperUser) {
    return;
  }

  return getAllUsersModel();
};

export const adminDeleteUserService = (deleteId: number) => {
  const deleteBool = deleteUser(deleteId);
  if (!deleteBool) {
    throw new DeleteError("User Delete Error");
  }
};

export const adminUserPasswordUpdateService = (
  id: number,
  adminId: number,
  password: string
) => {
  const admin = getUserById(adminId);

  if (admin?.accessLevel != UserAccessLevel.SuperUser) {
    throw new UpdateError("Un-authorized request");
  }

  const user = getUserById(id);

  if (user == undefined) {
    throw new UpdateError("User not found");
  }

  user.password = password;

  updateUserById(id, user);
};
