import { StatusCodes } from "http-status-codes";
import User from "../models/UserModel.js";
import { hashPassword, comparePassword } from "../utils/passwordUtils.js";
import { NotFoundError, UnauthenticatedError } from "../errors/customError.js";
import { createJWT } from "../utils/tokenUtils.js";

export const register = async (req, res) => {
  const isFirstAccount = (await User.countDocuments()) === 0;
  req.body.role = isFirstAccount ? "admin" : "user";

  const hashedPassword = await hashPassword(req.body?.password);
  req.body.password = hashedPassword
  await User.create(req.body);

  res.status(StatusCodes.CREATED).json({ msg: "user created" });
};

export const login = async (req, res) => { 

  const user = await User.findOne({ email: req.body.email }); 
  

  const isValidUser =
    user && (await comparePassword(req.body.password, user.password));

  if (!isValidUser) throw new UnauthenticatedError("invalid credentials");
<<<<<<< HEAD
  else {
    res.status(StatusCodes.OK).json({msg: 'login successfully'})
  }
=======

  const token = createJWT({
    userId: user._id,
    role: user.role,
  });

  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
    secure: process.env.NODE_ENV === "production",
  });

  res.status(200).json({ msg: "logged in" });
};

export const logout = (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.stateus(StatusCodes.OK).json({ msg: "user logged out" });
>>>>>>> 5be76ac8dd8d2d2c3a3b694e721af8a8a3c2aa44
};
