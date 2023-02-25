const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");

const initialBlogs = [
  {
    title: "Just Luv Bloggin",
    author: "Blogster Johnson",
    url: "http://google.com",
    likes: 1000,
    _id: "63f7e6bfd2e9c30d1025689a",
    __v: 0,
  },
  {
    title: "Just Luv Bloggin 2",
    author: "Blogster Johnson",
    url: "http://google.com",
    likes: 2000,
    _id: "65f7e6bfd2e9c30d1025689a",
    __v: 0,
  },
];

const testBlogPost = {
  title: "test",
  author: "Testo",
  url: "http://google.com",
  likes: 200000,
};

const testBlogPostNoLikes = {
  title: "test",
  author: "Testo",
  url: "http://google.com",
};

const badBlogPost = {
  author: "Testo",
  likes: 12,
};

beforeEach(async () => {
  await Blog.deleteMany({});

  for (let blog of initialBlogs) {
    let blogObject = new Blog(blog);
    await blogObject.save();
  }
});

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("id property exists on blog objects", async () => {
  console.log("entered test");
  const blogs = await api.get("/api/blogs");

  for (const blog of blogs.body) {
    expect(blog.id).toBeDefined();
  }
}, 100000);

test("http POST request successfully creates a new blog post", async () => {
  console.log("entered test");
  const blogs = await api.get("/api/blogs");

  const result = await api.post("/api/blogs").send(testBlogPost).expect(201);

  expect(result.body.title).toStrictEqual("test");
  expect(result.body.author).toStrictEqual("Testo");

  const updatedBlogs = await api.get("/api/blogs");
  expect(parseInt(updatedBlogs.length)).toStrictEqual(
    parseInt(blogs.length + 1)
  );
}, 100000);

test("if likes property is missing, will default to 0", async () => {
  console.log("entered test");
  const blogs = await api.get("/api/blogs");

  const result = await api
    .post("/api/blogs")
    .send(testBlogPostNoLikes)
    .expect(201);
  console.log(result.body);

  expect(result.body.likes).toStrictEqual(0);
}, 100000);

test("backend responds with 400 Bad Request when given no url or title field", async () => {
  console.log("entered test");

  const result = await api.post("/api/blogs").send(badBlogPost).expect(400);
}, 100000);

afterAll(async () => {
  await mongoose.connection.close();
});
