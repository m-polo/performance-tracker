import { Metric, MetricTypes, prisma } from "@pertrack/database";
import { addMetric, getAthleteMetrics } from "../src/services/metric.service";
import { metric1, metrics, newMetric } from "./test-data";

describe("Metrics routes tests", () => {
  const athleteId: string = "1";

  describe("When database is working correctly", () => {
    test("Get all metrics returns an array", async () => {
      jest.spyOn(prisma.metric, "findMany").mockResolvedValueOnce(metrics);

      const result: Metric[] = await getAthleteMetrics(athleteId, undefined);

      expect(metrics).toHaveLength(result.length);
    });

    test("Get all metrics filtered by metric returns an array", async () => {
      const metricFilter: MetricTypes = MetricTypes.HORIZONTAL_JUMP;
      const filteredMetric: Metric[] = metrics.filter(
        ({ metricType }) => metricType === metricFilter
      );

      jest
        .spyOn(prisma.metric, "findMany")
        .mockResolvedValueOnce(filteredMetric);

      const result: Metric[] = await getAthleteMetrics(
        athleteId,
        metricFilter.toString()
      );

      expect(filteredMetric).toHaveLength(result.length);
    });

    test("Add metric is done correctly", async () => {
      jest.spyOn(prisma.metric, "create").mockResolvedValueOnce({...newMetric, id: 1});

      const result: Metric = await addMetric(athleteId, newMetric);

      expect(result.id).toBeDefined();
      expect(result.athleteId).toBe(newMetric.athleteId);
      expect(result.metricType).toBe(newMetric.metricType);
      expect(result.value).toBe(newMetric.value);
      expect(result.unit).toBe(newMetric.unit);
    });
  });

  describe("When error in database", () => {
    test("Get all metric returns an error", async () => {
      jest.spyOn(prisma.metric, "findMany").mockRejectedValue(new Error());

      expect(getAthleteMetrics(athleteId, undefined)).rejects.toThrow();
    });

    test("Add metric returns an error", async () => {
      jest.spyOn(prisma.metric, "create").mockRejectedValue(new Error());

      expect(addMetric(athleteId, newMetric)).rejects.toThrow();
    });
  });
});
