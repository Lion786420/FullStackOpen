const blogsRouter = require("express").Router();
const { request, response } = require("../app");
const Blog = require("../models/blog");
const logger = require("../utils/logger");

blogsRouter.get("/", (request, response, next) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});

blogsRouter.post("/", async (request, response, next) => {
  const body = request.body;
  if (!body.title || !body.url) {
    return response.status(404).end();
  }
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
  });

  const savedBlog = await blog.save();
  response.status(201).json(savedBlog);
});

blogsRouter.delete("/:id", async (request, response, next) => {
  await Blog.findByIdAndDelete(request.params.id);
  response.status(204).end();
});

blogsRouter.put("/:id", async (request, response, next) => {
  const body = request.body;
  const newBlog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, newBlog, {
    new: true,
  });
  response.json(updatedBlog);
});

module.exports = blogsRouter;
