import express, { Application, query, Request, Response } from "express";
import { ExpenseRouter } from "./routers/expense.routers";
import cors from "cors";
import "dotenv/config";
import pool from "./config/db";
import { ExpenseV2Routers } from "./routers/expensev2.routers";

const PORT: number = 8000;

const app: Application = express();
app.use(cors());
app.use(express.json());

app.get("/api", (req: Request, res: Response) => {
  res.status(200).send("This is my expense list!");
});

const expenseRouter = new ExpenseRouter();
const expenseV2Router = new ExpenseV2Routers();

app.use("/api/expense", expenseRouter.getRouter());
app.use("/api/v2/expense", expenseV2Router.getRouter());

pool.connect((err, client, release) => {
  if (err) {
    return console.log("Error acquaring client", err.stack);
  }
  if (client) {
    client.query("SET search_path to test", (queryErr) => {
      if (queryErr) {
        console.error("Error setting search path", queryErr.stack);
      } else {
        console.log('Success connection "test"✅');
      }

      release();
    });
  }
});

app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}/api`);
});
