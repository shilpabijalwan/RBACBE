const permission = require("../models/permissionModel");

const createPermission = async (req, res) => {
    try {
        const { name  ,userId} = req.body;
        const permissionData = await permission.create({ name ,userId});
        res.status(201).json({ message: "Permission created successfully", permissionData });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}
module.exports = { createPermission };