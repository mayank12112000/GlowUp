import Router from "express"
import {getReviews} from "../controllers/reviews.controller.js"
const router = Router()

router.route("/").get(getReviews)

export default router