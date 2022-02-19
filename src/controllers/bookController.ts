import { InternalServerError } from "http-errors";
import { RequestHandler } from "express";
import Book from "../model/Book";

export const getBookById: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  try {
    const book = await Book.findById(id);
    res.json(book);
  } catch (error) {
    return next(InternalServerError);
  }
};
