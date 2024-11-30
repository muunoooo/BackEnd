import express, { Application, Request, Response } from "express";
import cors from "cors";
import { UserRotuer } from "./routers/user.router";
import { BlogRouter } from "./routers/blog.router";
import { AuthRouter } from "./routers/auth.router";

const PORT: number = 8000;

const app: Application = express();
app.use(express.json());
app.use(cors());

app.get("/api", (req: Request, res: Response) => {
  res.status(200).send("Welcome to my Api");
});

const userRouter = new UserRotuer();
const blogRouter = new BlogRouter();
const authRouter = new AuthRouter();

app.use("/api/users", userRouter.getRouter());
app.use("/api/blogs", blogRouter.getRouter());
app.use("/api/auth", authRouter.getRouter());


app.listen(PORT, () => {
  console.log(`service running on -> http://localhost:${PORT}/api`);
});
