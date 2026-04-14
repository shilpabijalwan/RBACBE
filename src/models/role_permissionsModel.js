const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const role_permissions = sequelize.define("role_permissions", {
  role_id: {
    type: DataTypes.INTEGER,
    required: true,
    allowNull: false,
    references: {
      model: "roles",
      key: "id",
    },
  },
  permission_id: {
    type: DataTypes.INTEGER,
    required: true,
    allowNull: false,
    references: {
      model: "permissions",
      key: "id",
    },
  },
});
exports = role_permissions;
