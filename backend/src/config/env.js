export function getEnv() {
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) throw new Error("JWT_SECRET is required");

  return {
    port: Number(process.env.PORT || 5000),
    mongoUri: process.env.MONGODB_URI,
    clientOrigin: process.env.CLIENT_ORIGIN || true,
    jwtSecret,
  };
}

