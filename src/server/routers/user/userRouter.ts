import { Router } from "express";
import { loginUser } from "../../controllers/user/userController.js";

const userRouter = Router();

userRouter.post("/login", loginUser);

export default userRouter;
