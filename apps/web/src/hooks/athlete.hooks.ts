import { useIonToast } from "@ionic/react";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { ApiClientType } from "../App";
import {
  addNewAthlete,
  deleteAthlete,
  editAthlete,
  getAllAthletes,
  getAthleteById,
} from "../services/athlete.service";
import { Athlete, AthleteBasicsDetails } from "../shared/interfaces";
import { errorToast, successToast } from "../shared/toasts";

export function useGetAllAthletes(
  apiClient: ApiClientType,
  searchText: string
) {
  const [present] = useIonToast();

  return useQuery<AthleteBasicsDetails[]>({
    queryKey: ["athleteList", searchText],
    queryFn: () =>
      getAllAthletes(apiClient, searchText)
        .then(async (res) => (await res.json()) as AthleteBasicsDetails[])
        .catch(() => {
          present(errorToast("Error getting athletes"));
          return [];
        }),
  });
}

export function useGetAthleteInfo(apiClient: ApiClientType, athleteId: number) {
  const [present] = useIonToast();

  return useQuery<Athlete | undefined>({
    queryKey: ["athleteCompleteInfo", athleteId],
    queryFn: () =>
      getAthleteById(apiClient, athleteId)
        .then(async (res) => (await res.json()) as Athlete)
        .catch(() => {
          present(errorToast("Error getting athlete info"));
          return undefined;
        }),
  });
}

export function useEditAthlete(
  apiClient: ApiClientType,
  queryClient: QueryClient,
  token: string
) {
  const [present] = useIonToast();

  return useMutation({
    mutationFn: async (athlete: AthleteBasicsDetails) =>
      editAthlete(apiClient, athlete, token),
    onSuccess: ({ status }) => {
      if (status === 200) {
        present(successToast("Athlete edited correctly"));
        queryClient.invalidateQueries({ queryKey: ["athleteList"] });
      } else {
        present(errorToast("Error editing athlete"));
      }
    },
    onError: () => present(errorToast("Error editing athlete")),
  });
}

export function useDeleteAthlete(
  apiClient: ApiClientType,
  queryClient: QueryClient,
  token: string
) {
  const [present] = useIonToast();

  return useMutation({
    mutationFn: async (athleteDeletedId: number) =>
      deleteAthlete(apiClient, athleteDeletedId, token),
    onSuccess: ({ status }) => {
      if (status === 204) {
        present(successToast("Athlete deleted correctly"));
        queryClient.invalidateQueries({ queryKey: ["athleteList"] });
      } else {
        present(errorToast("Error deleting athlete"));
      }
    },
    onError: () => present(errorToast("Error deleting athlete")),
  });
}

export function useAddAthlete(
  apiClient: ApiClientType,
  queryClient: QueryClient,
  token: string
) {
  const [present] = useIonToast();

  return useMutation({
    mutationFn: async (newAthlete: AthleteBasicsDetails) =>
      addNewAthlete(apiClient, newAthlete, token),
    onSuccess: ({ status }) => {
      if (status === 201) {
        present(successToast("Athlete added correctly"));
        queryClient.invalidateQueries({ queryKey: ["athleteList"] });
      } else {
        present(errorToast("Error adding athlete"));
      }
    },
    onError: () => present(errorToast("Error adding athlete")),
  });
}
