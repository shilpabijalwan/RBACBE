const { roleServices } = require("../services/roleServices");

const createRole = async (req, res) => {
  try {
    const result = await roleServices(req, res);
    return res.status(result.status).json(result);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

module.exports = { createRole };
