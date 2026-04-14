const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const user_roles = sequelize.define("user_roles", {
  user_id: {
    type: DataTypes.INTEGER,
    required: true,
    allowNull: false,
    references: {
      model: "users",
      key: "id",
    },
  },
  role_id: {
    type: DataTypes.INTEGER,
    required: true,
    allowNull: false,
    references: {
      model: "roles",
      key: "id",
    },
  },
  created_at: {
    type: DataTypes.DATE,
    required: true,
  },
  updated_at: {
    type: DataTypes.DATE,
    required: true,
  },
});

module.exports = user_roles;
