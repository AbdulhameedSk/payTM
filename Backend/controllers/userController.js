const userModel = require("../models/user");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const z = require("zod");

const signupBody = z.object({
  firstName: z.string().max(50),
  lastName: z.string().max(50),
  username: z.string().email(),
  password: z
    .string()
    .regex(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and be at least 8 characters long"
    ),
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
    const present = await userModel.findOne({ username });
    if (present) {
      return res.status(411).send({
        msg: "User Already Exists",
      });
    }
    const hashed = await bcrypt.hash(password, 12);
    const add = await userModel.create({
      firstName,
      lastName,
      username,
      password: hashed,
    });
    console.log(add);
    const userId = add._id;
    var token = jwt.sign({ userId }, JWT_SECRET);
    res.status(200).send({
      msg: "User Created Successfully",
      token: token,
    });
  } catch (error) {
    res.status(411).send({
      msg: "username already taken / Incorrect inputs",
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
  const { username, password } = parsedData;
  if (!success) {
    return res.status(411).send({ message: "Error while logging in" });
  }
  const present = await userModel.findOne({ username });
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

module.exports = { signup, signin };
