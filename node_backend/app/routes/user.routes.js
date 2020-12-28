module.exports = app => {
  const users = require("../controllers/user.controller.js");

  var router = require("express").Router();

  // Create a new user
  router.post("/", users.create);

  // Retrieve all users
  router.get("/", users.findAll);

  // Update a user with id
  router.put("/:id", users.update);

  // Delete a user with id
  router.delete("/:id", users.delete);

  app.use("/api/user", router);
};
