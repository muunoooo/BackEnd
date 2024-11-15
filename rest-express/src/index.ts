import express, { Request, Response, Application, response } from "express";
import { UserRouter } from "./routers/users.routers";

const PORT: number = 8000;

const app: Application = express();
app.use(express.json())
const userRouter = new UserRouter();

app.get("/api", (req: Request, res: Response) => {
  res.status(200).send("Hello, Welcome to my API");
});

app.use("/api/users", userRouter.getRouter())

app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});
