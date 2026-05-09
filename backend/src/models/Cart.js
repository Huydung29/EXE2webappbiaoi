import mongoose from "mongoose";

const CartItemSchema = new mongoose.Schema(
  {
    productId: { type: Number, required: true },
    name: { type: String, required: true, trim: true },
    image: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    qty: { type: Number, required: true, min: 1, default: 1 },
  },
  { _id: false }
);

const CartSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true },
    items: { type: [CartItemSchema], default: [] },
  },
  { timestamps: true }
);

export const Cart = mongoose.models.Cart || mongoose.model("Cart", CartSchema);

