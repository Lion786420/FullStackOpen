const userRouter = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

userRouter.get("/", async (request, response, next) => {
  const users = await User.find({});
  response.json(users);
});

userRouter.post("/", async (request, response, next) => {
  const body = request.body;
  if (body.password.length <= 3) {
    response
      .status(400)
      .json({ error: "Password has to be over 3 characters" })
      .end();
    return;
  }
  const rounds = 10;
  const passwordHash = await bcrypt.hash(body.password, rounds);
  const user = new User({
    name: body.name,
    username: body.username,
    passwordHash: passwordHash,
  });
  const savedUser = await user.save();
  response.json(savedUser);
});

module.exports = userRouter;
