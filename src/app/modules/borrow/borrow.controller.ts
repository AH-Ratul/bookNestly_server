import { NextFunction, Request, Response } from "express";
import { tryCatch } from "../../utils/tryCatch";
import { Borrow } from "./borrow.model";
import { Book } from "../book/book.model";
import { AppError } from "../../errorHandlers/AppError";

const borrowABook = tryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;

    const book = await Book.findById(body.book);

    if (!book) {
      return next(new AppError(404, "Book not found"));
    }

    if (book.copies < body.quantity) {
      return next(new AppError(400, "You exceed the book copies"));
    }

    if (book) {
      book.copies -= body.quantity;
      await book.save();
    }

    if (book.copies === 0) {
      book.available = false;
      await book.save();
    }

    await Borrow.create(req.body);

    res.status(201).json({
      success: true,
      message: "Book is borrowed successfully",
    });
  }
);

const borrowSummary = tryCatch(async (req: Request, res: Response) => {
  const result = await Borrow.aggregate([
    {
      $lookup: {
        from: "books",
        localField: "book",
        foreignField: "_id",
        as: "book",
      },
    },
    { $unwind: "$book" },
    {
      $group: {
        _id: "$book",
        title: { $first: "$book.title" },
        isbn: { $first: "$book.isbn" },
        totalQuantity: { $sum: "$quantity" },
      },
    },
    {
      $project: {
        _id: 0,
        book: {
          title: "$title",
          isbn: "$isbn",
        },
        totalQuantity: 1,
      },
    },
  ]);

  res.status(200).json({
    success: true,
    result,
  });
});

export const borrowController = {
  borrowABook,
  borrowSummary
};
