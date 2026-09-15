const express = require("express");

const { createBvn, verifyBvn} = require("../Controllers/bvn-creation");
const {validateBvn} = require("../Middleware/validate-bvn");
const router = express.Router();

router.post("/create", validateBvn,createBvn);

router.post("/verify", verifyBvn);



module.exports = router;