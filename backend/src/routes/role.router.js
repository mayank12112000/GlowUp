import { Router } from "express";
import { getAllRoles } from "../controllers/role.controller.js";
const router = Router()

router.route("/getRoles").get(getAllRoles)

export default router