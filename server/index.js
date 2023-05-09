import express from "express";
import logRouter from "./routes/userRoute.js";
import selRouter from "./routes/bankSelection.js";
import proRouter from "./routes/loanRouter.js";

const app = express();
const port = process.env.port || 3000;

app.use(express.json());

app.use("/user", logRouter);
app.use("/bank", selRouter);
app.use("/loan", proRouter);

app.listen(port, () => {
  console.log(`server is stable at ${port}`);
});
