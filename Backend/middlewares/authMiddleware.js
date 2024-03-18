const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const express = require("express");
const app = express();
app.use(express.json()); // for parsing application/json

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).send("Access denied.");
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.userId) {
      req.userId = decoded.userId;
    } else {
      return res.status(411).send({});
    }
    next();
  } catch (error) {
    return res.status(403).json({ error: "Invalid token." });
  }
};

module.exports = authMiddleware;
