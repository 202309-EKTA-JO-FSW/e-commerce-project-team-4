const express = require("express");
require("dotenv").config();
const adminRouter = require("./versions/v1/routes/admin");
const v2Router = require("./versions/v2/routes/v2Router");

const connectToMongo = require("./db/connection");

const app = express();
const port =
  process.env.NODE_ENV === "test"
    ? process.env.NODE_LOCAL_TEST_PORT
    : process.env.NODE_LOCAL_PORT;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/v1/api/", adminRouter);
app.use("/v2/api/", v2Router);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
  connectToMongo();
});

module.exports = app;
