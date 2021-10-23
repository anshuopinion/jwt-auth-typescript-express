import { Router } from "express";
import { signinUser, signupUser } from "../controllers/userControllers";
import {
  signupUserValidation,
  signinUserValidation,
} from "../validation/userValidation/userValidation";

const router = Router();

router.post("/signup", signupUserValidation, signupUser);
router.post("/signin", signinUserValidation, signinUser);

export default router;
