import { z } from "zod";

export const addMetricJsonSchema = z.object({
  value: z.string(),
  metricType: z.string(),
  unit: z.string(),
  timestamp: z.date().optional(),
  athleteId: z.number(),
});

export const paramSchema = z.object({
  id: z.string(),
});

export const getMetricsSchema = z.object({
  metricType: z.string().optional(),
});
