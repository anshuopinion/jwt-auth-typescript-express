import { RequestHandler } from "express"; import validator from
"../utils/validator"; import {
productSchema } from "./productValidation"; export const
getProductByIdValidation: RequestHandler = (req, res, next) =>
validator(productSchema.getProductById, req.body, next);