import express, { type Request, type Response } from "express";
import { BookRoutes } from "./modules/book/book.routes.js";
import { BorrowRoutes } from "./modules/borrow/borrow.routes.js";
import { globalErrorHandler } from "./middlewares/errorHandler.js";
import cors from "cors";

const app = express();

app.use(express.json());

app.use(cors({ origin: "*" }));


app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Welcome to library management app server!",
  });
});

app.use("/api/books", BookRoutes);
app.use("/api/borrow", BorrowRoutes);

app.use(globalErrorHandler);

export default app;
