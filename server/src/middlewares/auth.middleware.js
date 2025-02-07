import { User } from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { io } from "../socket.js";

const verifyToken = asyncHandler(async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    throw new ApiError(401, "Access denied. No token provided.");
  }

  try {
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    const user = await User.findById(decodedToken._id);

    if (!user) {
      throw new ApiError(401, "Invalid token.");
    }

    req.user = user;
    req.io = io;
    return next();
  } catch (error) {
    throw new ApiError(401, "Invalid or expired token.");
  }
});



export { verifyToken };
