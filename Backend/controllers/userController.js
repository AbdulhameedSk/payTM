const { User } = require("../models/user");
const { Account } = require("../models/Account");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { authMiddleware } = require("../middlewares/authMiddleware");
const z = require("zod");

const signupBody = z.object({
  firstName: z.string().max(50),
  lastName: z.string().max(50),
  username: z.string().email(),
  password: z.string(),
});
const signup = async (req, res) => {
  try {
    const { success, data: parsedData } = signupBody.safeParse(req.body);
    if (!success) {
      return res.status(411).json({
        message: "username already taken / Incorrect inputs",
      });
    }
    const { firstName, lastName, username, password } = parsedData;
    const present = await User.findOne({ username });
    if (present) {
      return res.status(411).send({
        msg: "User Already Exists",
      });
    }
    const hashed = await bcrypt.hash(password, 12);
    const add = await User.create({
      firstName,
      lastName,
      username,
      password: hashed,
    });

    const userId = add._id;

    //Lets cerate Account for user
    await Account.create({
      userId,
      balance: 1 + Math.random() * 10000,
    });

    console.log(`New User ${add} created`);

    var token = jwt.sign({ userId }, JWT_SECRET);
    res.status(200).send({
      msg: "User Created Successfully",
      token: token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      msg: "An error occurred while processing your request",
    });
  }
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
  if (!success) {
    return res.status(411).send({ message: "Error while logging in" });
  }
  const { username, password } = parsedData;
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
