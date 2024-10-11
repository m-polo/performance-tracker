import { zValidator } from "@hono/zod-validator";
import { Metric } from "@pertrack/database";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { authMiddleware } from "../middlewares/auth.middleware";
import {
  addMetricJsonSchema,
  getMetricsSchema,
  paramSchema,
} from "../schemas/metric.schema";
import { addMetric, getAthleteMetrics } from "../services/metric.service";
import { checkValidationResult } from "./routes.utils";

const metrics = new Hono()
  .get(
    "",
    zValidator("param", paramSchema, ({ success }) =>
      checkValidationResult(success)
    ),
    zValidator("query", getMetricsSchema, ({ success }) =>
      checkValidationResult(success)
    ),
    async (c) => {
      try {
        const { id } = c.req.valid("param")!;
        const { metricType } = c.req.valid("query");

        const metrics: Metric[] = await getAthleteMetrics(id, metricType);

        return c.json(metrics, 200);
      } catch (error) {
        throw new HTTPException(500, {
          message: "Error getting athlete metrics",
          cause: error,
        });
      }
    }
  )
  .post(
    "",
    authMiddleware(),
    zValidator("json", addMetricJsonSchema),
    zValidator("param", paramSchema, ({ success }) =>
      checkValidationResult(success)
    ),
    async (c) => {
      try {
        const { id } = c.req.valid("param")!;
        const metric = c.req.valid("json") as unknown as Metric;

        const metricAdded = await addMetric(id, metric);

        return c.json({ ...metric, id: metricAdded.id }, 201);
      } catch (error) {
        throw new HTTPException(500, {
          message: "Error adding metric to an athlete",
          cause: error,
        });
      }
    }
  );

export default metrics;
