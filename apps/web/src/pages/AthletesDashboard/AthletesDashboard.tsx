import {
  IonContent,
  IonFab,
  IonFabButton,
  IonIcon,
  IonModal,
  IonPage,
  IonSearchbar,
  useIonToast,
} from "@ionic/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosRequestConfig } from "axios";
import { add, close } from "ionicons/icons";
import { lazy, useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../App";
import AthleteCard from "../../components/AthleteCard/AthleteCard";
import { Athlete, AthleteBasicsDetails } from "../../shared/interfaces";
import { errorToast, successToast } from "../../shared/toasts";

const AthleteDetailsModal = lazy(
  () => import("../../components/AthleteDetailsModal/AthleteDetailsModal")
);

export default function AthletesDashboard() {
  const [present] = useIonToast();
  const token: string = useContext(AuthContext);
  const queryClient = useQueryClient();
  const createModal = useRef<HTMLIonModalElement>(null);
  const [athletes, setAthletes] = useState<Athlete[]>([]);
  const [searchText, setSearchText] = useState<string>("");

  const baseUrl: string = import.meta.env.VITE_BASE_URL;
  const authHeader: AxiosRequestConfig = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const { data } = useQuery<Athlete[]>({
    queryKey: ["athleteList", searchText],
    queryFn: () =>
      axios
        .get(
          `${baseUrl}/athletes${searchText ? `?searchText=${searchText}` : ""}`
        )
        .then((res) => res.data)
        .catch(() => present(errorToast("Error getting athletes"))),
  });

  const createAthleteMutation = useMutation({
    mutationFn: async (newAthlete: AthleteBasicsDetails) =>
      await axios.post(`${baseUrl}/athletes`, newAthlete, authHeader),
    onSuccess: () => {
      present(successToast("Athlete added correctly"));
      queryClient.invalidateQueries({ queryKey: ["athleteList"] });
    },
    onError: () => present(errorToast("Error adding athlete")),
  });

  const deleteAthleteMutation = useMutation({
    mutationFn: async (athleteDeletedId: number) =>
      await axios.delete(`${baseUrl}/athletes/${athleteDeletedId}`, authHeader),
    onSuccess: () => {
      present(successToast("Athlete deleted correctly"));
      queryClient.invalidateQueries({ queryKey: ["athleteList"] });
    },
    onError: () => present(errorToast("Error deleting athlete")),
  });

  const updateAthleteMutation = useMutation({
    mutationFn: async (athlete: AthleteBasicsDetails) =>
      await axios.put(`${baseUrl}/athletes/${athlete.id}`, athlete, authHeader),
    onSuccess: () => {
      present(successToast("Athlete edited correctly"));
      queryClient.invalidateQueries({ queryKey: ["athleteList"] });
    },
    onError: () => present(errorToast("Error editing athlete")),
  });

  useEffect(() => {
    if (data) {
      setAthletes(data);
    }
  }, [data]);

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <div>
          <IonSearchbar
            debounce={1000}
            onIonInput={(e) => setSearchText(e.target.value!)}
            showClearButton="never"
            showCancelButton="always"
            cancelButtonIcon={close}
            placeholder="Search athlete or team"
          />
          <IonFab slot="fixed" vertical="top" horizontal="end">
            <IonFabButton id="create-modal">
              <IonIcon icon={add} />
            </IonFabButton>
          </IonFab>
        </div>

        {athletes.map((athlete) => (
          <AthleteCard
            athleteInfo={athlete}
            key={athlete.id}
            onAthleteDelete={(id) => deleteAthleteMutation.mutate(id)}
            onAthleteEdit={(athlete) => updateAthleteMutation.mutate(athlete)}
          />
        ))}

        <IonModal trigger="create-modal" ref={createModal}>
          <AthleteDetailsModal
            onAthleteSubmit={(athlete: AthleteBasicsDetails) => {
              createAthleteMutation.mutate(athlete);
              createModal.current?.dismiss();
            }}
          />
        </IonModal>
      </IonContent>
    </IonPage>
  );
}
