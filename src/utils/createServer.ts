import express, { json } from "express";
import cors from "cors";

import { testConnectingDatabase } from "./databaseConnecting";
import Task from "../models/task";
import User from "../models/user";
import usersRoute from "../routes/uersRoute";
import tasksRoute from "../routes/tasksRoute";
import { errorHandler } from "../middleware/errorHandler";

const corsOptions = {
  origin: process.env.CORS_ORIGIN_ALLOWED,
  credentials: true,
  optionsSuccessStatus: 200,
};

const createServer = () => {
  const app = express();

  app.use(json());
  app.use(cors(corsOptions));

  testConnectingDatabase();

  Task.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
  User.hasMany(Task);

  app.use("/users", usersRoute);
  app.use("/tasks", tasksRoute);

  app.use(errorHandler);

  return app;
};

export default createServer;
