import express from "express";
import morgan from "morgan";
import cors from "cors";
import { generalError, notFoundError } from "./middlewares/errorMiddlewares.js";

const allowedOrigins = ["http://localhost:4010"];

const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

const app = express();

app.use(cors(options));

app.disable("x-powered-by");

app.use(morgan("dev"));

app.use(express.json());

app.use(notFoundError);

app.use(generalError);

export default app;
