import Joi from "joi";

export const paramsTaskSchema = Joi.object({
  id: Joi.string().required(),
});

export const createTaskSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string(),
  isImportant: Joi.bool().required(),
  endDate: Joi.date().required(),
  userId: Joi.number().required(),
});
