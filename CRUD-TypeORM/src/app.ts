import "reflect-metadata";
import express from "express";
import "express-async-errors";
import { userRouters } from "./routers/userRouter";
import { errorIdentify } from "./errors/appError";
import { loginRouter } from "./routers/loginRouter";

const app = express();
app.use(express.json());

app.use("/users", userRouters);

app.use("/login", loginRouter);

app.use(errorIdentify);

export default app;
