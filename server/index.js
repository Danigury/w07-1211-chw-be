require("dotenv").config();
const chalk = require("chalk");
const morgan = require("morgan");
const express = require("express");

const debug = require();
const cors = require("cors");

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

      debug(chalk.red(error.code));
    });

    reject();
    server.on("close", () => {
      debug(chalk.blue("See ya"));
    });
  });

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

module.exports = { initializeServer, app };
