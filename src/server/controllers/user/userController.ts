import bcrypt from "bcryptjs";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { type Response, type NextFunction } from "express";
import { type UserLoginRequestStrucuture } from "../../types.js";
import User from "../../../database/models/User.js";
import CustomError from "../../../CustomError/CustomError.js";

export const loginUser = async (
  req: UserLoginRequestStrucuture,
  res: Response,
  next: NextFunction
) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username }).exec();

    if (!user || !(await bcrypt.compare(password, user.password))) {
      const error = new CustomError(401, "Wrong credentials");

      throw error;
    }

    const tokenPayload: JwtPayload = {
      sub: user._id.toString(),
      name: user.username,
    };

    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET!, {
      expiresIn: "2d",
    });

    res.status(200).json({ token });
  } catch (error: unknown) {
    next(error);
  }
};
