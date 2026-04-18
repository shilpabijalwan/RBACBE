const role = require("../models/roleModel");

const roleServices = async (req, res) => {
  const { name, description, user } = req.body;
  try {
    const data = await role.create({ name, description });
    return {
      status: 201,
      message: "Role created successfully",
      data,
    };
  } catch (error) {
    return {
      status: 500,
      message: "Internal server error",
      error: error.message,
    };
  }
};

module.exports = { roleServices };
