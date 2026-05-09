import { z } from "zod";

export const addItemSchema = z.object({
  productId: z.number().int(),
  name: z.string().min(1),
  image: z.string().min(1),
  price: z.number().nonnegative(),
  qty: z.number().int().min(1).default(1),
});

export const updateQtySchema = z.object({
  productId: z.number().int(),
  qty: z.number().int().min(1),
});

export const removeItemSchema = z.object({
  productId: z.number().int(),
});

