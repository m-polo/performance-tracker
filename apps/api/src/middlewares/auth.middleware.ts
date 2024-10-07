import "dotenv/config";
import { jwt } from "hono/jwt";
import "dotenv/config";

export function authMiddleware() {
  const JWT_SECRET: string = process.env.JWT_SECRET!;

  return jwt({
    secret: JWT_SECRET,
  });
}
