import { Router } from "express";
import { borrowController } from "./borrow.controller";

export const borrowRouter = Router();

borrowRouter.post("/", borrowController.borrowABook);
borrowRouter.get("/", borrowController.borrowSummary);
