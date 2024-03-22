const express = require("express");
const { balance, transfer } = require("../controllers/accountController");
const router = express.Router();
const { authMiddleware } = require("../middlewares/authMiddleware");
router.use(authMiddleware);
router.get("/balance", balance);
router.post("/transfer", transfer);

module.exports = router;
