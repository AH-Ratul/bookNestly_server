import { model, Schema } from "mongoose";
import { IBook } from "../../interfaces/book.interface";

const bookSchema = new Schema<IBook>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    author: {
      type: String,
      required: [true, "Author is required"],
    },
    genre: {
      type: String,
      required: [true, "Genre is required"],
    },
    isbn: {
      type: String,
      required: [true, "ISBN is required"],
      unique: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    copies: {
      type: Number,
      required: [true, "Copies is required"],
      min: [0, "Copies must be a positive number"],
    },
    available: {
      type: Boolean,
      default: true,
    },
    createdAt: {
      type: Date,
    },
    updatedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

export const Book = model<IBook>("books", bookSchema);
