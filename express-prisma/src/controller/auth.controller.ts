import { Request, Response } from "express";
import prisma from "../prisma";
import { genSalt, hash, compare } from "bcrypt";
import { findUser } from "../services/user.services";
import { sign } from "jsonwebtoken";

export class AuthController {
  async registerUser(req: Request, res: Response) {
    try {
      const { password, confirmPassword, username, email } = req.body;
      if (password != confirmPassword) throw "Password not match!";

      const user = await findUser(username, email);
      if (user) throw "username or email has already taken ! 🤦‍♂️";

      const salt = await genSalt(10);
      const hashPassword = await hash(password, salt);

      await prisma.user.create({
        data: { username, email, password: hashPassword },
      });
      res.status(201).send("Register Successfully✅");
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  }

  async loginUser(req: Request, res: Response) {
    try {
      const { data, password } = req.body;
      const user = await findUser(data, data);
      if (!user) throw "Account not found! 🤔";

      const isValidPass = await compare(password, user.password);
      if (!isValidPass) throw "Incorrect Password! ❌";

      const payload = { id: user.user_id, role: user.role };
      const token = sign(payload, process.env.JWT_KEY!, { expiresIn: "10m" });

      res.status(200).send({
        message: "Login Successfully!",
        token,
        user,
      });
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  }
}
