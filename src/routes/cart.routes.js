import { Router } from "express";
import { allOrders, orderProduct, userOrders } from "../controller/cart.controller.js";
import { authCheck } from "../middlewares/auth-check.js";

const cart = Router()

cart.get('/cart/user/',authCheck(false), userOrders)
cart.get('/cart/admin',authCheck(true), allOrders)
cart.post('/cart/user/:id',authCheck(false), orderProduct)

export default cart