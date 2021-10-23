import { RequestHandler } from "express";
import validator from "../utils/validator";
import { userSchema } from "./userSchema";

export const signupUserValidation: RequestHandler = (req, res, next) =>
  validator(userSchema.signupUser, req.body, next);
export const signinUserValidation: RequestHandler = (req, res, next) =>
  validator(userSchema.signinUser, req.body, next);
