import { Router } from "express";

import {
  addTask,
  deleteTask,
  editTask,
  getTasks,
  getTasksById,
} from "../controllers/tasks";

const tasksRoute = Router();

tasksRoute.get("/", getTasks);
tasksRoute.get("/:id", getTasksById);
tasksRoute.post("/", addTask);
tasksRoute.delete("/:id", deleteTask);
tasksRoute.patch("/:id", editTask);

export default tasksRoute;
