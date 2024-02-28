const mongoose = require("mongoose");
const chalk = require("chalk");
const { string } = require("zod");
import { z } from "zod";

const zodSchema = z.object({
  firstName: z.string().max(50),
  lastName: z.string().max(50),
  email: z.string().email(),
  password: z
    .string()
    .regex(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and be at least 8 characters long"
    ),
});

const userSchema = new mongoose.Schema({
  firstName: {
    validate: {
      validator: (value) => {
        try {
          zodSchema.parse({ firstName: value });
          return true; // Return true if validation succeeds
        } catch (error) {
          return false; // Return false if validation fails
        }
      },
      message: (props) => `${props.value} is not a valid username!`,
    },
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  lastName: {
    validate: {
      validator: (value) => {
        try {
          zodSchema.parse({ lastName: value });
          return true;
        } catch (error) {
          return false;
        }
      },
      message: (props) => `${props.value} is not a valid lastname!`,
    },
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  email: {
    validate: {
      validator: (value) => {
        try {
          zodSchema.parse({ email: value });
          return true;
        } catch (error) {
          return false;
        }
      },
      message: (props) => `${props.value} is not a valid email!`,
    },
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    validate: {
      validator: (value) => {
        try {
          zodSchema.parse({ password: value });
          return true;
        } catch (error) {
          return false;
        }
      },
      message: (props) => `${props.value} is not a valid password!`,
    },
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = {
  User,
};
