import { RequestHandler } from "express";
import validator from "../utils/validator";
import { testSchema } from "./testValidation";

export const getTestByIdValidation: RequestHandler = (req, res, next) =>
  validator(testSchema.getTestById, req.body, next);
