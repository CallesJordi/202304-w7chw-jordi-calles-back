import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Types } from "mongoose";
import { type Response } from "express";
import {
  type UserStructure,
  type UserLoginRequestStrucuture,
} from "../../types";
import User from "../../../database/models/User.js";
import { loginUser } from "./userController.js";
import CustomError from "../../../CustomError/CustomError.js";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given a loginUser controller", () => {
  const req: Partial<UserLoginRequestStrucuture> = {
    body: {
      username: "blackbeard",
      password: "blackbeard",
    },
  };
  const res: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  const next = jest.fn();

  describe("When it receives a request with valid credentials and a response", () => {
    const token = "mock-token";
    test("Then it should call the response's method status with 200", async () => {
      const mockUser: UserStructure = {
        _id: new Types.ObjectId().toString(),
        name: "",
        username: "blackbeard",
        password: "blackbeard",
        imgUrl: "",
        friends: [],
        enemies: [],
      };
      const expectedStatusCode = 200;

      User.findOne = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockUser),
      });

      bcrypt.compare = jest.fn().mockResolvedValue(true);

      jwt.sign = jest.fn().mockReturnValue(token);

      await loginUser(req as UserLoginRequestStrucuture, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call the response's method json with the token", async () => {
      await loginUser(req as UserLoginRequestStrucuture, res as Response, next);

      expect(res.json).toHaveBeenCalledWith({ token });
    });
  });

  describe("When it receives a request with a wrong password and a next function", () => {
    test("Then it should call the next function with a 401 and 'Wrong credentials' message", async () => {
      const expectedError = new CustomError(401, "Wrong credentials");

      bcrypt.compare = jest.fn().mockResolvedValue(false);

      await loginUser(req as UserLoginRequestStrucuture, res as Response, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
