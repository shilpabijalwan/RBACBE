const permission = require("../models/permissionModel");

const permissionServices = async (req, res) => {
  const { name } = req.body;
  try {
    const permissionData = await permission.create({ name });
    console.log(permissionData, "permissionData");
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
