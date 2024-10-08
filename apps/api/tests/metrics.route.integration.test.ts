import { Metric } from "@pertrack/database";
import axios, { AxiosRequestConfig } from "axios";

const authHeader = (token: string): AxiosRequestConfig => ({
  headers: { Authorization: `Bearer ${token}` },
});

const metric: Metric = {
  unit: "KG",
  value: 3,
  metricType: "HORIZONTAL_JUMP",
} as Metric;

describe("Metrics routes integration tests", () => {
  let athleteId: number;

  describe("When database is working correctly", () => {
    beforeAll(async () => {
      const { data } = await axios.get<Metric[]>(
        `http://localhost:3000/athletes`
      );

      athleteId = data[0].id;
    });

    test("Get all metrics returns an array", async () => {
      const { data, status } = await axios.get<Metric[]>(
        `http://localhost:3000/athletes/${athleteId}/metrics`
      );

      expect(status).toBe(200);
      expect(data.length).toBeGreaterThanOrEqual(0);
    });

    describe("When user authenticated", () => {
      let token: string;

      beforeEach(async () => {
        const response = await axios.get<string>(
          "http://localhost:3000/auth/token"
        );

        token = response.data;
      });

      test("Add metric is done correctly", async () => {
        const { data, status } = await axios.post<Metric>(
          `http://localhost:3000/athletes/${athleteId}/metrics`,
          metric,
          authHeader(token)
        );

        expect(status).toBe(201);
        expect(data.id).toBeDefined();
        expect(data.unit).toEqual(metric.unit);
        expect(data.value).toEqual(metric.value);
        expect(data.metricType).toEqual(metric.metricType);
      });
    });

    describe("When user not authenticated", () => {
      test("Add metric returns an error", async () => {
        expect(
          axios.post<Metric>(
            `http://localhost:3000/athletes/${athleteId}/metrics`,
            metric
          )
        ).rejects.toThrow();
      });
    });
  });
});
