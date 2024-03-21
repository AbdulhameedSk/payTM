const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const express = require("express");
const app = express();
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ msg: "Internal Server Error" });
});
app.use(express.json()); // for parsing application/json

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(403).json({});
  }

  const token = authHeader.split(' ')[1];

  try {
      const decoded = jwt.verify(token, JWT_SECRET);

      req.userId = decoded.userId;

      next();
  } catch (err) {
      return res.status(403).json({});
  }
};

module.exports = authMiddleware;
