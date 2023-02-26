const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

blogsRouter.get("/", async (request, response, next) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  return response.json(blogs);
});

blogsRouter.post("/", async (request, response, next) => {
  const body = request.body;
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token invalid" });
  }
  const user = request.user;

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  return response.status(201).json(savedBlog);
});

blogsRouter.put("/:id", async (request, response, next) => {
  const body = await request.body;

  const blog = {
    likes: body.likes,
  };

  const result = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  });
  return response.json(result);
});

blogsRouter.delete("/:id", async (request, response, next) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token invalid" });
  }

  const user = request.user;
  const blog = await Blog.findById({ _id: request.params.id });

  if (blog.user.toString() === user.id.toString()) {
    const result = await Blog.findByIdAndDelete(request.params.id);
    return response.status(204).json(result);
  }
  return response
    .status(401)
    .json({ error: "you can only delete your own blog posts" });
});

module.exports = blogsRouter;
