import { Router } from "express";

import { addTask, getTasks, getTasksById } from "../controllers/tasks";

const tasksRoute = Router();

tasksRoute.get("/", getTasks);
tasksRoute.get("/:id", getTasksById);
tasksRoute.post("/", addTask);

export default tasksRoute;
