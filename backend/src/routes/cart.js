import { Router } from "express";
import { addItem, getCart, removeItem, updateQty } from "../controllers/cartController.js";

export const cartRouter = Router();

cartRouter.get("/", getCart);
cartRouter.post("/items", addItem);
cartRouter.patch("/items", updateQty);
cartRouter.delete("/items", removeItem);

