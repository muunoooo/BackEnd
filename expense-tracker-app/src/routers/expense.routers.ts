import { Router } from "express";
import { ExpenseController } from "../controllers/expense.controller";

export class ExpenseRouter {
  private router: Router;
  private expenseController: ExpenseController;

  constructor() {
    this.expenseController = new ExpenseController();
    this.router = Router();
    this.initialzeRoutes();
  }

  private initialzeRoutes() {
    this.router.get("/", this.expenseController.getExpenseList);
    this.router.post("/", this.expenseController.AddExpense);


    this.router.get("/:id", this.expenseController.getExpenseId);
    this.router.patch("/:id", this.expenseController.EditExpense);
    this.router.delete("/:id", this.expenseController.DeleteExpense);
  }

  getRouter(): Router {
    return this.router;
  }
}
