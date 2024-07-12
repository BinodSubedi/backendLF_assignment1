import joi from "joi";

export const todoPutReuestSchema = joi
  .object({
    title: joi.string().required().messages({
      "any.required": "Title is reuired in creating todo tasks",
      "string.base": "the type of title should be string",
    }),
    description: joi.string().required().messages({
      "any.required": "Description is reuired in creating todo tasks",
      "string.base": "The type of Description should be string",
    }),
    userId: joi.number().optional(),
  })
  .options({
    stripUnknown: true,
  });
