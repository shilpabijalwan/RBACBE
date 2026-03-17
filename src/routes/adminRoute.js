const express = require("express");
const adminRouter = express.Router();
const {
  createUser,
  getUsers,
  loginUser,
} = require("../controller/adminController");
const { requireAuth } = require("../middleware/requireAuth");
adminRouter.post("/create-user", createUser);
adminRouter.get("/get-users", getUsers);
adminRouter.post("/login", loginUser);

module.exports = adminRouter;
