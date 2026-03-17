// const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();
console.log(process.env.DB_NAME, "db name");

const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT,
    dialect: "postgres",
  },
);

const authenticate = async () => {
  try {
    await sequelize.authenticate();
    console.log("DB connected");
  } catch (err) {
    console.error("DB connection error:", err);
  }
};

module.exports = { sequelize, authenticate };
