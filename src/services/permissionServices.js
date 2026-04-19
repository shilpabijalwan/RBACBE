const permission = require("../models/permissionModel");
const user = require("../models/userModel");

const permissionServices = async ({ currentUser = {}, body = {}, db = {} }) => {
  const { name, module } = body;
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
    const PermissionExist = await permission.findAll({
      where: { name: name },
    });
    if (PermissionExist.length > 0) {
      return {
        status: 409,
        message: "Permission already exists. Please choose a different name",
      };
    }
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
