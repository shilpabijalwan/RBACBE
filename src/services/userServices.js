
const user = require("../models/userModel");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const loginUserService = async (req, res) => {
  const { email, password } = req.body;
  const userExists = await user.findOne({ where: { email } });
  if (!userExists) {
    return { status: 401, message: "User not found" };
  }

  const isPasswordCorrect = await bcrypt.compare(password, userExists.password);
  if (!isPasswordCorrect) {
    return { status: 401, message: "Invalid password" };
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
    status: 200,
    message: "Login successful",
    user: userExists,
  };
};

const LogoutUserService = async (req, res) => {
  res.clearCookie("access_token");
  return {
    status: 200,
    message: "Logout successful",
  };
};


module.exports = {
  loginUserService,
  LogoutUserService,
};
