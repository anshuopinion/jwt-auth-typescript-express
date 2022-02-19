import { Router } from "express";
import { getTestById } from "../controllers/testController";
import { authChecker } from "../middleware/authChecker";
import { getTestByIdValidation } from "../validation/testValidation/testSchema";

const router = Router();

router.post("/", authChecker, getTestByIdValidation,getTestById);


export default router;