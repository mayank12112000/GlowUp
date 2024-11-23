import {Router} from "express";
import { loginUser, logoutUser, registerUser, validateUser } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/validate").get(validateUser)
router.route("/logout").post(verifyJWT,logoutUser)
export default router