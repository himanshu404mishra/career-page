import { Router } from "express";
import { checkAuth, login, logout, createAdmin, deleteAdmin, getAllAdmins } from "../controllers/auth.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/create-admin", protectRoute ,createAdmin)

router.delete("/delete-admin", protectRoute, deleteAdmin)

router.post("/login", login)

router.post("/logout", logout)

router.get("/check", protectRoute, checkAuth)

router.get("/all-admins", protectRoute ,getAllAdmins)

export default router