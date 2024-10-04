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
import axios from "axios";
import { add, close } from "ionicons/icons";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../App";
import AthleteCard from "../../components/AthleteCard/AthleteCard";
import AthleteDetailsModal from "../../components/AthleteDetailsModal/AthleteDetailsModal";
import { Athlete, AthleteBasicsDetails } from "../../shared/interfaces";
import { errorToast, successToast } from "../../shared/toasts";

const baseUrl: string = import.meta.env.VITE_BASE_URL;

export default function AthletesDashboard() {
  const [present] = useIonToast();
  const token: string = useContext(AuthContext);
  const queryClient = useQueryClient();
  const [athletes, setAthletes] = useState<Athlete[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [isAthleteDetailsOpen, setIsAthleteDetailsOpen] =
    useState<boolean>(false);

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
      await axios.post(`${baseUrl}/athletes`, newAthlete, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    onSuccess: () => {
      present(successToast("Athlete added correctly"));
      queryClient.invalidateQueries({ queryKey: ["athleteList"] });
      setIsAthleteDetailsOpen(false);
    },
    onError: () => present(errorToast("Error adding athlete")),
  });

  const deleteAthleteMutation = useMutation({
    mutationFn: async (athleteDeletedId: number) =>
      await axios.delete(`${baseUrl}/athletes/${athleteDeletedId}`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    onSuccess: () => {
      present(successToast("Athlete deleted correctly"));
      queryClient.invalidateQueries({ queryKey: ["athleteList"] });
      setIsAthleteDetailsOpen(false);
    },
    onError: () => present(errorToast("Error deleting athlete")),
  });

  const updateAthleteMutation = useMutation({
    mutationFn: async (athlete: AthleteBasicsDetails) =>
      await axios.put(`${baseUrl}/athletes/${athlete.id}`, athlete, {
        headers: { Authorization: `Bearer ${token}` },
      }),
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
            <IonFabButton onClick={() => setIsAthleteDetailsOpen(true)}>
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

        <IonModal
          isOpen={isAthleteDetailsOpen}
          onDidDismiss={() => setIsAthleteDetailsOpen(false)}
        >
          <AthleteDetailsModal
            onAthleteSubmit={(athlete) => createAthleteMutation.mutate(athlete)}
          />
        </IonModal>
      </IonContent>
    </IonPage>
  );
}
