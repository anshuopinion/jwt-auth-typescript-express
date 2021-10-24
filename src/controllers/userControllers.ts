import { RequestHandler } from "express";
import createHttpError, { InternalServerError } from "http-errors";
import User from "../model/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { FRONTEND_URL, JWT_KEY, transporter } from "../config";
import nodemailer from "nodemailer";
export const signupUser: RequestHandler = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return next(createHttpError(422, "Email Already Exist!"));

    const hashedPassword = await bcrypt.hash(password, 8);
    const user = new User({ name, email, password: hashedPassword });

    await user.save();

    res.json({ message: "User Created" });
  } catch (error) {
    return next(InternalServerError);
  }
};

export const signinUser: RequestHandler = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return next(createHttpError(404, "User not Found!"));

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword)
      return next(createHttpError(401, "Not Valid Password!"));

    const token = jwt.sign(
      {
        name: user.name,
        email: user.email,
        userId: user.id,
      },
      JWT_KEY,
      {
        expiresIn: "7d",
      }
    );

    res.cookie("jwt", token);

    res.json({ name: user.name, token });
  } catch (error) {
    return next(InternalServerError);
  }
};

export const sendUserVerificationMail: RequestHandler = async (
  req,
  res,
  next
) => {
  const { email }: { email: string } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) return next(createHttpError(404, "Email Not Found"));

    if (user.isUserVerified)
      return next(createHttpError(406, "Your Email is Already Verified"));

    const token = await bcrypt.hash(user._id.toString(), 8);

    const jwtToken = jwt.sign({ userId: user._id }, JWT_KEY, {
      expiresIn: "15m",
    });

    await user.updateOne({ $set: { verifyToken: token } });

    let info = await transporter.sendMail({
      from: '"dosomecoding 👻" <dosomecoding@example.com>', // sender address
      to: `${email}`, // list of receivers
      subject: "Email Verifacation Link", // Subject line
      // text: "Hello world?", // plain text body
      html: `Click on Link to verify your email: <a href="${FRONTEND_URL}/send-email/${jwtToken}"> Link </a>`, // html body
    });

    res.json({ message: `Preview URL: ${nodemailer.getTestMessageUrl(info)}` });
  } catch (error) {
    return next(InternalServerError);
  }
};

export const emailVerify: RequestHandler = async (req, res, next) => {
  const { token }: { token: string } = req.body;
  try {
    const decodedToken: any = jwt.decode(token);
    const user = await User.findById(decodedToken.userId);
    if (!user) return next(createHttpError(401, "Invalid Token"));

    const isValid = await bcrypt.compare(decodedToken.userId, user.verifyToken);
    if (!isValid) return next(createHttpError(401, "Invalid Token"));

    await user.updateOne({
      $set: { isUserVerified: true },
      $unset: { verifyToken: 0 },
    });
    res.json({ message: "Email Verfied" });
  } catch (error) {
    return next(InternalServerError);
  }
};

export const forgotPassMail: RequestHandler = async (req, res, next) => {
  const { email }: { email: string } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) return next(createHttpError(404, "Email Not Found"));

    const token = await bcrypt.hash(user._id.toString(), 8);

    const jwtToken = jwt.sign({ userId: user._id }, JWT_KEY, {
      expiresIn: "15m",
    });

    await user.updateOne({ $set: { verifyToken: token } });

    let info = await transporter.sendMail({
      from: '"dosomecoding 👻" <dosomecoding@example.com>', // sender address
      to: `${email}`, // list of receivers
      subject: "Email Verifacation Forgot Password Link", // Subject line
      // text: "Hello world?", // plain text body
      html: `Click to change password: <a href="${FRONTEND_URL}/send-email/${jwtToken}"> Link </a>`, // html body
    });

    res.json({ message: `Preview URL: ${nodemailer.getTestMessageUrl(info)}` });
  } catch (error) {
    return next(InternalServerError);
  }
};

export const changePassword: RequestHandler = async (req, res, next) => {
  const { token, password }: { token: string; password: string } = req.body;
  try {
    const decodedToken: any = jwt.decode(token);
    const user = await User.findById(decodedToken.userId);
    if (!user) return next(createHttpError(401, "Invalid Token"));

    const isValid = await bcrypt.compare(decodedToken.userId, user.verifyToken);
    if (!isValid) return next(createHttpError(401, "Invalid Token"));

    const hashedPassword = await bcrypt.hash(password, 8);
    await user.updateOne({
      $set: { password: hashedPassword },
      $unset: { verifyToken: 0 },
    });
    res.json({ message: "Password Changed" });
  } catch (error) {
    return next(createHttpError(401, "Invalid Token"));
  }
};
