import Joi from "joi";

export const testSchema = {
  getTestById: Joi.object({
    id: Joi.number().required(),
  }),
};
