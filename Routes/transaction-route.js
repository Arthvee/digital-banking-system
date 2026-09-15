const express = require("express");

const { getTransactionStatus} = require("../Controllers/transaction-status");
const {getTransactionHistory} = require("../Controllers/transaction-history");

const {protect} = require("../middleware/auth-midware");


const router = express.Router();

router.get("/history",protect, getTransactionHistory);
router.get("/:reference",protect,getTransactionStatus);


module.exports = router;