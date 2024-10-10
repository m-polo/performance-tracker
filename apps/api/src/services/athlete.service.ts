import { Athlete } from "@prisma/client";
import AthleteRepository from "../repositories/athlete.repository";

const athleteRepository: AthleteRepository = new AthleteRepository();

export async function getAthletes(
  searchText: string | undefined
): Promise<Athlete[]> {
  return athleteRepository.getAll(searchText);
}

export async function getAthlete(athleteId: string): Promise<Athlete> {
  return athleteRepository.getById(Number(athleteId));
}

export async function addAthlete(athlete: Athlete): Promise<Athlete> {
  return athleteRepository.create(athlete);
}

export async function editAthlete(
  athleteId: string,
  athlete: Athlete
): Promise<Athlete> {
  return athleteRepository.update(Number(athleteId), {...athlete, age: athlete.age});
}

export async function deleteAthlete(athleteId: string): Promise<void> {
  return athleteRepository.delete(Number(athleteId));
}
