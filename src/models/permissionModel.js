const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const permissionModal = sequelize.define("permission", {
  name: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  userId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    primaryKey: true,
    references: {
      model: "users",
      key: "uuid",
    },
  },

  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
});

module.exports = permissionModal;
