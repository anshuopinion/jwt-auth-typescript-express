import Joi from "joi";

export const orderSchema = {
  getOrderById: Joi.object({
    id: Joi.number().required(),
  }),
};
