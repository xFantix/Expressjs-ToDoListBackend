import { BOOLEAN, DATE, INTEGER, STRING } from "sequelize";

import sequelize from "../config/database";

const Task = sequelize.define("task", {
  id: {
    primaryKey: true,
    type: INTEGER,
    allowNull: false,
    autoIncrement: true,
  },
  title: {
    type: STRING(100),
    allowNull: false,
  },
  description: {
    type: STRING(200),
  },
  isImportant: {
    type: BOOLEAN,
    allowNull: false,
  },
  endDate: {
    type: DATE,
    allowNull: false,
  },
});

export default Task;
