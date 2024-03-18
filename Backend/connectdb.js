const mongoose = require("mongoose");
require("dotenv").config();
const colors = require("colors");

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("CONNECTED".bgGreen, mongoose.connection.host.bgGreen);
  } catch (err) {
    console.log("Mongo Connection Error".bgRed, err.message.bgRed);
  }
};

module.exports = connect;
