import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { timeout } from "hono/timeout";
import athletes from "./routes/athletes.route";
import auth from "./routes/auth.route";

const app: Hono = new Hono();

app.use(
  "*",
  cors({
    origin: ["*"],
  })
);

app.use(logger());
app.use(timeout(5000));

app.get("/", (c) => c.text("API is working"));
app.route("/auth", auth);
app.route("/athletes", athletes);

app.notFound((c) => {
  return c.text("Endpoint does not exist", 500);
});

export default app;
