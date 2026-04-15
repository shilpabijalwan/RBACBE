const user = require("../models/userModel");
const bcrypt = require("bcrypt");
const {
  loginUserService,
  LogoutUserService,
} = require("../services/userServices");
const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const existingUser = await user.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    if (
      !name ||
      !email ||
      password == null ||
      (typeof password === "string" && password.trim().length === 0)
    ) {
      if (!name) {
        return res.status(400).json({ message: "Name is required" });
      }
      if (!email) {
        return res.status(400).json({ message: "Email is required" });
      }
      if (
        password == null ||
        (typeof password === "string" && password.trim().length === 0)
      ) {
        return res.status(400).json({ message: "Password is required" });
      }
      return res.status(400).json({ message: "All fields are required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const roles = role == null ? ["user"] : Array.isArray(role) ? role : [role];
    const userData = await user.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: "User created successfully", userData });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await user.findAll({
      attributes: ["id", "uuid", "name", "email", "created_at", "updated_at"],
    });
    res.status(200).json({ message: "Users fetched successfully", users });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const response = await loginUserService(req, res);
    return res.status(response.status || 200).json(response);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

const logoutUser = async (req, res) => {
  try {
    const response = await LogoutUserService(req, res);
    return res.status(response.status || 200).json(response);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

module.exports = {
  createUser,
  getUsers,
  loginUser,
  logoutUser,
};
