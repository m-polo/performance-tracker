import { Athlete, Metric, MetricTypes, Units } from "@prisma/client";

export const athlete1: Athlete = {
  id: 1,
  name: "name1",
  age: 1,
  team: "team1",
};
export const athlete2: Athlete = {
  id: 2,
  name: "name2",
  age: 2,
  team: "team2",
};

export const athletes: Athlete[] = [athlete1, athlete2];

export const newMetric: Metric = {
  athleteId: 1,
  metricType: MetricTypes.SPEED,
  value: 1,
  unit: Units.METERS_SECOND,
  timestamp: new Date(),
} as Metric;

export const metric1: Metric = {
  id: 1,
  athleteId: 1,
  metricType: MetricTypes.SPEED,
  value: 1,
  unit: Units.METERS_SECOND,
  timestamp: new Date(),
};
export const metric2: Metric = {
  id: 2,
  athleteId: 1,
  metricType: MetricTypes.HORIZONTAL_JUMP,
  value: 2,
  unit: Units.METER,
  timestamp: new Date(),
};

export const metrics: Metric[] = [metric1, metric2];
