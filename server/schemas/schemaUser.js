const { Joi } = require("express-validation");

const userLoginSchema = {
  body: Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

const userSignUpSchema = {
  body: Joi.object({
    name: Joi.string().required(),
    username: Joi.string().required(),
    password: Joi.string().required(),
    photo: Joi.string().optional(),
  }),
};

module.exports = {
  userLoginSchema,
  userSignUpSchema,
};
