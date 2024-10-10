import { sign } from "hono/jwt";

const jwtAlgorithm = "HS256";

type Payload = {
  name?: string;
  email?: string;
  exp: number;
};

export async function getToken(name: string, email: string): Promise<string> {
  const payload: Payload = {
    name,
    email,
    exp: Math.floor(Date.now() / 1000) + 60 * 5, // Token expires in 5 minutes
  };

  const JWT_SECRET: string | undefined = process.env.JWT_SECRET;
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET env variable not provided");
  }

  return sign(payload, JWT_SECRET, jwtAlgorithm);
}
