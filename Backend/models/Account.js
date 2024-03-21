const mongoose = require("mongoose");
const { User } = require("./user");
const AccountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId, // Reference to User model
    ref: "User",
    required: true,
  },
  balance: Number,
});
const Account = mongoose.model("Account", AccountSchema);
module.exports = {
  Account,
};
