import { Router } from "express";
import { addRole, getAllRoles } from "../controllers/role.controller.js";
import { verifyJWT } from './../middlewares/auth.middleware.js';
const router = Router()

router.route("/getRoles").get(verifyJWT,getAllRoles)
router.route("/").post(verifyJWT,addRole)

export default router