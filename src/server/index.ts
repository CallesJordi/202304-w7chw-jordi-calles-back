import express from "express";
import morgan from "morgan";
import cors from "cors";
import { generalError, notFoundError } from "./middlewares/errorMiddlewares.js";
import userRouter from "./routers/user/userRouter.js";

const app = express();

const allowedOrigins = [
  "http://localhost:4010",
  "https://202304-w7chwe-jordi-calles-front.netlify.app/",
];

const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

app.use(cors(options));

app.disable("x-powered-by");

app.use(morgan("dev"));

app.use(express.json());

app.use("/user", userRouter);

app.use(notFoundError);

app.use(generalError);

export default app;
