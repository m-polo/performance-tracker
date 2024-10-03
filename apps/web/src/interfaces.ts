export interface AthleteBasicsDetails {
  id?: number;
  name: string;
  age: number;
  team: string;
}

export interface Athlete extends AthleteBasicsDetails {
  metrics?: Metric[];
}

export interface Metric {
  id?: number;
  metricType: METRIC_TYPES;
  value: number;
  unit: UNITS;
}

export enum UNITS {
  KG = "KG",
  METERS_SECOND = "METERS_SECOND",
  KM = "KM",
  SECOND = "SECOND",
  MINUTE = "MINUTE",
  METER = "METER",
  KW = "KW",
}

export enum METRIC_TYPES {
  SPEED = "SPEED",
  STRENGTH = "STRENGTH",
  STAMINA = "STAMINA",
  HORIZONTAL_JUMP = "HORIZONTAL_JUMP",
  VERTICAL_JUMP = "VERTICAL_JUMP",
  POWER = "POWER",
}
