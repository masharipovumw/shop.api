import { Router } from "express";
import { allusers, loginUser, register } from "../controller/user.controller.js";

const user = Router()

user.get("/all", allusers)
user.post("/register", register)
user.post("/login", loginUser)


export default user