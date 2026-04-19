const permission = require("../models/permissionModel");
const user = require("../models/userModel");

const permissionServices = async ({ currentUser = {}, body = {}, db = {} }) => {
  const { name, module } = body;

  console.log("Received data in permissionServices:", { name, module });

  try {
    if (!Array.isArray(name)) {
      return {
        status: 400,
        message: "Bad request",
        error: "name must be an array",
      };
    }

    const mapedData = name.map((ele, ind) => {
      return { name: ele, module: module };
    });

    const permissionData = await permission.bulkCreate(mapedData);
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
