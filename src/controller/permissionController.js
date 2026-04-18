const permissionServices = require("../services/permissionServices");




const createPermission = async (req, res) => {
  const result = await permissionServices({
    currentUser: req.auth,
    body: req.body,
    db: req.db,
  });

  return res.status(result.status).json(result);
};
module.exports = { createPermission };