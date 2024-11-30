import { RoleUser } from "@prisma/client";
import "express";

export type UserPayload = {
  id: number;
  role: RoleUser;
};

declare global {
  namespace Express {
    export interface Request {
      user?: UserPayload;
    }
  }
}
