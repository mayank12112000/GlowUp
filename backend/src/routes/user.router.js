import {Router} from "express";
import { currentUserRole, getOtp, loginUser, logoutUser, registerUser, validateUser, verifyOtp } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { arcjectValidate } from "../middlewares/arcjet.middleware.js";

const router = Router()

router.route("/register").post(arcjectValidate,registerUser)
router.route("/login").post(loginUser)
router.route("/validate").get(validateUser)
router.route("/currentRole").get(verifyJWT,currentUserRole)
router.route("/logout").post(verifyJWT,logoutUser)
router.route("/verifyOtp").post(verifyJWT,verifyOtp)
router.route("/getMobileOtp").post(verifyJWT,getOtp)
export default router