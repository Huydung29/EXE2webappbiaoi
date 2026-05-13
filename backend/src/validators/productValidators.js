import { z } from "zod";

export const productPayloadSchema = z.object({
  productId: z.number().int().positive(),
  model: z.string().trim().optional().default(""),
  name: z.string().trim().min(1),
  shortName: z.string().trim().optional().default(""),
  description: z.string().trim().optional().default(""),
  image: z.string().trim().min(1),
  images: z.array(z.string().trim()).optional().default([]),
  price: z.number().nonnegative(),
  stock: z.number().int().nonnegative().optional().default(100),
  tags: z.array(z.string().trim()).optional().default([]),
  concept: z.string().trim().optional().default(""),
  badges: z.array(z.string().trim()).optional().default([]),
  guideLink: z.string().trim().optional().default(""),
  longDescription: z.array(z.string().trim()).optional().default([]),
  specs: z.array(z.string().trim()).optional().default([]),
  howTo: z.array(z.string().trim()).optional().default([]),
  safety: z.array(z.string().trim()).optional().default([]),
});

export const productUpdateSchema = productPayloadSchema.partial().omit({ productId: true });

