import { Error } from "mongoose";
import { AppError } from "./AppError";

export const handleValidationError = (err: Error.ValidationError) => {
  const errors = Object.values(err.errors).map((val) => val.message);
  const message = `${errors.join(". ")}`;

  return new AppError(400, message);
};
