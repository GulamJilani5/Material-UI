import { Router } from "express";
import { getAllUsers, login, signup } from "../controllers/user-controllers.js";

const userRouters = Router();


userRouters.get("/", getAllUsers)
userRouters.post("/signup", signup)
userRouters.post("/login", login)
console.log("//////////////////////user router.........................")
 

export default userRouters