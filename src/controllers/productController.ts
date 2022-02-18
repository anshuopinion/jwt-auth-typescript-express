import { InternalServerError } from "http-errors";
import { RequestHandler } from "express";
import Product from "../model/Product";

export const getProductById: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);
    res.json(product);
  } catch (error) {
    return next(InternalServerError);
  }
};
