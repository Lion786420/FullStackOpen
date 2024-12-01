require("dotenv").config();

const PORT = process.env.PORT;
const MONGODB_URI =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI;
const SALT_ROUNDS = +process.env.SALT_ROUNDS;

module.exports = { PORT, MONGODB_URI, SALT_ROUNDS };
