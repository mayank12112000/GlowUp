import { Router } from "express";
import { verifyJWT } from './../middlewares/auth.middleware.js';
import { addService, getAllService, getService } from "../controllers/service.controller.js";
const router = Router()

router.route("/getService").get(verifyJWT,getAllService)
router.route("/getServiceFromType").get(getService)
router.route("/").post(verifyJWT,addService)
export default router