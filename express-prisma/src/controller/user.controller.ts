import { Request, Response } from "express";
import prisma from "../prisma";
import { Prisma } from "@prisma/client";
import { cloudinaryUpload } from "../services/cloudinary";

export class UserController {
  async getUsers(req: Request, res: Response) {
    console.log(req.user);
    try {
      const { search, page = 1, limit = 100 } = req.query;

      const filter: Prisma.UserWhereInput = {};
      if (search) {
        // untuk mencari query hanya untuk 1 saja
        // filter.username = { contains: search as string };

        filter.OR = [
          { username: { contains: search as string, mode: "insensitive" } },
          { email: { contains: search as string, mode: "insensitive" } },
        ];
      }

      const counUser = await prisma.user.aggregate({ _count: { _all: true } });
      const total_page = Math.ceil(counUser._count._all / +limit);

      const users = await prisma.user.findMany({
        where: filter,
        orderBy: { user_id: "asc" },
        take: +limit,
        skip: +limit * (+page - 1),
      });
      res.status(200).send({ total_page, page, users });
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  }

  async getUserId(req: Request, res: Response) {
    try {
      const user = await prisma.user.findUnique({
        where: { user_id: req.user?.id },
      });
      res.status(200).send({ user });
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  }

  async createUser(req: Request, res: Response) {
    try {
      await prisma.user.create({ data: req.body });
      res.status(201).send("User Created!😁");
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  }

  async editUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await prisma.user.update({ data: req.body, where: { user_id: +id } });
      res.status(200).send("User Edited!👌");
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  }

  async deleteUser(req: Request, res: Response) {
    const { id } = req.params;
    try {
      await prisma.user.delete({ where: { user_id: +id } });
      res.status(200).send("User Deleted!😢");
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  }

  async editAvatar(req: Request, res: Response) {
    try {
      if (!req.file) throw { message: "file empty!" };
      const link = `http://localhost:8000/api/public/avatar/${req.file.filename}`;
      await prisma.user.update({
        data: { avatar: link },
        where: { user_id: req.user?.id },
      });

      res.status(200).send({ message: "avatar edited!" });
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  }

  async editAvatarCloud(req: Request, res: Response) {
    try {
      if (!req.file) throw { message: "file empty!" };

      const { secure_url } = await cloudinaryUpload(req.file, "avatar");

      await prisma.user.update({
        data: { avatar: secure_url },
        where: { user_id: req.user?.id },
      });

      res.status(200).send({ message: "avatar edited!" });
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  }
}
