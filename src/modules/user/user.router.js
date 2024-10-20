import { Router } from "express";
import { signUp, login ,changePassword, deleteUser, updateUser, logout} from "./user.controller.js";
import { isAuthenticated } from "../../middleware/authentication.js";

const router = Router()
    router.post("/signUp", signUp);

    router.post('/login',login)
    router.patch('/changePassword',isAuthenticated,changePassword)
    router.patch('/updateUser',isAuthenticated,updateUser)
    router.delete('/deleteUser',isAuthenticated,deleteUser)
    router.get('/logout',isAuthenticated,logout)

export default router;