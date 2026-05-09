import bcrypt from "bcryptjs";
import { User } from "../models/User.js";
import { signAccessToken } from "../utils/tokens.js";

export async function registerUser({ name, email, password, jwtSecret }) {
  const existing = await User.findOne({ email });
  if (existing) {
    const err = new Error("Email already exists");
    err.status = 409;
    throw err;
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, passwordHash, role: "user" });
  const token = signAccessToken({ userId: user._id, jwtSecret });

  return {
    token,
    user: {
      id: String(user._id),
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      address: user.address,
      avatar: user.avatar,
    },
  };
}

export async function loginUser({ email, password, jwtSecret }) {
  const user = await User.findOne({ email });
  if (!user) {
    const err = new Error("Invalid credentials");
    err.status = 401;
    throw err;
  }

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) {
    const err = new Error("Invalid credentials");
    err.status = 401;
    throw err;
  }

  const token = signAccessToken({ userId: user._id, jwtSecret });
  return {
    token,
    user: {
      id: String(user._id),
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      address: user.address,
      avatar: user.avatar,
    },
  };
}

export async function getProfile(userId) {
  const user = await User.findById(userId).select("_id name email role phone address avatar");
  if (!user) {
    const err = new Error("Not found");
    err.status = 404;
    throw err;
  }
  return {
    id: String(user._id),
    name: user.name,
    email: user.email,
    role: user.role,
    phone: user.phone,
    address: user.address,
    avatar: user.avatar,
  };
}

export async function updateProfile(userId, payload) {
  const user = await User.findByIdAndUpdate(
    userId,
    { $set: payload },
    { new: true, runValidators: true }
  ).select("_id name email role phone address avatar");
  if (!user) {
    const err = new Error("Not found");
    err.status = 404;
    throw err;
  }
  return {
    id: String(user._id),
    name: user.name,
    email: user.email,
    role: user.role,
    phone: user.phone,
    address: user.address,
    avatar: user.avatar,
  };
}

