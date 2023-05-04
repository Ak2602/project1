import express from "express";
import { selection } from "../controller/selectController.js";

const selRouter = express.Router();

selRouter.post("/banks", selection);

export default selRouter;
