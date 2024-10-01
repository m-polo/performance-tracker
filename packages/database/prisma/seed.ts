import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.athlete.create({
    data: {
      name: "Vinicius Jr",
      age: 22,
      team: "Real Madrid",
      metrics: {
        create: [
          {
            metricType: "SPEED",
            value: 10,
            unit: "METERS_SECOND",
          },
          {
            metricType: "STRENGTH",
            value: 100,
            unit: "KG",
          },
          {
            metricType: "VERTICAL_JUMP",
            value: 3,
            unit: "METER",
          },
        ],
      },
    },
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
