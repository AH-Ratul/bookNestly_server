import { AppError } from "./AppError";

export const handleDuplicateError = (err: any) => {
  const regex = /(["'])(\\?.)*?\1/;
  const value = err.errorResponse.errmsg.match(regex)[0];

  const message = `Duplicate value ${value}. please use another value`;
  return new AppError(400, message);
};
