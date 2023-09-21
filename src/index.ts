import * as dotenv from "dotenv";
import express from "express";

import sequelize from "./config/database";
import { testConnectingDatabase } from "./utils/databaseConnecting";
import Task from "./models/Task";
import User from "./models/User";

dotenv.config();

const port = process.env.PORT || "8080";

const app = express();

testConnectingDatabase();

Task.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Task);

sequelize
  .sync({ force: true })
  .then((result) => {
    console.log(result);
    app.listen(port);
  })
  .catch((err) => {
    console.log(err);
  });
