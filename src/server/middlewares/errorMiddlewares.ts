import createDebug from "debug";
import chalk from "chalk";
import { type Request, type Response, type NextFunction } from "express";
import CustomError from "../../CustomError/CustomError.js";

const debug = createDebug("items-api: server/middlewares/errorMiddlewares.ts");

export const notFoundError = (
  _req: Request,
  _res: Response,
  next: NextFunction
) => {
  const error = new CustomError(404, "Endpoint not found");

  next(error);
};

export const generalError = (
  error: CustomError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const statusCode = error.statusCode || 500;

  const message = error.statusCode ? error.message : "Internal Server Error";

  debug(`Error: ${chalk.red(error.statusCode)} ${chalk.red(error.message)}`);

  res.status(statusCode).json({ message });
};
