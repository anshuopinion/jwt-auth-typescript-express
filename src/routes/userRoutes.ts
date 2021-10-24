import { Router } from "express";
import {
  changePassword,
  emailVerify,
  forgotPassMail,
  sendUserVerificationMail,
  signinUser,
  signupUser,
} from "../controllers/userControllers";
import {
  signupUserValidation,
  signinUserValidation,
} from "../validation/userValidation/userValidation";

const router = Router();

router.post("/signup", signupUserValidation, signupUser);
router.post("/signin", signinUserValidation, signinUser);
router.post("/send-verification-mail", sendUserVerificationMail);
router.post("/verfiy-user-mail", emailVerify);
router.post("/forgot-password", forgotPassMail);
router.post("/verify-forgot-mail", changePassword);

export default router;
