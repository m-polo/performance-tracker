import { serve } from "@hono/node-server";
import { Hono } from "hono";
import athletes from "./routes/athletes";
import { logger } from "hono/logger";
import { timeout } from "hono/timeout";

const app: Hono = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.use(logger());
app.use(timeout(5000))

app.route("/athletes", athletes);

const port: number = 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
