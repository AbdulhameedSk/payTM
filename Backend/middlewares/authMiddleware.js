const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(403).send("Access denied.");
    }
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId; 
    next();
  } catch (error) {
    return res.status(403).json({ error: "Invalid token." });
  }
};

module.exports = authMiddleware;
