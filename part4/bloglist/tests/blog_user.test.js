const { test, beforeEach, after } = require("node:test");
const assert = require("node:assert");
const app = require("../app");
const mongoose = require("mongoose");
const User = require("../models/user");
const supertest = require("supertest");

const api = supertest(app);

const userData = [
  { name: "Shawn", username: "Sheanic", password: "shawn@123" },
  { name: "Sally", username: "Slyly", password: "Sally@123" },
];

beforeEach(async () => {
  await User.deleteMany({});
  const userArray = userData.map((data) => new User(data));
  const saveArray = userArray.map((user) => user.save());
  await Promise.all(saveArray);
});

test("Test invalid addition of users", async () => {
  const initialUsers = await api.get("/api/users");
  const newUser = {
    name: "John",
    username: "Jonny",
    password: "123",
  };
  await api.post("/api/users").send(newUser);
  const finalUsers = await api.get("/api/users");
  assert.strictEqual(initialUsers.body.length, finalUsers.body.length);
});

after(async () => {
  mongoose.connection.close();
});
