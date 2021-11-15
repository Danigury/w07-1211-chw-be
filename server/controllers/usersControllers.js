const User = require("../../database/models/user");

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find().populate({ path: "friends enemies" });
    res.status(200).json(users);
  } catch (error) {
    error.message = "I can't find users";
    error.code = 400;
    next(error);
  }
};

module.exports = { getUsers };
