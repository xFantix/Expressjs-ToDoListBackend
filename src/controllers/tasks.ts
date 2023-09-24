import { NextFunction, Request, RequestHandler, Response } from "express";

import createHttpError from "http-errors";

import Task from "../models/task";
import {
  createTaskSchema,
  paramsTaskSchema,
} from "../validators/tasksValidator";
import User from "../models/user";

export const getTasks: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  Task.findAll({
    include: [
      {
        model: User,
        attributes: ["firstName", "surname", "email"],
      },
    ],
  })
    .then((tasks) => {
      return res.status(200).json(tasks);
    })
    .catch((error) => {
      next(error);
    });
};

export const getTasksById: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const params = req.params;

  const { error, value } = paramsTaskSchema.validate(params, {
    abortEarly: false,
  });

  if (error) {
    throw createHttpError(400, "Error Validation");
  }

  Task.findByPk(value.id, {
    include: [
      {
        model: User,
        attributes: ["firstName", "surname", "email"],
      },
    ],
  })
    .then((task) => {
      return res.status(200).json(task);
    })
    .catch((error) => {
      next(error);
    });
};

export const addTask: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error, value } = createTaskSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    throw createHttpError(400, error.message);
  }

  Task.create(value)
    .then(() => {
      res.status(201).json({ message: "Record has been successfully added" });
    })
    .catch((error) => {
      next(error);
    });
};

export const editTask: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const params = req.params;
  const { error: errorId, value: paramsValue } = paramsTaskSchema.validate(
    params,
    {
      abortEarly: false,
    }
  );

  const { error: errorData, value: data } = createTaskSchema.validate(
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

  Task.update(data, { where: { id: paramsValue.id } })
    .then(() => {
      res
        .status(200)
        .json({ message: "Record has been successfully updated." });
    })
    .catch((error) => {
      next(error);
    });
};

export const deleteTask: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const params = req.params;
  const { error, value } = paramsTaskSchema.validate(params, {
    abortEarly: false,
  });
  if (error) {
    throw createHttpError(400, error.message);
  }

  Task.destroy({ where: { id: value.id } })
    .then(() => {
      res
        .status(200)
        .json({ message: "Record has been successfully deleted." });
    })
    .catch((error) => {
      next(error);
    });
};
