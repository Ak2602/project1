import express from "express";
import { processor } from "../controller/loanController.js";

const proRouter = express.Router();

proRouter.post("/loan/:id", processor);

export default proRouter;
