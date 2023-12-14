import { Router } from "express";
import { loginUser } from "../controller/user.controller.js";
import user from "./User.actions.routes.js";
import cart from "./cart.routes.js";

const router = Router()


router.use('/user/', loginUser)
router.use('/main/', user)
router.use('/cart/',cart)

export default router