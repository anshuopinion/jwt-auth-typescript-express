import { RequestHandler } from "express";
import validator from "../utils/validator";
import { bookSchema } from "./bookValidation";

export const getBookByIdValidation: RequestHandler = (req, res, next) =>
  validator(bookSchema.getBookById, req.body, next);
