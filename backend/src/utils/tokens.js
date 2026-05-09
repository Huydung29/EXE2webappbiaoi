import jwt from "jsonwebtoken";

export function signAccessToken({ userId, jwtSecret }) {
  return jwt.sign({ sub: String(userId) }, jwtSecret, { expiresIn: "7d" });
}

export function verifyAccessToken({ token, jwtSecret }) {
  return jwt.verify(token, jwtSecret);
}

