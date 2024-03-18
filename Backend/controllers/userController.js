const {User} = require('../models/user');
const {Account} = require("../models/account");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { authMiddleware } = require("../middlewares/authMiddleware");
const z = require("zod");

const signupBody = z.object({
  username: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  password: z.string(),
});

const signup = async (req, res) => {
  const { success } = signupBody.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "Email already taken / Incorrect inputs",
    });
  }

  const existingUser = await User.findOne({
    username: req.body.username,
  });

  if (existingUser) {
    return res.status(411).json({
      message: "Email already taken/Incorrect inputs",
    });
  }

  const user = await User.create({
    username: req.body.username,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  });
  const userId = user._id;

  await Account.create({
    userId,
    balance: 1 + Math.random() * 10000,
  });

  // const token = jwt.sign({
  //     userId
  // }, JWT_SECRET);

  const payload = {
    sub: user._id, // Include the user ID in the payload
    username: user.username, // You can include additional user information if needed
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

  res.json({
    message: "User created successfully",
    token: token,
    userid: user._id,
    firstName: user.firstName,
  });
};

const signinBody = z.object({
  username: z.string().email(),
  password: z
    .string()
    .regex(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and be at least 8 characters long"
    ),
});

const signin = async (req, res) => {
  const { success, data: parsedData } = signinBody.safeParse(req.body);
  const { username, password } = parsedData;
  if (!success) {
    return res.status(411).send({ message: "Error while logging in" });
  }
  const present = await User.findOne({ username });
  if (!present) {
    return res.status(411).send({
      message: "Error while logging in",
    });
  }
  const real = await bcrypt.compare(password, present.password);
  if (!real) {
    return res.status(411).send({
      message: "Wrong Password",
    });
  }
  const userId = present._id;
  const token = jwt.sign({ userId }, JWT_SECRET);
  return res.status(200).send({ token, message: "LoggedIn successfully" });
};

const updatebody = z.object({
  firstName: z.string(),
  lastName: z.string(),
  password: z.string(),
});
const update = async (req, res) => {
  const { success, data: parsedData } = updatebody.safeParse(req.body);
  if (!success) {
    res.status(411).json({
      message: "Error while updating information",
    });
    const u = await User.updateOne({ _id: req.userId }, req.body);
    res.status(200).json({
      message: "Updated Success",
    });
  }
};

const find = async (req, res) => {
  const filter = req.query.filter || "";
  const f = await User.find({
    $or: [{ firstName: { $regex: filter } }, { lastName: { $regex: filter } }],
  });
  res.json({
    user: f.map((user) => ({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id,
    })),
  });
};

module.exports = { signup, signin, update, find };
