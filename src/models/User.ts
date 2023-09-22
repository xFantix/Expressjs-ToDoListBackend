import { INTEGER, STRING } from "sequelize";

import sequelize from "../config/database";

const User = sequelize.define(
  "user",
  {
    id: {
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: STRING,
      allowNull: false,
    },
    surname: {
      type: STRING,
      allowNull: false,
    },
    email: {
      type: STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
  },
  {
    updatedAt: false,
    createdAt: false,
  }
);

export default User;
