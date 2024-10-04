import { Metric, MetricTypes, Prisma, prisma } from "@pertrack/database";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { authMiddleware } from "../../middlewares";

const metrics: Hono = new Hono();

metrics.get("", async (c) => {
  try {
    const athleteId: string | undefined = c.req.param("id");
    const metricType: MetricTypes | undefined = c.req.query(
      "metricType"
    ) as MetricTypes;

    let whereClause: Prisma.MetricWhereInput = { athleteId: Number(athleteId) };
    if (metricType) {
      whereClause.AND = {
        metricType,
      };
    }

    const metrics: Metric[] = await prisma.metric.findMany({
      where: whereClause,
    });

    return c.json(metrics, 200);
  } catch (error) {
    throw new HTTPException(500, { message: "Error getting athlete metrics" });
  }
});

metrics.post("", authMiddleware(), async (c) => {
  try {
    const athleteId: string | undefined = c.req.param("id");
    const metric: Metric = await c.req.json<Metric>();
    const { id } = await prisma.metric.create({
      data: {
        ...metric,
        value: Number(metric.value),
        athleteId: Number(athleteId!),
      },
    });

    return c.json({ id }, 201);
  } catch (error) {
    throw new HTTPException(500, { message: "Error adding metric to an athlete" });
  }
});

export default metrics;
