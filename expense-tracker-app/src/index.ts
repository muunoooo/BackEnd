import express, { Application, Request, Response } from "express";
import { ExpenseRouter } from "./routers/expense.routers";
import cors from "cors";

const PORT: number = 8000;

const app: Application = express();
app.use(cors());
app.use(express.json());

app.get("/api", (req: Request, res: Response) => {
  res.status(200).send("This is my expense list!");
});

const expenseRouter = new ExpenseRouter();

app.use("/api/expense", expenseRouter.getRouter());

app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}/api`);
});
