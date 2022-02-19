import Joi from "joi";

export const bookSchema = {
  getBookById: Joi.object({
    id: Joi.number().required(),
  }),
};
