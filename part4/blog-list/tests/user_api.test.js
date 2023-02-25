const bcrypt = require("bcrypt");
const User = require("../models/user");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");
const helper = require("../utils/list_helper");

describe("when there is initially one user in db", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("sekret", 10);
    const user = new User({ username: "root", passwordHash });

    await user.save();
  });

  test("creation succeeds with a fresh Username", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "mluukkai",
      name: "Matti Luukkainen",
      password: "salainen",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).toContain(newUser.username);
  });

  test("creation fails with correct statuscode and message if username is already taken", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "root",
      name: "Superuser",
      password: "salainen",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain("expected `username` to be unique");

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toEqual(usersAtStart);
  });
});

describe("username and password checking", () => {
  test("creation fails with a username under 3 characters long, and returns correct status message", async () => {
    const usersAtStart = await helper.usersInDb();
    const invalidUsernameNewUser = {
      username: "m",
      name: "Matti Luukkainen",
      password: "salainen",
    };

    const result = await api
      .post("/api/users")
      .send(invalidUsernameNewUser)
      .expect(401);

    expect(result.body).toContain(
      "invalid username, make sure you enter something, and that it is at least 3 characters long."
    );
    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toEqual(usersAtStart);
  });
  test("creation fails when a username isn't inputted, and returns correct status message", async () => {
    const usersAtStart = await helper.usersInDb();
    const invalidUsernameNewUser = {
      name: "Matti Luukkainen",
      password: "salainen",
    };

    const result = await api
      .post("/api/users")
      .send(invalidUsernameNewUser)
      .expect(401);

    expect(result.body).toContain(
      "invalid username, make sure you enter something, and that it is at least 3 characters long."
    );
    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toEqual(usersAtStart);
  });
  test("creation fails with a password under 3 characters long, and returns correct status message", async () => {
    const usersAtStart = await helper.usersInDb();
    const invalidPasswordNewUser = {
      username: "mluukkai",
      name: "Matti Luukkainen",
      password: "s",
    };

    const result = await api
      .post("/api/users")
      .send(invalidPasswordNewUser)
      .expect(401);

    expect(result.body).toContain(
      "invalid password, make sure you enter something, and that it is at least 3 characters long."
    );
    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toEqual(usersAtStart);
  });
  test("creation fails when a password isn't inputted, and returns correct status message", async () => {
    const usersAtStart = await helper.usersInDb();
    const invalidPasswordNewUser = {
      username: "mluukkai",
      name: "Matti Luukkainen",
    };

    const result = await api
      .post("/api/users")
      .send(invalidPasswordNewUser)
      .expect(401);

    expect(result.body).toContain(
      "invalid password, make sure you enter something, and that it is at least 3 characters long."
    );
    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toEqual(usersAtStart);
  });
});
