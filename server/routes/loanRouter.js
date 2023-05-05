import express from "express";
import { processor } from "../controller/loanController.js";
import { openLoan } from "../controller/openLoan.js";

const proRouter = express.Router();

proRouter.post("/loan/:id", processor);

proRouter.post("/open/:id", openLoan);

export default proRouter;
