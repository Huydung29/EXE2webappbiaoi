import { Router } from "express";
import { login, me, patchMe, register } from "../controllers/authController.js";
import { requireAuth } from "../middleware/auth.js";

export const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/me", requireAuth, me);
authRouter.patch("/me", requireAuth, patchMe);

