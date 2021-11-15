require("dotenv").config();
const cors = require("cors");

const debug = require("debug")("users:server");
const express = require("express");
const morgan = require("morgan");
const chalk = require("chalk");
const loginRoutes = require("./routes/loginRoutes");
const usersRoutes = require("./routes/usersRoutes");

const app = express();

const initializeServer = (port) =>
  new Promise((resolve, reject) => {
    const server = app.listen(port, () => {
      debug(chalk.green(`Connecting to ${port}`));
      resolve(server);
    });
    server.on("error", (error) => {
      debug(chalk.red("Error to initialize server"));
      if (error.code === "EADDRINUSE") {
        debug(chalk.red(`Port ${port} is already in use.`));
      }

      reject();
      debug(chalk.red(error.code));
    });

    server.on("close", () => {
      debug(chalk.blue("See ya"));
    });
  });

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use("/socialnetwork", loginRoutes);
app.use("/users", usersRoutes);

module.exports = { initializeServer, app };
