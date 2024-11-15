import { Request, Response } from "express";
// fs adalah file system, untuk membaca value dari json
import fs from "fs";
import { IUser } from "../types/user";
import { json } from "stream/consumers";

export class UserController {
  getUsers(req: Request, res: Response) {
    const users: IUser[] = JSON.parse(
      fs.readFileSync("./db/users.json", "utf-8")
    );
    res.status(200).send({ users });
  }
  getUserId(req: Request, res: Response) {
    const users: IUser[] = JSON.parse(
      fs.readFileSync("./db/users.json", "utf-8")
    );
    const { id } = req.params;
    const data = users.find((item) => item.id == +id); // parseInt (id) atau Number (id) atau +
    if (data) {
      res.status(200).send({ user: data });
    } else {
      res.status(404).send({ message: "User not Found" });
    }
  }

  AddUser(req: Request, res: Response) {
    const users: IUser[] = JSON.parse(
      fs.readFileSync("./db/users.json", "utf-8")
    );
    const id = Math.max(...users.map((item) => item.id)) + 1;
    const { name, email, password } = req.body;
    const newData: IUser = { id, name, email, password };
    users.push(newData);

    fs.writeFileSync("./db/users.json", JSON.stringify(users) , "utf-8")

    res.status(200).send({ user: newData });
  }
}
