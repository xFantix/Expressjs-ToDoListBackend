import sequelize from "../../src/config/database";

import createServer from "../../src/utils/createServer";

export const startServerForTest = async () => {
  const app = createServer();
  const port = 7777;

  await sequelize
    .sync({ force: true })
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });

  return app.listen(port);
};

export const closeDatabase = async () => {
  await sequelize.close();
};
