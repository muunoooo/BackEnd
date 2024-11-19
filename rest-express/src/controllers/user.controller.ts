import { Request, Response } from "express";
// fs adalah file system, untuk membaca value dari json
import fs from "fs";
import { IUser } from "../types/user";

export class UserController {
  getUsers(req: Request, res: Response) {
    const { name } = req.query;
    let users: IUser[] = JSON.parse(
      fs.readFileSync("./db/users.json", "utf-8")
    );

    if (name) {
      users = users.filter((item) =>
        item.name.toLowerCase().includes(name as string)
      );
    }

    res.status(200).send({ users });
  }
  getUserId(req: Request, res: Response) {
    const users: IUser[] = JSON.parse(
      fs.readFileSync("./db/users.json", "utf-8")
    );
    const { id } = req.params;
    const data = users.find((item) => item.id == +id); // parseInt (id) atau Number (id) atau +

    res.status(200).send({ user: data });
  }

  AddUser(req: Request, res: Response) {
    const users: IUser[] = JSON.parse(
      fs.readFileSync("./db/users.json", "utf-8")
    );
    const id = Math.max(...users.map((item) => item.id)) + 1;
    const { name, email, password } = req.body;
    const newData: IUser = { id, name, email, password };
    users.push(newData);

    fs.writeFileSync("./db/users.json", JSON.stringify(users), "utf-8");

    res.status(201).send({ user: newData });
  }

  EditUser(req: Request, res: Response) {
    const { id } = req.params;
    const users: IUser[] = JSON.parse(
      fs.readFileSync("./db/users.json", "utf-8")
    );

    const idx: number = users.findIndex((item) => item.id == +id);
    users[idx] = { ...users[idx], ...req.body };

    fs.writeFileSync("./db/users.json", JSON.stringify(users), "utf-8");

    res.status(200).send("Edit succesfully!");
  }

  DeleteUser(req: Request, res: Response) {
    const { id } = req.params;
    const users: IUser[] = JSON.parse(
      fs.readFileSync("./db/users.json", "utf-8")
    );

    const newUsers = users.filter((item) => item.id != +id);

    fs.writeFileSync("./db/users.json", JSON.stringify(newUsers), "utf-8");

    res.status(200).send("Delete succesfully!");
  }
}
