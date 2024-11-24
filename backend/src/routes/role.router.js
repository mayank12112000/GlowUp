import { Router } from "express";
import { addRole, getAllRoles, getRole, updateRole } from "../controllers/role.controller.js";
import { verifyJWT } from './../middlewares/auth.middleware.js';
const router = Router()

router.route("/getRoles").get(verifyJWT,getAllRoles)
router.route("/").post(verifyJWT,addRole)
router.route("/").get(verifyJWT,getRole)
router.route("/").patch(verifyJWT,updateRole)

export default router