import "dotenv/config";
import { jwt } from "hono/jwt";
import "dotenv/config";

export function authMiddleware() {
  const JWT_SECRET: string | undefined = process.env.JWT_SECRET;

  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET env variable not provided");
  }

  return jwt({
    secret: JWT_SECRET,
  });
}
