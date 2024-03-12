const express = require("express");
const { balance, transfer } = require("../controllers/accountController");
const router = express.Router();

router.get("/balance", balance);
router.post("/transfer", transfer);

module.exports = router;
