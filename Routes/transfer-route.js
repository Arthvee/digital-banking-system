const express = require("express");

const {transferFunds} = require("../Controllers/transfer");
const { protect } = require("../middleware/auth-midware");
const {validateTransfer} = require("../Middleware/validate-transfer");
const router = express.Router();

router.post("/",protect,validateTransfer, transferFunds);

module.exports = router;