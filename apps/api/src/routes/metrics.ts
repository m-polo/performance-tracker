import { Metric, MetricTypes, Prisma, prisma } from "@pertrack/database";
import { Hono } from "hono";
import { jwtMiddleware } from "../utils";

const metrics: Hono = new Hono();

// Get all metrics from an athlete
metrics.get("", async (c) => {
  const athleteId: string | undefined = c.req.param("id");
  const metricType: string | undefined = c.req.query("metricType");

  let whereClause: Prisma.MetricWhereInput = { athleteId: Number(athleteId) };
  if (metricType) {
    whereClause.AND = {
      metricType:
        MetricTypes[metricType.toUpperCase() as keyof typeof MetricTypes],
    };
  }

  const metrics: Metric[] = await prisma.metric.findMany({
    where: whereClause,
  });

  c.status(200);

  return c.json(metrics);
});

// Add a metric to an athlete
metrics.post("", jwtMiddleware(), async (c) => {
  const metric: Metric = await c.req.json();
  const { id } = await prisma.metric.create({
    data: metric,
  });

  c.status(201);

  return c.json({ id });
});

export default metrics;
