import { Router } from "express";
import { bookController } from "./book.controller";

export const bookRouter = Router();

bookRouter.post("/", bookController.addBook);
bookRouter.get("/", bookController.getAllBook);
bookRouter
  .route("/:id")
  .get(bookController.getBookById)
  .patch(bookController.updateBook)
  .delete(bookController.deleteABook);
