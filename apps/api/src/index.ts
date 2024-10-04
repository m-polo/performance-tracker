import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { timeout } from "hono/timeout";
import athletes from "./routes/athletes";
import auth from "./routes/auth";

const app = new Hono();
const port: number = 3000;

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
  return c.text("Endpoint does not exist");
});

console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});