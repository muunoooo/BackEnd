import { Request, Response } from "express";
import prisma from "../prisma";

export class OrderController {
  async createOrder(req: Request, res: Response) {
    try {
      const { price } = req.body;
      const order = await prisma.order.create({
        data: { price, user_id: req.user?.id, expiredAt: "" },
      });
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  }
}
