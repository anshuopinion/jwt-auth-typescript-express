import { Router } from "express";
import { getBookById } from "../controllers/bookController";
import { authChecker } from "../middleware/authChecker";
import { getBookByIdValidation } from "../validation/bookValidation/bookSchema";

const router = Router();

router.post("/", authChecker, getBookByIdValidation,getBookById);


export default router;