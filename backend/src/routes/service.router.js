import { Router } from "express";
import { verifyJWT } from './../middlewares/auth.middleware.js';
import { addService, getAllService } from "../controllers/service.controller.js";
const router = Router()

router.route("/getService").get(getAllService)
router.route("/").post(verifyJWT,addService)
export default router