import { ErrorRequestHandler } from "express";
import { AppError } from "../errorHandlers/AppError";
import config from "../config";
import { handleDuplicateError } from "../errorHandlers/handleDuplicateError";
import { handleValidationError } from "../errorHandlers/handleValidationError";
import { handleCastError } from "../errorHandlers/handleCastError";

export const globarErrorHandler: ErrorRequestHandler = (err, __, res, ___) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Something went wrong!!";

  if (err instanceof AppError) {
    (statusCode = err?.statusCode), (message = err?.message);
  } else if (err?.code === 11000) {
    const simlifiedError = handleDuplicateError(err);
    statusCode = simlifiedError?.statusCode;
    message = simlifiedError?.message;
  } else if (err?.name === "ValidationError") {
    const simlifiedError = handleValidationError(err);
    statusCode = simlifiedError?.statusCode;
    message = simlifiedError?.message;
  } else if (err?.name === "CastError") {
    const simlifiedError = handleCastError(err);
    statusCode = simlifiedError?.statusCode;
    message = simlifiedError?.message;
  }

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    error: config.NODE_ENV === "development" ? err : null,
    stack: config.NODE_ENV === "development" ? err.stack : null,
  });
};
