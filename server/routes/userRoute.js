import express from "express";
import { auth, register } from "../controller/userController.js";

const logRouter = express.Router();

logRouter.get("/", auth);
logRouter.post("/register", register);

export default logRouter;
