const permissionServices = require("../services/permissionServices");

const createPermission = async (req, res) => {
  try {
    const result = await permissionServices(req, res);

    res.status(result.status).json(result);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
module.exports = { createPermission };
