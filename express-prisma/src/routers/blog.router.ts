import { Router } from "express";
import { BlogController } from "../controller/blog.controller";

export class BlogRouter {
  private blogController: BlogController;
  private router: Router;

  constructor() {
    this.blogController = new BlogController();
    this.router = Router();
    this.initialize();
  }

  private initialize() {
    this.router.get("/", this.blogController.getBlog);

    this.router.get("/:slug", this.blogController.getBlogSlug);
  }

  getRouter(): Router {
    return this.router;
  }
}
