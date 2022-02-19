import { InternalServerError } from "http-errors";
import { RequestHandler } from "express";
import Order from "../model/Order";

export const getOrderById: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  try {
    const order = await Order.findById(id);
    res.json(order);
  } catch (error) {
    return next(InternalServerError);
  }
};
