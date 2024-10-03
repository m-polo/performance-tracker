import { Athlete, METRIC_TYPES, UNITS } from "./interfaces";

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateAthlete(id: number) {
  const names = ["John Doe", "Jane Smith", "Raul Fernandez", "Paco Perez"];
  const teams = [
    "New York FC",
    "Paris FC",
    "London FC",
    "Toky FC",
    "Dubai FC",
    "Sydney FC",
  ];

  const athlete: Athlete = {
    id,
    name: names[getRandomInt(0, names.length - 1)],
    team: teams[getRandomInt(0, teams.length - 1)],
    age: getRandomInt(18, 45),
    metrics: [],
  };

  for (let i = 0; i < getRandomInt(0, 5); i++) {
    athlete.metrics!.push({
      unit: Object.values(UNITS)[
        getRandomInt(0, Object.values(UNITS).length - 1)
      ] as unknown as UNITS,
      metricType: Object.values(METRIC_TYPES)[
        getRandomInt(0, Object.values(METRIC_TYPES).length - 1)
      ] as unknown as METRIC_TYPES,
      value: getRandomInt(1, 100),
    });
  }

  return athlete;
}

export function seedAthletes(): Athlete[] {
  const athletes: Athlete[] = [];
  for (let i = 0; i < 100; i++) {
    athletes.push(generateAthlete(i));
  }

  return athletes;
}
