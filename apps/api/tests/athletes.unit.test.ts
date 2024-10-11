import { Athlete, prisma } from "@pertrack/database";
import {
  addAthlete,
  deleteAthlete,
  editAthlete,
  getAthlete,
  getAthletes,
} from "../src/services/athlete.service";
import { athlete1, athletes } from "./test-data";

const id: string = "1";

describe("Athletes routes tests", () => {
  describe("When database is working correctly", () => {
    test("Get all athletes", async () => {
      jest.spyOn(prisma.athlete, "findMany").mockResolvedValueOnce(athletes);

      const result: Athlete[] = await getAthletes(undefined);

      expect(result).toEqual(athletes);
    });

    test("Get all athletes filtered by name", async () => {
      const filter: string = "name1";
      const filteredAthletes: Athlete[] = athletes.filter(
        ({ name }) => name === filter
      );
      jest
        .spyOn(prisma.athlete, "findMany")
        .mockResolvedValueOnce(filteredAthletes);

      const result: Athlete[] = await getAthletes(filter);

      expect(result).toEqual(filteredAthletes);
    });

    test("Get specific athlete", async () => {
      jest
        .spyOn(prisma.athlete, "findFirstOrThrow")
        .mockResolvedValueOnce(athlete1);

      const result: Athlete = await getAthlete(id);

      expect(result).toEqual(athlete1);
    });

    test("Add athlete is done correctly", async () => {
      jest.spyOn(prisma.athlete, "create").mockResolvedValueOnce(athlete1);

      const result: Athlete = await addAthlete(athlete1);

      expect(result).toEqual(athlete1);
    });

    test("Edit athlete is done correctly", async () => {
      jest.spyOn(prisma.athlete, "update").mockResolvedValueOnce(athlete1);

      const result: Athlete = await editAthlete(id, athlete1);

      expect(result).toEqual(athlete1);
    });

    test("Delete athlete is done correctly", async () => {
      jest.spyOn(prisma.athlete, "delete").mockResolvedValueOnce(athlete1);

      expect(deleteAthlete(id)).resolves.not.toThrow();
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

    test("Add athlete returns an error", async () => {
      expect(addAthlete(athlete1)).rejects.toThrow();
    });

    test("Edit athlete returns an error", async () => {
      expect(editAthlete(id, athlete1)).rejects.toThrow();
    });

    test("Delete athlete returns an error", async () => {
      expect(deleteAthlete(id)).rejects.toThrow();
    });
  });
});
