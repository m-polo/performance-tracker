import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { sign } from "hono/jwt";
import "dotenv/config";

const auth = new Hono();
const jwtAlgorithm = "HS256";

type Payload = {
  name?: string,
  email?: string,
  exp: number
}

auth.get("/token", async (c) => {
  try {
    const name: string | undefined = c.req.query("name");
    const email: string | undefined = c.req.query("email");

    const payload: Payload = {
      name,
      email,
      exp: Math.floor(Date.now() / 1000) + 60 * 5, // Token expires in 5 minutes
    };

    const token = await sign(payload, process.env.JWT_SECRET!, jwtAlgorithm);

    return c.text(token, 200);
  } catch (error) {
    throw new HTTPException(500, {
      message: "Error getting JWT token", cause: error
    });
  }
});

export default auth;
