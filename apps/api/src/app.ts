import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { timeout } from "hono/timeout";
import athletes from "./routes/athletes.route";
import auth from "./routes/auth.route";

const app = new Hono()
  .use(
    "*",
    cors({
      origin: ["*"],
    })
  )
  .use(logger())
  .use(timeout(5000))
  .notFound((c) => {
    return c.text("Endpoint does not exist", 500);
  })
  .route("/auth", auth)
  .route("/athletes", athletes);

export default app;
