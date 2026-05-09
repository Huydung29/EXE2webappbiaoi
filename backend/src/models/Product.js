import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    productId: { type: Number, required: true, unique: true, index: true },
    model: { type: String, trim: true, default: "" },
    name: { type: String, required: true, trim: true },
    shortName: { type: String, trim: true, default: "" },
    description: { type: String, trim: true, default: "" },
    image: { type: String, required: true, trim: true },
    images: { type: [String], default: [] },
    price: { type: Number, required: true, min: 0 },
    concept: { type: String, trim: true, default: "" },
    badges: { type: [String], default: [] },
    guideLink: { type: String, trim: true, default: "" },
    longDescription: { type: [String], default: [] },
    specs: { type: [String], default: [] },
    howTo: { type: [String], default: [] },
    safety: { type: [String], default: [] },
  },
  { timestamps: true }
);

export const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);

