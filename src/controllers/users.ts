import { Request, Response, RequestHandler, NextFunction } from "express";

import createHttpError from "http-errors";

import User from "../models/user";
import {
  createUserSchema,
  paramsUserSchema,
} from "../validators/userValidator";

export const getUsers: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const users = await User.findAll();
  return res.status(200).json(users);
};

export const getUserById: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const params = req.params;
  const { error, value } = paramsUserSchema.validate(params, {
    abortEarly: false,
  });

  if (error) {
    throw createHttpError(400, "Error Validation");
  }

  User.findByPk(value.id)
    .then((user) => {
      return res.status(200).json(user);
    })
    .catch((error) => {
      throw createHttpError(400, error.message);
    });
};

export const addUser: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error, value } = createUserSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    throw createHttpError(400, error.message);
  }

  User.create(value)
    .then(() => {
      res.status(201).json({ message: "'Record has been successfully added" });
    })
    .catch((error) => {
      throw createHttpError(400, error.message);
    });
};

export const deleteUser: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const params = req.params;
  const { error, value } = paramsUserSchema.validate(params, {
    abortEarly: false,
  });
  if (error) {
    throw createHttpError(400, error.message);
  }

  User.destroy({ where: { id: value.id } })
    .then(() => {
      res
        .status(200)
        .json({ message: "Record has been successfully deleted." });
    })
    .catch((error) => {
      throw createHttpError(400, error.message);
    });
};

export const editUser: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const params = req.params;
  const { error: errorId, value: paramsValue } = paramsUserSchema.validate(
    params,
    {
      abortEarly: false,
    }
  );

  const { error: errorData, value: data } = createUserSchema.validate(
    req.body,
    {
      abortEarly: false,
    }
  );

  if (errorId) {
    throw createHttpError(400, errorId.message);
  }

  if (errorData) {
    throw createHttpError(400, errorData.message);
  }

  User.update(data, { where: { id: paramsValue.id } })
    .then(() => {
      res
        .status(200)
        .json({ message: "Record has been successfully updated." });
    })
    .catch((error) => {
      throw createHttpError(400, error.message);
    });
};
