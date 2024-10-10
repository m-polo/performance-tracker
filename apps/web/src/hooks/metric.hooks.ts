import { useIonToast } from "@ionic/react";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { ApiClientType } from "../App";
import {
  addNewMetric,
  getFilteredMetricsFromAthlete,
} from "../services/metric.service";
import { Metric, METRIC_TYPES } from "../shared/interfaces";
import { errorToast, successToast } from "../shared/toasts";

export function useGetFilteredMetrics(
  apiClient: ApiClientType,
  athleteId: number,
  metricTypeFilter?: METRIC_TYPES
) {
  const [present] = useIonToast();

  return useQuery<Metric[] | undefined>({
    queryKey: ["filterAthleteMetrics", athleteId, metricTypeFilter],
    queryFn: () =>
      getFilteredMetricsFromAthlete(apiClient, athleteId, metricTypeFilter)
        .then(async (res) => (await res.json()) as Metric[])
        .catch(() => {
          present(errorToast("Error filtering metrics"));
          return [];
        }),
  });
}

export function useAddMetric(
  apiClient: ApiClientType,
  queryClient: QueryClient,
  athleteId: number,
  token: string,
  setShowForm: (show: boolean) => void
) {
  const [present] = useIonToast();

  return useMutation({
    mutationFn: async (newMetric: Metric) =>
      addNewMetric(apiClient, newMetric, athleteId, token),
    onSuccess: ({ status }) => {
      if (status === 201) {
        present(successToast("Metric added correctly"));
        queryClient.invalidateQueries({
          queryKey: ["filterAthleteMetrics"],
        });
        setShowForm(false);
      } else {
        present(errorToast("Error adding metric"));
      }
    },
    onError: () => present(errorToast("Error adding metric")),
  });
}
