const express = require("express");
const adminRouter = express.Router();
const {
  createUser,
  getUsers,
  loginUser,
  logoutUser,
  createUserRole,
  createPermission,
} = require("../controller/adminController");
const { requireAuth } = require("../middleware/requireAuth");
adminRouter.post("/create-user", createUser);
adminRouter.get("/get-users", getUsers);
adminRouter.post("/login", loginUser);
adminRouter.post("/logout", logoutUser);
adminRouter.post("/create-role", createUserRole);
adminRouter.post("/create-permission", createPermission);
module.exports = adminRouter;
