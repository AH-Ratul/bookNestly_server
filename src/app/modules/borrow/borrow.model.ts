import { model, Schema, Types } from "mongoose";
import { IBorrow } from "../../interfaces/borrow.interface";

const borrowSchema = new Schema<IBorrow>({
  book: {
    type: Schema.Types.ObjectId,
    ref: "Book",
    required: [true, "Book id is required"],
  },
  quantity: {
    type: Number,
    min: 1,
    required: [true, "Qunatity is required"],
  },
  dueDate: {
    type: Date,
    required: [true, "Due Date required"],
  },
});

export const Borrow = model<IBorrow>("Borrow", borrowSchema);
