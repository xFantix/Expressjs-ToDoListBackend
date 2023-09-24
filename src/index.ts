import * as dotenv from "dotenv";

import sequelize from "./config/database";
import createServer from "./utils/createServer";

dotenv.config();

const port = process.env.PORT || "8080";

const app = createServer();

sequelize
  .sync({ force: true })
  .then((result) => {
    console.log(result);
    app.listen(port);
  })
  .catch((err) => {
    console.log(err);
  });
