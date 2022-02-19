import { RequestHandler } from "express";
import validator from "../utils/validator";
import { orderSchema } from "./orderValidation";

export const getOrderByIdValidation: RequestHandler = (req, res, next) =>
  validator(orderSchema.getOrderById, req.body, next);
