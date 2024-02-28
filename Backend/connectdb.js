const mongoose = require("mongoose");
require("dotenv").config();
const chalk = require("chalk");
const connect = async () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(console.log("CONNECTED" + chalk.bgGreen(mongoose.connection.host)))
    .catch((err) => console.log("Mongo Connection Error"+chalk.bgRed(err)));
};
export default connect;
