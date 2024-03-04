const userModel = require("../models/user");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const signup =async (req, res) => {
  const { username, firstname, lastname, password } = req.body;
  if (!username || !password || !firstname) {
    return res.status(404).json({
      success: false,
      msg: "ALL FIELDS SHOULD BR FILLED",
    });
  }

  var token = jwt.sign({ username, password }, JWT_SECRET);
  const present=await  userModel.findOne({ username });
  if(present){
    return res.status(400).send({
      success:false,
      msg:"User Already Exists"
    })
  }
  const hashed= await bcrypt.hash(password,12);
  const add=await new userModel({username,firstname,lastname,password:hashed}).save();
  console.log(add);
  res
};
module.exports = { signup };
