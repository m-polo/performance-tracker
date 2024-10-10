import { ApiClientType } from "../App";
import { Metric, METRIC_TYPES } from "../shared/interfaces";
import { authHeader } from "../shared/utils";

export function getFilteredMetricsFromAthlete(
  client: ApiClientType,
  athleteId: number,
  metricType?: METRIC_TYPES
) {
  return client.athletes[":id"].metrics.$get({
    param: {
      id: athleteId.toString(),
    },
    query: {
      metricType: metricType?.toString(),
    },
  });
}

export function addNewMetric(
  client: ApiClientType,
  metric: Metric,
  athleteId: number,
  token: string
) {
  return client.athletes[":id"].metrics.$post(
    {
      param: {
        id: athleteId.toString(),
      },
      json: {
        ...metric,
        metricType: metric.metricType.toString(),
        unit: metric.unit.toString(),
        athleteId,
        value: metric.value.toString(),
      },
    },
    authHeader(token)
  );
}
