import { Router } from "express";
import { loginUserController } from "../controllers/usersControllers";

export const loginRouter = Router();

loginRouter.post("", loginUserController);
