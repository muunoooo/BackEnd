import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { UserMiddleware } from "../middlewares/user.middleware";

export class UserRouter {
  private router: Router;
  private UserController: UserController;
  private UserMiddleWare: UserMiddleware;

  constructor() {
    this.UserController = new UserController();
    this.UserMiddleWare = new UserMiddleware();
    this.router = Router();
    this.initialzeRoutes();
  }

  private initialzeRoutes() {
    this.router.get("/", this.UserController.getUsers);
    this.router.get(
      "/:id",
      this.UserMiddleWare.checkId,
      this.UserController.getUserId
    );
    this.router.post("/", this.UserController.AddUser);
    this.router.patch(
      "/:id",
      this.UserMiddleWare.checkId,
      this.UserController.EditUser
    );
    this.router.delete(
      "/:id",
      this.UserMiddleWare.checkId,
      this.UserController.DeleteUser
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
