import { prisma } from "@pertrack/database";
import assert from "assert";
import app from "../src/app";
import { athlete1, athletes } from "./test-data";

describe("Athletes routes tests", () => {
  describe("When database is working correctly", () => {
    jest.spyOn(prisma.athlete, "findMany").mockResolvedValueOnce(athletes);
    jest
      .spyOn(prisma.athlete, "findFirstOrThrow")
      .mockResolvedValueOnce(athlete1);
    jest.spyOn(prisma.athlete, "update").mockResolvedValueOnce(athlete1);
    jest.spyOn(prisma.athlete, "create").mockResolvedValueOnce(athlete1);
    jest.spyOn(prisma.athlete, "delete").mockResolvedValueOnce(athlete1);

    test("Get all athletes", async () => {
      assert(2);

      const res = await app.request("/athletes", {
        method: "GET",
      });
      expect(res.status).toBe(200);
      expect(await res.json()).toEqual(athletes);
    });

    test("Get specific athlete", async () => {
      const id: number = 1;

      assert(2);

      const res = await app.request(`/athletes/${id}`, {
        method: "GET",
      });

      expect(res.status).toBe(200);
      expect(await res.json()).toEqual(athlete1);
    });

    describe("When user authenticated", () => {
      let token: string = "";

      beforeEach(async () => {
        const resToken = await app.request("/auth/token", {
          method: "GET",
        });

        token = await resToken.text();
      });

      test("Add athlete is done correctly", async () => {
        assert(2);

        const res = await app.request("/athletes", {
          method: "POST",
          body: JSON.stringify({ ...athlete1, id: undefined }),
          headers: new Headers({ Authorization: `Bearer ${token}` }),
        });

        expect(res.status).toBe(201);
        expect(await res.json()).toEqual(athlete1);
      });

      test("Edit athlete is done correctly", async () => {
        assert(2);

        const id: number = 1;
        const res = await app.request(`/athletes/${id}`, {
          method: "PUT",
          body: JSON.stringify(athlete1),
          headers: new Headers({ Authorization: `Bearer ${token}` }),
        });

        expect(res.status).toBe(200);
        expect(await res.json()).toBe(id);
      });

      test("Delete athlete is done correctly", async () => {
        assert(2);

        const id: number = 1;
        const res = await app.request(`/athletes/${id}`, {
          method: "DELETE",
          body: JSON.stringify(athlete1),
          headers: new Headers({ Authorization: `Bearer ${token}` }),
        });

        expect(res.status).toBe(204);
        expect(res.body).toBeNull();
      });
    });

    describe("When user not authenticated", () => {
      test("Add athlete returns an error", async () => {
        assert(1);

        const res = await app.request("/athletes", {
          method: "POST",
          body: JSON.stringify(athlete1),
        });

        expect(res.status).toBe(401);
      });

      test("Edit athlete returns an error", async () => {
        assert(1);

        const id: number = 1;
        const res = await app.request(`/athletes/${id}`, {
          method: "PUT",
          body: JSON.stringify(athlete1),
        });

        expect(res.status).toBe(401);
      });

      test("Delete athlete returns an error", async () => {
        assert(1);

        const id: number = 1;
        const res = await app.request(`/athletes/${id}`, {
          method: "DELETE",
          body: JSON.stringify(athlete1),
        });

        expect(res.status).toBe(401);
      });
    });
  });

  describe("When error in database", () => {
    jest.spyOn(prisma.athlete, "findMany").mockRejectedValue(new Error());
    jest
      .spyOn(prisma.athlete, "findFirstOrThrow")
      .mockRejectedValue(new Error());
    jest.spyOn(prisma.athlete, "update").mockRejectedValue(new Error());
    jest.spyOn(prisma.athlete, "create").mockRejectedValue(new Error());
    jest.spyOn(prisma.athlete, "delete").mockRejectedValue(new Error());

    let token: string = "";

    beforeEach(async () => {
      const resToken = await app.request("/auth/token", {
        method: "GET",
      });

      token = await resToken.text();
    });

    test("Add athlete returns an error", async () => {
      assert(2);

      const res = await app.request("/athletes", {
        method: "POST",
        body: JSON.stringify(athlete1),
        headers: new Headers({ Authorization: `Bearer ${token}` }),
      });

      expect(res.status).toBe(500);
      expect(await res.text()).toBe("Error adding athlete");
    });

    test("Edit athlete returns an error", async () => {
      assert(2);

      const id: number = 1;
      const res = await app.request(`/athletes/${id}`, {
        method: "PUT",
        body: JSON.stringify(athlete1),
        headers: new Headers({ Authorization: `Bearer ${token}` }),
      });

      expect(res.status).toBe(500);
      expect(await res.text()).toBe("Error editing athlete");
    });

    test("Delete athlete returns an error", async () => {
      assert(2);

      const id: number = 1;
      const res = await app.request(`/athletes/${id}`, {
        method: "DELETE",
        body: JSON.stringify(athlete1),
        headers: new Headers({ Authorization: `Bearer ${token}` }),
      });

      expect(res.status).toBe(500);
      expect(await res.text()).toBe("Error deleting athlete");
    });
  });
});
