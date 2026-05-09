import "dotenv/config";
import bcrypt from "bcryptjs";
import { connectDb } from "../db.js";
import { User } from "../models/User.js";

const email = process.env.ADMIN_EMAIL || "admin@example.com";
const password = process.env.ADMIN_PASSWORD || "admin123456";

await connectDb(process.env.MONGODB_URI);
const passwordHash = await bcrypt.hash(password, 10);

await User.updateOne(
  { email },
  { $set: { name: "Administrator", email, passwordHash, role: "admin" } },
  { upsert: true }
);

// eslint-disable-next-line no-console
console.log(`Admin ready: ${email}`);
process.exit(0);

