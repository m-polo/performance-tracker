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
import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { add, close } from "ionicons/icons";
import { lazy, Suspense, useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../App";
import AthleteCard from "../../components/AthleteCard/AthleteCard";
import {
  addNewAthlete,
  deleteAthlete,
  editAthlete,
  getAllAthletes,
} from "../../services/athlete.service";
import { Athlete, AthleteBasicsDetails } from "../../shared/interfaces";
import { errorToast, successToast } from "../../shared/toasts";

const AthleteDetailsModal = lazy(
  () => import("../../components/AthleteDetailsModal/AthleteDetailsModal")
);

export default function AthletesDashboard() {
  const [present] = useIonToast();
  const token: string = useContext(AuthContext);
  const queryClient: QueryClient = useQueryClient();
  const createModal = useRef<HTMLIonModalElement>(null);
  const [athletes, setAthletes] = useState<Athlete[]>([]);
  const [searchText, setSearchText] = useState<string>("");

  const { data } = useQuery<Athlete[]>({
    queryKey: ["athleteList", searchText],
    queryFn: () =>
      getAllAthletes(searchText)
        .then((res) => res.data)
        .catch(() => present(errorToast("Error getting athletes"))),
  });

  const createAthleteMutation = useMutation({
    mutationFn: async (newAthlete: AthleteBasicsDetails) =>
      addNewAthlete(newAthlete, token),
    onSuccess: () => {
      present(successToast("Athlete added correctly"));
      queryClient.invalidateQueries({ queryKey: ["athleteList"] });
    },
    onError: () => present(errorToast("Error adding athlete")),
  });

  const deleteAthleteMutation = useMutation({
    mutationFn: async (athleteDeletedId: number) =>
      deleteAthlete(athleteDeletedId, token),
    onSuccess: () => {
      present(successToast("Athlete deleted correctly"));
      queryClient.invalidateQueries({ queryKey: ["athleteList"] });
    },
    onError: () => present(errorToast("Error deleting athlete")),
  });

  const updateAthleteMutation = useMutation({
    mutationFn: async (athlete: AthleteBasicsDetails) =>
      editAthlete(athlete, token),
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
            <IonFabButton id="create-modal" data-testid="create-modal-button">
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
          <Suspense>
            <AthleteDetailsModal
              onAthleteSubmit={(athlete: AthleteBasicsDetails) => {
                createAthleteMutation.mutate(athlete);
                createModal.current?.dismiss();
              }}
            />
          </Suspense>
        </IonModal>
      </IonContent>
    </IonPage>
  );
}
