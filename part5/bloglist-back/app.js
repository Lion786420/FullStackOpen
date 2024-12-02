const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const middleware = require("./utils/middleware");
const blogsRouter = require("./controller/blogs");
const usersRouter = require("./controller/users");
const loginRouter = require("./controller/login");
const logger = require("./utils/logger");
const config = require("./utils/config");

logger.info("connecting to", config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI)
  .then((result) => {
    console.log("Connected to MongoDb");
  })
  .catch((error) => {
    console.log(error);
    logger.info("Error connecting to db");
  });

app.use(cors());
app.use(express.json());

app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);
app.use("/api/blogs", blogsRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
