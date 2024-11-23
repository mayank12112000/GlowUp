import {Router} from "express";
import { loginUser, registerUser, validateUser } from "../controllers/user.controller.js";

const router = Router()

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/validate").get(validateUser)
export default router