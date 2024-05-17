const { test, beforeEach, after } = require("node:test");
const assert = require("node:assert");
const app = require("../app");
const mongoose = require("mongoose");
const Blog = require("../models/blog");
const supertest = require("supertest");

const api = supertest(app);

const testData = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});
  const blogArray = testData.map((data) => new Blog(data));
  const saveArray = blogArray.map((blog) => blog.save());
  await Promise.all(saveArray);
});

test("Application returns correct blogs", async () => {
  const response = await api.get("/api/blogs/");
  assert.strictEqual(response.body.length, testData.length);
});

test("Unique identifier is named id", async () => {
  const response = await api.get("/api/blogs");
  const response2 = await Blog.find({});
  assert.strictEqual(response.body[0].id, response2[0]._id.toString());
});

test("Post request adds a new blog to the database", async () => {
  const blog = new Blog({
    title: "Post request does work",
    author: "John Doe",
    url: "http://www.u.california.edu/~justin/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 9,
  });
  await blog.save();
  const response = await api.get("/api/blogs");
  assert.strictEqual(testData.length + 1, response.body.length);
});

test("If like property is missing, put 0", async () => {
  const blog = {
    title: "Post request does work",
    author: "John Doe",
    url: "http://www.u.california.edu/~justin/copyright_violations/Go_To_Considered_Harmful.html",
  };
  const response = await api.post("/api/blogs").send(blog);
  assert.strictEqual(0, response.body.likes);
});

test("No title or url responds with 404 status", async () => {
  const blog = {
    author: "John Doe",
    url: "http://www.u.california.edu/~justin/copyright_violations/Go_To_Considered_Harmful.html",
  };
  const response = await api.post("/api/blogs").send(blog);
  assert.strictEqual(response.status, 404);
});

after(async () => {
  await mongoose.connection.close();
});
