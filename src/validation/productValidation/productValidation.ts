import Joi from "joi";

export const productSchema = {
  getProductById: Joi.object({
    id: Joi.number().required(),
  }),
};
