import * as dotenv from "dotenv";
import express, { json } from "express";

import sequelize from "./config/database";
import { testConnectingDatabase } from "./utils/databaseConnecting";
import Task from "./models/task";
import User from "./models/user";
import usersRoute from "./routes/uersRoute";

import { errorHandler } from "./middleware/errorHandler";
import tasksRoute from "./routes/tasksRoute";

dotenv.config();

const port = process.env.PORT || "8080";

const app = express();

app.use(json());

testConnectingDatabase();

Task.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Task);

app.use("/users", usersRoute);
app.use("/tasks", tasksRoute);

app.use(errorHandler);

sequelize
  .sync({ force: true })
  .then((result) => {
    console.log(result);
    app.listen(port);
  })
  .catch((err) => {
    console.log(err);
  });
