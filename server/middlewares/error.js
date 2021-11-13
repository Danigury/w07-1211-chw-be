const debug = require("debug")("socialNetwork:errors");
const chalk = require("chalk");
const { ValidationError } = require("express-validation");

const notFoundErrorHandler = (req, res) => {
  res.status(404).json({ error: "Endpoint not found" });
};

// eslint-disable-next-line no-unused-vars
const errorHandler = (error, req, res, next) => {
  debug(chalk.red("An error has occurred: ", error.message));
  if (error instanceof ValidationError) {
    error.code = 400;
    error.message = "Bad request :( LOL";
  }
  const message = error.code ? error.message : "Not working";
  res.status(error.code || 500).json({ error: message });
};
module.exports = { notFoundErrorHandler, errorHandler };
