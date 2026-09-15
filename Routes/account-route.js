const express = require("express");
const {createAccount} = require("../Controllers/account-creation");

const { nameEnquiry } = require("../Controllers/name-enquiry");
const { getBalance } = require("../Controllers/balance");
const { protect } = require("../middleware/auth-midware");

const router = express.Router();

router.post("/create",protect, createAccount);

router.get("/name-enquiry/:accountNumber",protect, nameEnquiry);

router.get("/balance/:accountNumber",protect,getBalance);


module.exports = router;