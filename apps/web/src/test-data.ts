import { Athlete, Metric, METRIC_TYPES, UNITS } from "./shared/interfaces";

export const athlete: Athlete = {
  id: 1,
  name: "name",
  age: 1,
  team: "team",
};

export const athletes: Athlete[] = [
  athlete,
  {
    id: 2,
    name: "name2",
    age: 2,
    team: "team2",
  },
];

export const metrics: Metric[] = [
  {
    id: 1,
    unit: UNITS.KG,
    value: 3,
    metricType: METRIC_TYPES.HORIZONTAL_JUMP,
  },
];
