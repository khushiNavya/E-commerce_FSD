import express from "express"

import { signup, login, updateUser, getUser, deleteUser } from "../Controllers/User.controller.js"
import auth from "../Middlewares/auth.middleware.js";
import User from "../Modal/user.model.js";

const UserRouter = express.Router();

UserRouter.post("/signup", signup)
    .post("/login", login)
    .get("/", auth,getUser)
    .patch("/update",auth, updateUser)
    .delete("/delete", auth,deleteUser)


export default UserRouter;
