const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (request, response, next) => {
  const blogs = await Blog.find({});
  return response.json(blogs);
});

blogsRouter.post("/", async (request, response, next) => {
  const blog = new Blog(request.body);
  const result = await blog.save();
  return response.status(201).json(result);
});

blogsRouter.delete("/:id", async (request, response, next) => {
  const blog = await Blog.findById({ _id: request.params.id });
  const result = await Blog.findByIdAndDelete(request.params.id);
  return response.status(204).json(blog);
});

module.exports = blogsRouter;
