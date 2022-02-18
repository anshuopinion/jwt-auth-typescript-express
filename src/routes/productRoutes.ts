import { Router } from "express";
import { getProductById } from "../controllers/productController";
import { authChecker } from "../middleware/authChecker";
import { getProductByIdValidation } from "../validation/productValidation/productSchema";

const router = Router();

router.post("/", authChecker, getProductByIdValidation,getProductById);


export default router;