const express = require("express");
const rootRouter = require("./routes/index");
const cors = require('cors');
const app = express();
const connect = require('./connectdb');
app.use(cors());
app.use(express.json());
connect();
app.use("/api/v1", rootRouter);
app.listen(3000, () => {
 console.log('Server is running at http://localhost:3000');
});