import {Router} from "express";
import { registerEmployee,getAllEmployee } from "../controllers/employee.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { arcjectValidate } from "../middlewares/arcjet.middleware.js";

const router = Router()

router.route("/registerEmployee").post(verifyJWT,arcjectValidate,registerEmployee)
router.route("/").get(getAllEmployee)

export default router