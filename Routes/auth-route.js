const express = require("express");

const {login} = require("../Controllers/auth");
const {validateLogin} = require("../Middleware/validate-login");

const router = express.Router();

router.post("/login",validateLogin, login);

module.exports = router;