import { Router } from "express";
import { UserController } from "../controllers/user.controller";

export class UserRouter {
  private router: Router;
  private UserController: UserController;

  constructor() {
    this.UserController = new UserController();
    this.router = Router();
    this.initialzeRoutes();
  }

  private initialzeRoutes() {
    this.router.get("/", this.UserController.getUsers);
    this.router.get("/:id", this.UserController.getUserId);
    this.router.post("/", this.UserController.AddUser);
  }

  getRouter(): Router {
    return this.router;
  }
}
