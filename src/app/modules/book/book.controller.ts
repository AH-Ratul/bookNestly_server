import { Request, Response } from "express";
import { tryCatch } from "../../utils/tryCatch";
import { Book } from "./book.model";

const addBook = tryCatch(async (req: Request, res: Response) => {
  await Book.create(req.body);

  res.status(201).json({
    success: true,
    message: "Book Created",
  });
});

const getAllBook = tryCatch(async (_, res: Response) => {
  const result = await Book.find();

  res.status(200).json({
    success: true,
    result,
  });
});

const getBookById = tryCatch(async (req: Request, res: Response) => {
  const bookId = req.params.id;

  const result = await Book.findById(bookId);

  res.status(200).json({
    success: true,
    result,
  });
});

const updateBook = tryCatch(async (req: Request, res: Response) => {
  const { id } = req.params;
  const body = req.body;

  if (typeof body.copies === "number") {
    body.available = body.copies > 0; // true if copies > 0, false otherwise
  }

  await Book.findByIdAndUpdate(id, body, { new: true });

  res.status(200).json({
    success: true,
    message: "Book Successfully Updated",
  });
});

const deleteABook = tryCatch(async (req: Request, res: Response) => {
  const { id } = req.params;

  await Book.findByIdAndDelete(id);

  res.status(200).json({
    success: true,
    message: "Book Deleted",
  });
});

export const bookController = {
  addBook,
  getAllBook,
  getBookById,
  updateBook,
  deleteABook,
};
