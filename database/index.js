const debug = require("debug")("users:database");
const mongoose = require("mongoose");
const chalk = require("chalk");

const initializeDB = (connectionString) =>
  new Promise((resolve, reject) => {
    mongoose.set("debug", true);
    mongoose.set("toJSON", {
      virtuals: true,
      transform: (doc, ret) => {
        // eslint-disable-next-line no-underscore-dangle
        delete ret._id;
        // eslint-disable-next-line no-underscore-dangle
        delete ret.__v;
      },
    });

    mongoose.connect(connectionString, (error) => {
      if (error) {
        debug(chalk.red("Couldn't connect to DB"));
        debug(chalk.red(error.message));
        reject(error);
      }
      debug(chalk.green("Connection to Database done"));
      resolve();
    });
    mongoose.connection.on("close", () => {
      debug(chalk.green("Connection to database ended"));
    });
  });

module.exports = { initializeDB };
