import { Router } from "express";
import { verifyJWT } from './../middlewares/auth.middleware.js';
import { addBranch, getAllBranches } from "../controllers/branch.controller.js";
const router = Router()

router.route("/getBranches").get(verifyJWT,getAllBranches)
router.route("/").post(verifyJWT,addBranch)
export default router