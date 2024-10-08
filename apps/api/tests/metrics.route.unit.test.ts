import { Metric, prisma } from "@pertrack/database";
import app from "../src/app";
import { metric1, metrics } from "./test-data";

describe("Metrics routes tests", () => {
  const athleteId: number = 1;

  describe("When database is working correctly", () => {
    jest.spyOn(prisma.metric, "findMany").mockResolvedValueOnce(metrics);
    jest.spyOn(prisma.metric, "create").mockResolvedValueOnce(metric1);

    test("Get all metrics returns an array", async () => {
      const res = await app.request(`athletes/${athleteId}/metrics`, {
        method: "GET",
      });

      expect(res.status).toBe(200);
      expect(await res.json()).toHaveLength(metrics.length);
    });

    describe("When user authenticated", () => {
      let token: string = "";

      beforeEach(async () => {
        const resToken = await app.request("/auth/token", {
          method: "GET",
        });

        token = await resToken.text();
      });

      test("Add metric is done correctly", async () => {
        const res = await app.request(`athletes/${athleteId}/metrics`, {
          method: "POST",
          body: JSON.stringify({ ...metric1, id: undefined }),
          headers: new Headers({ Authorization: `Bearer ${token}` }),
        });

        const result: Metric = await res.json();
        expect(res.status).toBe(201);
        expect(result.id).toBe(metric1.id);
        expect(result.athleteId).toBe(metric1.athleteId);
        expect(result.metricType).toBe(metric1.metricType);
        expect(result.value).toBe(metric1.value);
        expect(result.unit).toBe(metric1.unit);
      });
    });

    describe("When user not authenticated", () => {
      test("Add metric returns an error", async () => {
        const res = await app.request(`athletes/${athleteId}/metrics`, {
          method: "POST",
          body: JSON.stringify(metric1),
        });

        expect(res.status).toBe(401);
      });
    });
  });

  describe("When error in database", () => {
    jest.spyOn(prisma.metric, "findMany").mockRejectedValue(new Error());
    jest.spyOn(prisma.metric, "create").mockRejectedValue(new Error());

    test("Get all metric returns an error", async () => {
      const res = await app.request(`athletes/${athleteId}/metrics`, {
        method: "GET",
      });

      expect(res.status).toBe(500);
      expect(await res.text()).toBe("Error getting athlete metrics");
    });

    test("Add metric returns an error", async () => {
      const resToken = await app.request("/auth/token", {
        method: "GET",
      });

      const token: string = await resToken.text();

      const res = await app.request(`athletes/${athleteId}/metrics`, {
        method: "POST",
        body: JSON.stringify(metric1),
        headers: new Headers({ Authorization: `Bearer ${token}` }),
      });

      expect(res.status).toBe(500);
      expect(await res.text()).toBe("Error adding metric to an athlete");
    });
  });
});
