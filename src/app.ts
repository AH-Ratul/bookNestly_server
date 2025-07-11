import express, { Application, Response } from "express";
import cors from "cors";
import { appRouter } from "./app/routes";
import { notFound } from "./app/middlewares/notFound";
import { globarErrorHandler } from "./app/middlewares/globalErrorHandlers";

export const app: Application = express();

app.use(
  cors({
    origin: ['http://localhost:5173', 'https://booknestly.vercel.app']
   })
);

app.use(express.json());

app.use("/api", appRouter);

app.get("/", (_, res: Response) => {
  res.send("BookNestly app running..");
});

app.use(globarErrorHandler);

app.use(notFound);
