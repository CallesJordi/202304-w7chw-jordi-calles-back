import { Error } from "mongoose";
import CustomError from "../../CustomError/CustomError.js";
import { generalError, notFoundError } from "./errorMiddlewares.js";
import { type NextFunction, type Response, type Request } from "express";

type CustomResponse = Pick<Response, "status" | "json">;

const res: CustomResponse = {
  json: jest.fn(),
  status: jest.fn().mockReturnThis(),
};

const req = {};

const next = jest.fn();

describe("Given a notFoundError function", () => {
  describe("When it receives a next function", () => {
    test("Then it should call it with the custom error with status code 404 and message 'Sorry endpoint not found'", () => {
      const customError = new CustomError(404, "Endpoint not found");

      notFoundError(req as Request, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith(customError);
    });
  });
});

describe("Given an generalError function", () => {
  describe("When it's called and receives an unknown error", () => {
    test("Then it should call a response with an status code 500 and a 'Internal Server Error' messasge", () => {
      const error = new Error("Internal Server Error");
      const statusCode = 500;
      const { message } = error;

      generalError(
        error as CustomError,
        req as Request,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(statusCode);
      expect(res.json).toHaveBeenCalledWith({ message });
    });
  });
});
