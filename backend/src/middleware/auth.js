import { verifyAccessToken } from "../utils/tokens.js";
import { getEnv } from "../config/env.js";
import { User } from "../models/User.js";

export async function requireAuth(req, res, next) {
  try {
    const header = req.headers.authorization || "";
    const [scheme, token] = header.split(" ");
    if (scheme !== "Bearer" || !token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { jwtSecret } = getEnv();

    const payload = verifyAccessToken({ token, jwtSecret });
    const user = await User.findById(payload.sub).select("_id role");
    if (!user) return res.status(401).json({ error: "Unauthorized" });
    req.user = { id: String(user._id), role: user.role };
    next();
  } catch {
    return res.status(401).json({ error: "Unauthorized" });
  }
}

