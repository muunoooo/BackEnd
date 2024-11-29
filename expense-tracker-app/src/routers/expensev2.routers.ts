import { Router } from "express";
import { ExpenseV2controller } from "../controllers/expensev2.controller";

export class ExpenseV2Routers {
  private router: Router;
  private expenseV2Controller: ExpenseV2controller;

  constructor() {
    this.router = Router();
    this.expenseV2Controller = new ExpenseV2controller();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get("/", this.expenseV2Controller.getExpense);
    this.router.post("/", this.expenseV2Controller.addExpense);

    this.router.get("/:id", this.expenseV2Controller.getExpenseId);
    this.router.patch("/:id", this.expenseV2Controller.editExpense);
    this.router.delete("/:id", this.expenseV2Controller.deleteExpense);
  }

  getRouter(): Router {
    return this.router;
  }
}
