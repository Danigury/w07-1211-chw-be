const express = require("express");
const { getUsers } = require("../controllers/usersControllers");

require("dotenv").config();

const router = express.Router();

router.get("/users", getUsers);

module.exports = router;
