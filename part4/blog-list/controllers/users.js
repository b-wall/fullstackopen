const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs");
  response.json(users);
});

usersRouter.post("/", async (request, response) => {
  console.log(request);
  const { username, name, password } = request.body;
  console.log(username, name, password);

  if (!username || username.length < 3) {
    return response
      .status(401)
      .json(
        "invalid username, make sure you enter something, and that it is at least 3 characters long."
      );
  }

  if (!password || password.length < 3) {
    return response
      .status(401)
      .json(
        "invalid password, make sure you enter something, and that it is at least 3 characters long."
      );
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });
  const savedUser = await user.save();
  response.status(201).json(savedUser);
});

module.exports = usersRouter;
