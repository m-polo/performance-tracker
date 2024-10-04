-- CreateEnum
CREATE TYPE "Units" AS ENUM ('KG', 'METERS_SECOND', 'KM', 'SECOND', 'MINUTE', 'METER', 'KW');

-- CreateEnum
CREATE TYPE "MetricTypes" AS ENUM ('SPEED', 'STRENGTH', 'STAMINA', 'HORIZONTAL_JUMP', 'VERTICAL_JUMP', 'POWER');

-- CreateTable
CREATE TABLE "Athlete" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "team" TEXT NOT NULL,

    CONSTRAINT "Athlete_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Metric" (
    "id" SERIAL NOT NULL,
    "metricType" "MetricTypes" NOT NULL,
    "value" INTEGER NOT NULL,
    "unit" "Units" NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "athleteId" INTEGER NOT NULL,

    CONSTRAINT "Metrics_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Metric" ADD CONSTRAINT "Metrics_athleteId_fkey" FOREIGN KEY ("athleteId") REFERENCES "Athlete"("id") ON DELETE CASCADE ON UPDATE CASCADE;
