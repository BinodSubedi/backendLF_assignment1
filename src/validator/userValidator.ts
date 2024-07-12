import joi from "joi";
import { UserAccessLevel } from "../model/userModel";

export const userSchema = joi
  .object({
    id: joi.number().optional().messages({
      "string.base": "id must be number",
    }),
    username: joi.string().required().messages({
      "any.required": "Username is required",
    }),
    gender: joi.string().required().messages({
      "any.required": "Gender is required",
    }),
    email: joi.string().email().required().messages({
      "any.required": "email is required",
    }),
    password: joi.string().required().messages({
      "any.required": "Password is required",
    }),
    refreshToken: joi.string().optional(),
    accessLevel: joi.string().optional(),
  })
  .options({
    stripUnknown: true,
  });

export const signupRequestSchema = joi
  .object({
    username: joi.string().required().messages({
      "any.required": "Please provide username",
      "string.base": "The type of username must be string",
    }),
    email: joi.string().email().required().messages({
      "any.required": "Please provide email for the user",
      "string.base": "The type of username must be string",
    }),
    gender: joi.string().required().messages({
      "any.required": "Please provide with the user gender",
      "string.base": "The type of username must be string",
    }),
    password: joi.string().required().messages({
      "any.required": "Please provide password for the user account",
      "string.base": "The type of username must be string",
    }),
  })
  .options({
    stripUnknown: true,
  });

export const loginRequestSchema = joi
  .object({
    username: joi.string().required().messages({
      "any.required": "Username is needed for login",
      "string.base": "THe type of username must be string",
    }),
    password: joi.string().required().messages({
      "any.required": "Password is needed for login",
      "string.base": "THe type of password must be string",
    }),
  })
  .options({
    stripUnknown: true,
  });
