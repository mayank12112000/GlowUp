import {Router} from "express";
import { getAllProducts,createProduct } from "../controllers/product.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()

router.route("/").post(verifyJWT,createProduct)
router.route("/").get(getAllProducts)

export default router