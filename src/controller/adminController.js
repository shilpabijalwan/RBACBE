const user = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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
      role: roles,
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
      attributes: [["uuid", "id"], "name", "email", ["role", "roles"]],
    });
    res.status(200).json({ message: "Users fetched successfully", users });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }
    const isuserExists = await user.findOne({ where: { email } });

    if (!isuserExists) {
      return res.status(400).json({ message: "User not found" });
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      isuserExists.password,
    );
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { userId: isuserExists.uuid },
      process.env.JWT_SECRET,
      { expiresIn: "120h" },
    );

    const isProduction = process.env.NODE_ENV === "production";

    res.cookie("access_token", token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      maxAge: 120 * 60 * 60 * 1000,
    });

    res.status(200).json({ message: "Login successful" });


  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

module.exports = { createUser, getUsers, loginUser };
