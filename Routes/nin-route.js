const express = require("express");

const {createNin,verifyNin} = require("../Controllers/nin-creation");
const {validateNin} = require("../Middleware/validate-nin");
const router = express.Router();

router.post("/create",validateNin,createNin);

router.post("/verify", verifyNin);

module.exports = router;