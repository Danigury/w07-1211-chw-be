const express = require("express");
const { validate } = require("express-validation");

const { userLogin, userSignUp } = require("./controllers/loginControllers");

const router = express.Router();

router.post("/login", userLogin);
router.post("/register", userSignUp);

module.exports = router;
