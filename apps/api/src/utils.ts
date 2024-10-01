import { jwt } from "hono/jwt";

export const jwtMiddleware = () => {
  return jwt({
    secret: "it-is-very-secret",
  });
};
