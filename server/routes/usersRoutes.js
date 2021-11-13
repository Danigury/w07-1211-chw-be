const express = require("express");
require("dotenv").config();

const router = express.Router();

router.post("/login", userLogin);
router.post("/register", userSignUp);

module.exports = router;
