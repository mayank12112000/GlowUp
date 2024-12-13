import { Router } from "express";
import { verifyJWT } from './../middlewares/auth.middleware.js';
import { addServiceType, getAllServiceTypes } from "../controllers/serviceType.controller.js";
const router = Router()

router.route("/getServiceType").get(getAllServiceTypes)
router.route("/").post(verifyJWT,addServiceType)
export default router