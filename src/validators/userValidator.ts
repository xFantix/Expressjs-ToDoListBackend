import Joi from "joi";

export const createUserSchema = Joi.object({
  firstName: Joi.string().required(),
  surname: Joi.string().required(),
  email: Joi.string().email().required(),
});

export const paramsUserSchema = Joi.object({
  id: Joi.string().required(),
});
