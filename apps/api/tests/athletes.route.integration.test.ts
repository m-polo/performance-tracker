import { Athlete } from "@pertrack/database";
import axios, { AxiosRequestConfig } from "axios";

const authHeader = (token: string): AxiosRequestConfig => ({
  headers: { Authorization: `Bearer ${token}` },
});

const athlete: Athlete = {
  age: 1,
  name: "name",
  team: "team",
} as Athlete;

describe("Athletes routes integration tests", () => {
  describe("When database is working correctly", () => {
    test("Get all athletes", async () => {
      const { data, status } = await axios.get<Athlete[]>(
        "http://localhost:3000/athletes"
      );

      expect(status).toBe(200);
      expect(data.length).toBeGreaterThan(0);
    });

    test("Get specific athlete", async () => {
      const { data } = await axios.get<Athlete[]>(
        "http://localhost:3000/athletes"
      );

      const response = await axios.get<Athlete>(
        `http://localhost:3000/athletes/${data[0].id}`
      );

      expect(response.status).toBe(200);
      expect(response.data.name).toBe(data[0].name);
      expect(response.data.age).toBe(data[0].age);
      expect(response.data.team).toBe(data[0].team);
    });

    describe("When user authenticated", () => {
      let token: string;

      beforeEach(async () => {
        const response = await axios.get<string>(
          "http://localhost:3000/auth/token"
        );

        token = response.data;
      });

      test("Add athlete is done correctly", async () => {
        const { data, status } = await axios.post<Athlete>(
          "http://localhost:3000/athletes",
          { ...athlete, id: undefined },
          authHeader(token)
        );

        expect(status).toBe(201);
        expect(data.id).toBeDefined();
        expect(data.name).toEqual(athlete.name);
        expect(data.age).toEqual(athlete.age);
        expect(data.team).toEqual(athlete.team);
      });

      test("Edit athlete is done correctly", async () => {
        const newName: string = "nameUpdated";
        const { data } = await axios.post<Athlete>(
          "http://localhost:3000/athletes",
          { ...athlete, id: undefined },
          authHeader(token)
        );

        await axios.put<Athlete>(
          `http://localhost:3000/athletes/${data.id}`,
          { ...data, name: newName },
          authHeader(token)
        );

        const getResponse = await axios.get<Athlete>(
          `http://localhost:3000/athletes/${data.id}`
        );

        expect(getResponse.status).toBe(200);
        expect(getResponse.data.name).toEqual(newName);
      });

      test("Delete athlete is done correctly", async () => {
        const { data } = await axios.post<Athlete>(
          "http://localhost:3000/athletes",
          { ...athlete, id: undefined },
          authHeader(token)
        );

        await axios.delete<Athlete>(
          `http://localhost:3000/athletes/${data.id}`,
          authHeader(token)
        );

        expect(
          axios.get<Athlete>(`http://localhost:3000/athletes/${data.id}`)
        ).rejects.toThrow();
      });
    });

    describe("When user not authenticated", () => {
      let athlete: Athlete | undefined = undefined;

      beforeAll(async () => {
        const { data } = await axios.get<Athlete[]>(
          "http://localhost:3000/athletes"
        );

        athlete = data[0];
      });

      test("Add athlete returns an error", () => {
        expect(
          axios.post<Athlete>("http://localhost:3000/athletes", {
            ...athlete,
            id: undefined,
          })
        ).rejects.toThrow();
      });

      test("Edit athlete returns an error", () => {
        const newName: string = "nameUpdated";

        expect(
          axios.put<Athlete>(`http://localhost:3000/athletes/${athlete!.id}`, {
            ...athlete,
            name: newName,
          })
        ).rejects.toThrow();
      });

      test("Delete athlete returns an error", () => {
        expect(
          axios.delete<Athlete>(`http://localhost:3000/athletes/${athlete!.id}`)
        ).rejects.toThrow();
      });
    });
  });
});
