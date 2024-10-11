import { Metric } from "@pertrack/database";
import axios, { AxiosRequestConfig } from "axios";

const authHeader = (token: string): AxiosRequestConfig => ({
  headers: { Authorization: `Bearer ${token}` },
});

const newMetric = {
  unit: "KG",
  value: "3",
  metricType: "HORIZONTAL_JUMP",
  athleteId: 1,
};

describe("Metrics routes integration tests", () => {
  let athleteId: number;

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
    const name: string = "name";
    let email: string = "email";
    let token: string;

    beforeEach(async () => {
      const response = await axios.get<string>(
        `http://localhost:3000/auth/token?name=${name}&email=${email}`
      );

      token = response.data;
    });

    test("Add metric is done correctly", async () => {
      const { data, status } = await axios.post<Metric>(
        `http://localhost:3000/athletes/${athleteId}/metrics`,
        newMetric,
        authHeader(token)
      );

      expect(status).toBe(201);
      expect(data.id).toBeDefined();
      expect(data.unit).toEqual(newMetric.unit);
      expect(data.value).toEqual(newMetric.value);
      expect(data.metricType).toEqual(newMetric.metricType);
    });

    test("Add metric returns an error when metric validation fails", () => {
      expect(
        axios.post<Metric>(
          `http://localhost:3000/athletes/${athleteId}/metrics`,
          {},
          authHeader(token)
        )
      ).rejects.toThrow("Request failed with status code 400");
    });
  });

  describe("When user not authenticated", () => {
    test("Add metric returns an error", async () => {
      expect(
        axios.post<Metric>(
          `http://localhost:3000/athletes/${athleteId}/metrics`,
          newMetric
        )
      ).rejects.toThrow("Request failed with status code 401");
    });
  });
});
