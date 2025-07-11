import { Router } from "express";
import { bookRouter } from "../modules/book/book.routes";
import { borrowRouter } from "../modules/borrow/borrow.routes";

export const appRouter = Router();

appRouter.use("/books", bookRouter);
appRouter.use("/borrow", borrowRouter);
