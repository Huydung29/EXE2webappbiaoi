import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { myNotifications } from "../controllers/notificationController.js";

export const notificationsRouter = Router();

notificationsRouter.get("/me", requireAuth, myNotifications);
