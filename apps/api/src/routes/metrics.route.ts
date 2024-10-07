import { Metric, MetricTypes } from "@pertrack/database";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { authMiddleware } from "../middlewares/auth.middleware";
import MetricRepository from "../repositories/metric.repository";

const metrics: Hono = new Hono();
const metricRepository: MetricRepository = new MetricRepository();

metrics.get("", async (c) => {
  try {
    const athleteId: string | undefined = c.req.param("id");
    const metricType: MetricTypes | undefined = c.req.query(
      "metricType"
    ) as MetricTypes;

    const metrics: Metric[] = await metricRepository.getFilteredByAthleteId(
      Number(athleteId),
      metricType
    );

    return c.json(metrics, 200);
  } catch (error) {
    throw new HTTPException(500, {
      message: "Error getting athlete metrics",
      cause: error,
    });
  }
});

metrics.post("", authMiddleware(), async (c) => {
  try {
    const athleteId: string | undefined = c.req.param("id");
    const metric: Metric = await c.req.json<Metric>();

    const { id } = await metricRepository.add({
      ...metric,
      athleteId: Number(athleteId),
    });

    return c.json({ id, metric }, 201);
  } catch (error) {
    throw new HTTPException(500, {
      message: "Error adding metric to an athlete",
      cause: error,
    });
  }
});

export default metrics;
