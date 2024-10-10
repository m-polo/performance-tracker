import { Metric, MetricTypes } from "@prisma/client";
import MetricRepository from "../repositories/metric.repository";

const metricRepository: MetricRepository = new MetricRepository();

export async function getAthleteMetrics(
  athleteId: string,
  metricType: string | undefined
): Promise<Metric[]> {
  return metricRepository.getFilteredByAthleteId(Number(athleteId), metricType as MetricTypes);
}

export async function addMetric(
  athleteId: string,
  metric: Metric
): Promise<Metric> {
  return metricRepository.create({
    ...metric,
    athleteId: Number(athleteId),
  });
}
