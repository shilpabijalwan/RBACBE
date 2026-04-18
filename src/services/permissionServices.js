const permission = require("../models/permissionModel");
const user = require("../models/userModel");

const permissionServices = async ({ currentUser = {}, body = {}, db = {} }) => {
  const { name } = body;

  try {
    const permissionData = await permission.create({ name });
    return {
      status: 201,
      message: "Permission created successfully",
      permissionData,
    };
  } catch (error) {
    return {
      status: 500,
      message: "Internal server error",
      error: error.message,
    };
  }
};

module.exports = permissionServices;
