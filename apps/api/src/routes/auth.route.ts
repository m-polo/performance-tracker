import { zValidator } from "@hono/zod-validator";
import "dotenv/config";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { getTokenSchema } from "../schemas/auth.schema";
import { getToken } from "../services/auth.service";
import { checkValidationResult } from "./routes.utils";

const auth = new Hono().get(
  "/token",
  zValidator("query", getTokenSchema, ({ success }) =>
    checkValidationResult(success)
  ),
  async (c) => {
    try {
      const { name, email } = c.req.valid("query");
      const token = await getToken(name, email);
      return c.text(token, 200);
    } catch (error) {
      throw new HTTPException(500, {
        message: "Error getting JWT token",
        cause: error,
      });
    }
  }
);

export default auth;
