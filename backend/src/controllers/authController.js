import { getEnv } from "../config/env.js";
import { loginSchema, registerSchema, updateProfileSchema } from "../validators/authValidators.js";
import { getProfile, loginUser, registerUser, updateProfile } from "../services/authService.js";

function sendError(res, error) {
  return res.status(error.status || 500).json({ error: error.message || "Server error" });
}

export async function register(req, res) {
  const parsed = registerSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: "Invalid input" });

  try {
    const { jwtSecret } = getEnv();
    const result = await registerUser({ ...parsed.data, jwtSecret });
    return res.json(result);
  } catch (error) {
    return sendError(res, error);
  }
}

export async function login(req, res) {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: "Invalid input" });

  try {
    const { jwtSecret } = getEnv();
    const result = await loginUser({ ...parsed.data, jwtSecret });
    return res.json(result);
  } catch (error) {
    return sendError(res, error);
  }
}

export async function me(req, res) {
  const userId = req.user?.id;
  if (!userId) return res.status(401).json({ error: "Unauthorized" });

  try {
    const user = await getProfile(userId);
    return res.json({ user });
  } catch (error) {
    return sendError(res, error);
  }
}

export async function patchMe(req, res) {
  const userId = req.user?.id;
  if (!userId) return res.status(401).json({ error: "Unauthorized" });

  const parsed = updateProfileSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: "Invalid input" });

  try {
    const user = await updateProfile(userId, parsed.data);
    return res.json({ user });
  } catch (error) {
    return sendError(res, error);
  }
}

