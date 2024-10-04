import {
  Athlete,
  Metric,
  MetricTypes,
  PrismaClient,
  Units,
} from "@prisma/client";

const prisma: PrismaClient = new PrismaClient();

type AthleteWithoutId = Omit<Athlete, "id">;
type MetricWithoutId = Omit<Metric, "id">;

const maxNumberOfMetrics: number = 5;
const numberOfAthletes: number = 100;
const names: string[] = [
  "John Doe",
  "Jane Smith",
  "Raul Fernandez",
  "Francisco Perez",
];
const teams: string[] = [
  "New York FC",
  "Paris FC",
  "London FC",
  "Tokio FC",
  "Dubai FC",
  "Sydney FC",
];

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateAthlete() {
  const athlete: AthleteWithoutId = {
    name: names[getRandomInt(0, names.length - 1)]!,
    team: teams[getRandomInt(0, teams.length - 1)]!,
    age: getRandomInt(18, 45),
  };

  return athlete;
}

function generateMetrics(athleteId: number) {
  const metrics: MetricWithoutId[] = [];

  for (let i = 0; i < getRandomInt(0, maxNumberOfMetrics); i++) {
    metrics.push({
      athleteId,
      unit: Object.values(Units)[
        getRandomInt(0, Object.values(Units).length - 1)
      ] as unknown as Units,
      metricType: Object.values(MetricTypes)[
        getRandomInt(0, Object.values(MetricTypes).length - 1)
      ] as unknown as MetricTypes,
      value: getRandomInt(1, 100),
      timestamp: new Date(),
    });
  }

  return metrics;
}

async function main() {
  const athletes: AthleteWithoutId[] = [];
  for (let i = 0; i < numberOfAthletes; i++) {
    athletes.push(generateAthlete());
  }

  const athletesCreatedIds: { id: number }[] =
    await prisma.athlete.createManyAndReturn({
      data: athletes,
      select: { id: true },
    });

  const metrics: MetricWithoutId[] = [];
  athletesCreatedIds.forEach(({ id }) => {
    metrics.push(...generateMetrics(id));
  });

  await prisma.metric.createMany({
    data: metrics,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
