import { Request, Response } from "express";
import prisma from "../prisma";

export class BlogController {
  async getBlog(req: Request, res: Response) {
    try {
      const blogs = await prisma.blog.findMany({
        // include: { user: true },
        select: {
          user_id: true,
          title: true,
          thumbnail: true,
          category: true,
          slug: true,
          createdAt: true,
          user: {
            select: {
              username: true,
              email: true,
              avatar: true,
            },
          },
        },
      });
      res.status(200).send({ blogs });
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  }

  async getBlogSlug(req: Request, res: Response) {
    try {
      const { slug } = req.params;
      const blog = await prisma.blog.findUnique({
        where: { slug: slug },
        select: {
          user_id: true,
          title: true,
          slug: true,
          content: true,
          category: true,
          thumbnail: true,
          createdAt: true,
          user: {
            select: {
              username: true,
            },
          },
        },
      });
      res.status(200).send({ blog });
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  }
}
