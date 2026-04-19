const permissionServices = require("../services/permissionServices");

const createPermission = async (req, res) => {
  try {
    const result = await permissionServices({
      currentUser: req.auth,
      body: req.body,
    });
    return res.status(result.status).json(result);
  } catch (error) {
    console.error("Error in createPermission controller:", error);
    return res.status(500).json({
      status: "error",
      message:
        "An unexpected error occurred while creating permission." ||
        error?.message,
    });
  }
};
module.exports = { createPermission };
