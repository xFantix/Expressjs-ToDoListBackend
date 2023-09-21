import sequelize from "../config/database";

export const testConnectingDatabase = async () => {
  await sequelize
    .authenticate()
    .then(() => {
      console.log("database is connecting");
    })
    .catch((err) => {
      console.log("problem with database: ", err);
    });
};
