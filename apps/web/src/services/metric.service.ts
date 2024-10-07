import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { Metric, METRIC_TYPES } from "../shared/interfaces";

const baseUrl: string = import.meta.env.VITE_BASE_URL;

const authHeader = (token: string): AxiosRequestConfig => ({
  headers: { Authorization: `Bearer ${token}` },
});

export function getFilteredMetricsFromAthlete(
  athleteId: number,
  metricTypeFilter: METRIC_TYPES | undefined
): Promise<AxiosResponse> {
  return axios.get(
    `${baseUrl}/athletes/${athleteId}/metrics${metricTypeFilter ? `?metricType=${metricTypeFilter}` : ""}`
  );
}

export function addNewMetric(
  metric: Metric,
  athleteId: number,
  token: string
): Promise<AxiosResponse> {
  return axios.post(
    `${baseUrl}/athletes/${athleteId}/metrics`,
    metric,
    authHeader(token)
  );
}
