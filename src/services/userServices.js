const permission = require("../models/permissionModel");
const user = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const loginUserService = async (req, res) => {
  const { email, password } = req.body;
  const userExists = await user.findOne({ where: { email } });
  if (!userExists) {
    return res.status(401).json({ message: "User not found" });
  }
  const isPasswordCorrect = await bcrypt.compare(password, userExists.password);
  if (!isPasswordCorrect) {
    return res.status(401).json({ message: "Invalid password" });
  }
  const token = jwt.sign({ userId: userExists.uuid }, process.env.JWT_SECRET, {
    expiresIn: "120h",
  });

  const isProduction = process.env.NODE_ENV === "production";

  res.cookie("access_token", token, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    maxAge: 120 * 60 * 60 * 1000,
  });
  userExists.password = undefined;
  return {
    message: "Login successful",
    user: userExists,
  };
};
const LogoutUserService = async (req, res) => {
  const token = req.cookies?.access_token;
  res.clearCookie("access_token");
  return {
    message: "Logout successful",
  };
};

module.exports = { loginUserService, LogoutUserService };
