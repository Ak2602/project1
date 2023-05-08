import express from "express";
import { auth, register } from "../controller/userController.js";
import { dashboard } from "../controller/dashboard.js";

const logRouter = express.Router();

logRouter.get("/", auth);
logRouter.post("/dashboard/:id", dashboard);
logRouter.post("/register", register);

export default logRouter;
