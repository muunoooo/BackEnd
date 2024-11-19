import { Request, Response } from "express";
import { IExpense } from "../../types/expense";
import fs from "fs";

export class ExpenseController {
  getExpenseList(req: Request, res: Response) {
    const { category, start, end } = req.query;
    let expenseList: IExpense[] = JSON.parse(
      fs.readFileSync("./db/expense.json", "utf-8")
    );

    expenseList = expenseList.filter((item) => {
      let isValid: boolean = true;

      if (category) {
        isValid = isValid && item.category == category;
      }
      if (start && end) {
        const startDate = new Date(start as string);
        const endDate = new Date(end as string);
        const expenseDate = new Date(item.date);

        isValid = isValid && expenseDate >= startDate && expenseDate <= endDate;
      }
      return isValid;
    });

    const nominal_income = expenseList
      .filter((item) => item.type == "income")
      .reduce((a, b) => a + b.nominal, 0);

    const nominal_expense = expenseList
      .filter((item) => item.type == "expense")
      .reduce((a, b) => a + b.nominal, 0);

    res.status(200).send({ nominal_income, nominal_expense, expenseList });
  }

  getExpenseId(req: Request, res: Response) {
    const expenseList: IExpense[] = JSON.parse(
      fs.readFileSync("./db/expense.json", "utf-8")
    );

    const { id } = req.params;
    const data = expenseList.find((item) => item.id == +id);

    if (data) {
      res.status(200).send({ expense: data });
    }
    {
      res.status(404).send("Expense Invalid!");
    }
  }

  AddExpense(req: Request, res: Response) {
    const expenseList: IExpense[] = JSON.parse(
      fs.readFileSync("./db/expense.json", "utf-8")
    );

    const maxId = Math.max(...expenseList.map((item) => item.id));
    const id = expenseList.length == 0 ? 1 : maxId + 1;
    const { title, type, nominal, category, date } = req.body;
    const newExpense = { id, title, nominal, type, category, date };
    expenseList.push(newExpense);

    fs.writeFileSync("./db/expense.json", JSON.stringify(expenseList), "utf-8");

    res.status(200).send("Expenses Added! ⚡");
  }

  EditExpense(req: Request, res: Response) {
    const { id } = req.params;
    const expenseList: IExpense[] = JSON.parse(
      fs.readFileSync("./db/expense.json", "utf-8")
    );

    const idx: number = expenseList.findIndex((item) => item.id == +id);
    expenseList[idx] = { ...expenseList[idx], ...req.body };

    fs.writeFileSync("./db/expense.json", JSON.stringify(expenseList), "utf-8");

    res.status(200).send(`Edit Expense with id ${id} Succesfully!`);
  }

  DeleteExpense(req: Request, res: Response) {
    const { id } = req.params;
    const expenseList: IExpense[] = JSON.parse(
      fs.readFileSync("./db/expense.json", "utf-8")
    );

    const newExpenseList = expenseList.filter((item) => item.id != +id);
    fs.writeFileSync(
      "./db/expense.json",
      JSON.stringify(newExpenseList),
      "utf-8"
    );
    res.status(200).send("Delete Expense Succesfully!");
  }
}
