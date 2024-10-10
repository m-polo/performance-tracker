import { z } from "zod";

export const getAllAthletesSchema = z.object({
  searchText: z.string().optional(),
});

export const getAthleteSchema = z.object({
  id: z.string(),
});

export const addAthleteSchema = z.object({
  name: z.string(),
  age: z.string(),
  team: z.string(),
});

export const editJsonAthleteSchema = addAthleteSchema.extend({
  id: z.number(),
  age: z.number().or(z.string()),
});
export const editParamAthleteSchema = z.object({ id: z.string() });

export const deleteAthleteSchema = z.object({
  id: z.string(),
});
