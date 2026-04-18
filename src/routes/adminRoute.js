const express = require("express");
const adminRouter = express.Router();
const {
  createUser,
  getUsers,
  loginUser,
  logoutUser,
} = require("../controller/adminController");
const { requireAuth } = require("../middleware/requireAuth");
const { createPermission } = require("../controller/permissionController");
const { createRole } = require("../controller/roleController");

adminRouter.post("/create-user", requireAuth, createUser);
adminRouter.get("/get-users", requireAuth, getUsers);
adminRouter.post("/login", requireAuth, loginUser);
adminRouter.post("/logout", requireAuth, logoutUser);
adminRouter.post("/create-permission", requireAuth, createPermission);
adminRouter.post("/create-role", requireAuth, createRole);
module.exports = adminRouter;
