import { InternalServerError } from "http-errors";
import { RequestHandler } from "express";
import Test from "../model/Test";

export const getTestById: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  try {
    const test = await Test.findById(id);
    res.json(test);
  } catch (error) {
    return next(InternalServerError);
  }
};
