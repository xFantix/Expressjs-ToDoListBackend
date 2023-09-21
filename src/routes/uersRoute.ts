import { Router } from "express";

import {
  getUserById,
  getUsers,
  addUser,
  deleteUser,
  editUser,
} from "../controllers/users";

const usersRoute = Router();

usersRoute.get("/", getUsers);
usersRoute.post("/", addUser);
usersRoute.get("/:id", getUserById);
usersRoute.delete("/:id", deleteUser);
usersRoute.patch("/:id", editUser);

export default usersRoute;
