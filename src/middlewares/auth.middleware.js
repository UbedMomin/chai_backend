import jwt from "jsonwebtoken"; // ✅ import the whole package
const { JsonWebTokenError } = jwt; // ✅ destructure what you need
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";

export const verifyJWT = asyncHandler(async (req, _, next) => {
  try {
    const Token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer", "");

    if (!Token) {
      throw new ApiError(401, "Unauthorized Access - No Token Provided");
    }

    const decodedToken = jwt.verify(Token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );
    if (!user) {
      // NEXT_VIDEO: dicess about frontend
      throw new ApiError(401, "Invalid Access Token - User Not Found");
    }

    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid Access Token");
  }
});
