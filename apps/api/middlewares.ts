import { env } from "hono/adapter";
import { createMiddleware } from "hono/factory";
import { jwt } from "hono/jwt";

export function authMiddleware() {
  return createMiddleware(async (c, next) => {
    const { JWT_SECRET } = env<{ JWT_SECRET: string }>(c);

    const jwtMiddleware = jwt({
      secret: JWT_SECRET,
    });
    return jwtMiddleware(c, next);
  });
}
