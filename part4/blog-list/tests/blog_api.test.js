const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");
const User = require("../models/user");
const bcrypt = require("bcrypt");

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

const initialUsers = [
  {
    username: "testuser",
    name: "user",
    password: "12345",
  },
  {
    username: "testuser2",
    name: "user2",
    password: "123456",
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});
  await User.deleteMany({});

  for (let blog of initialBlogs) {
    let blogObject = new Blog(blog);
    await blogObject.save();
  }

  for (let user of initialUsers) {
    const saltRounds = 10;
    let passwordHash = await bcrypt.hash(user.password, saltRounds);
    user.passwordHash = passwordHash;
    let userObject = new User(user);
    await userObject.save();
  }
});

describe("when blogs exist", () => {
  test("blogs are returned as json", async () => {
    const { username, password } = initialUsers[0];

    const token = await api
      .post("/api/login")
      .set("Content-type", "application/json")
      .send({ username: username, password: password });

    await api
      .get("/api/blogs")
      .set("Content-type", "application/json")
      .set("Authorization", `Bearer ${token.body.token}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });
  test("id property exists on blog objects", async () => {
    console.log("entered test");
    const { username, password } = initialUsers[0];

    const token = await api
      .post("/api/login")
      .set("Content-type", "application/json")
      .send({ username: username, password: password });

    const blogs = await api
      .get("/api/blogs")
      .set("Content-type", "application/json")
      .set("Authorization", `Bearer ${token.body.token}`);

    for (const blog of blogs.body) {
      expect(blog.id).toBeDefined();
    }
  }, 100000);
  test("if likes property is missing, will default to 0", async () => {
    console.log("entered test");
    const { username, password } = initialUsers[0];

    const token = await api
      .post("/api/login")
      .set("Content-type", "application/json")
      .send({ username: username, password: password });

    const result = await api
      .post("/api/blogs")
      .set("Content-type", "application/json")
      .set("Authorization", `Bearer ${token.body.token}`)
      .send(testBlogPostNoLikes)
      .expect(201);

    expect(result.body.likes).toStrictEqual(0);
  }, 100000);
});

describe("http responses", () => {
  test("http POST request successfully creates a new blog post", async () => {
    console.log("entered test");
    const { username, password } = initialUsers[0];

    const token = await api
      .post("/api/login")
      .set("Content-type", "application/json")
      .send({ username: username, password: password });

    const blogs = await api
      .get("/api/blogs")
      .set("Content-type", "application/json")
      .set("Authorization", `Bearer ${token.body.token}`);

    const result = await api
      .post("/api/blogs")
      .set("Content-type", "application/json")
      .set("Authorization", `Bearer ${token.body.token}`)
      .send(testBlogPost)
      .expect(201);

    expect(result.body.title).toStrictEqual("test");
    expect(result.body.author).toStrictEqual("Testo");

    const updatedBlogs = await api
      .get("/api/blogs")
      .set("Content-type", "application/json")
      .set("Authorization", `Bearer ${token.body.token}`);
    expect(parseInt(updatedBlogs.length)).toStrictEqual(
      parseInt(blogs.length + 1)
    );
  }, 100000);

  test("backend responds with 400 Bad Request when given no url or title field", async () => {
    console.log("entered test");
    const { username, password } = initialUsers[0];

    const token = await api
      .post("/api/login")
      .set("Content-type", "application/json")
      .send({ username: username, password: password });

    await api
      .post("/api/blogs")
      .set("Content-type", "application/json")
      .set("Authorization", `Bearer ${token.body.token}`)
      .send(badBlogPost)
      .expect(400);
  }, 100000);
});

describe("individual notes", () => {
  test("blog object is deleted when id is provided", async () => {
    console.log("entered test");
    const { username, password } = initialUsers[0];

    const token = await api
      .post("/api/login")
      .set("Content-type", "application/json")
      .send({ username: username, password: password });

    const newBlogPost = {
      title: "New Blog 2000",
      author: "bob24",
      url: "http://google.com/hello",
      likes: 2,
    };

    const result = await api
      .post("/api/blogs")
      .send(newBlogPost)
      .set("Content-type", "application/json")
      .set("Authorization", `Bearer ${token.body.token}`)
      .expect(201);

    const blogs = await Blog.find({});

    await api
      .delete(`/api/blogs/${result.body.id}`)
      .set("Content-type", "application/json")
      .set("Authorization", `Bearer ${token.body.token}`)
      .expect(204);
    const updatedBlogs = await Blog.find({});

    expect(parseInt(updatedBlogs.length)).toStrictEqual(
      parseInt(blogs.length - 1)
    );
  });
  test("blog's likes are updated when given a new value", async () => {
    console.log("entered test");
    const { username, password } = initialUsers[0];

    const token = await api
      .post("/api/login")
      .set("Content-type", "application/json")
      .send({ username: username, password: password });

    const newBlogPost = {
      title: "New Blog 2000",
      author: "bob24",
      url: "http://google.com/hello",
      likes: 2,
    };

    const newBlogPostResult = await api
      .post("/api/blogs")
      .send(newBlogPost)
      .set("Content-type", "application/json")
      .set("Authorization", `Bearer ${token.body.token}`)
      .expect(201);

    const newLikes = {
      likes: 12345,
    };

    const result = await api
      .put(`/api/blogs/${newBlogPostResult.body.id}`)
      .send(newLikes)
      .set("Content-type", "application/json")
      .set("Authorization", `Bearer ${token.body.token}`);

    expect(result.body.likes).toStrictEqual(newLikes.likes);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
