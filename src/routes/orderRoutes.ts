import { Router } from "express";
import { getOrderById } from "../controllers/orderController";
import { authChecker } from "../middleware/authChecker";
import { getOrderByIdValidation } from "../validation/orderValidation/orderSchema";

const router = Router();

router.post("/", authChecker, getOrderByIdValidation,getOrderById);


export default router;