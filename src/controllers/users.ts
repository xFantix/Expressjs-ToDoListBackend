import { Request, Response, RequestHandler, NextFunction } from "express";

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
    console.log(error);
    return res.status(400).json({ message: "Invalid id" });
  }

  User.findByPk(value.id)
    .then((user) => {
      return res.status(200).json(user);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
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
    console.log(error);
    return res.status(400).json({ message: "Invalid date" });
  }

  User.create(value)
    .then(() => {
      res.status(201).json({ message: "'Record has been successfully added" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
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
    console.log(error);
    return res.status(400).json({ message: "Invalid id" });
  }

  User.destroy({ where: { id: value.id } })
    .then(() => {
      res
        .status(200)
        .json({ message: "Record has been successfully deleted." });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
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
    console.log(errorId);
    return res.status(400).json({ message: "Invalid id" });
  }

  if (errorData) {
    console.log(errorData);
    return res.status(400).json({ message: "Invalid date" });
  }

  User.update(data, { where: { id: paramsValue.id } })
    .then(() => {
      res
        .status(200)
        .json({ message: "Record has been successfully updated." });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
};
