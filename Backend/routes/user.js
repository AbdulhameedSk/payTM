const express = require("express");
const router = express.Router();
const { signup, signin, update, find } = require("../controllers/userController");

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/update", update);
router.get("/bulk", find);

module.exports = router;
