import express, { ErrorRequestHandler } from "express";
import createHttpError from "http-errors";
// Routes_Path_Generator
import bookRoute from "./routes/bookRoutes";
import orderRoute from "./routes/orderRoutes";
import productRoute from "./routes/productRoutes";
import userRoute from "./routes/userRoutes";
import mongoose from "mongoose";
import { DB, PORT } from "./config";
import { errorHandler } from "./middleware/errorHanlder";
import passport from "passport";
import kPassport from "./middleware/passport";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(cookieParser());

app.use(passport.initialize());
kPassport(passport);
// Routes_Generator
app.use("/book", bookRoute);
app.use("/order", orderRoute);
app.use("/product", productRoute);
app.use("/user", userRoute);

app.use(() => {
  throw createHttpError(404, "Route not found");
});

app.use(errorHandler);

mongoose
  .connect(DB)
  .then(() => {
    console.log("Connected to db");
    app.listen(PORT, () => {
      console.log(`Listening On PORT ${PORT}`);
    });
  })
  .catch(() => {
    throw createHttpError(501, "Unable to connect database");
  });
