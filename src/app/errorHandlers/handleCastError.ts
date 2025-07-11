import { Error } from "mongoose";
import { AppError } from "./AppError";

export const handleCastError = (err: Error.CastError) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(400, message);
};
