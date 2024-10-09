import {
  IonButton,
  IonContent,
  IonIcon,
  IonModal,
  IonPage,
  IonSearchbar,
  useIonToast,
} from "@ionic/react";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { add, close } from "ionicons/icons";
import { lazy, Suspense, useContext, useEffect, useMemo, useRef, useState } from "react";
import { css } from "../../../styled-system/css";
import { AuthContext } from "../../App";
import AthleteCard from "../../components/AthleteCard/AthleteCard";
import Loading from "../../components/Loading/Loading";
import {
  addNewAthlete,
  deleteAthlete,
  editAthlete,
  getAllAthletes,
} from "../../services/athlete.service";
import { Athlete, AthleteBasicsDetails } from "../../shared/interfaces";
import { errorToast, successToast } from "../../shared/toasts";
import { groupItemsInPairs } from "../../shared/utils";

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
  const itemsInPairs = useMemo(() => groupItemsInPairs(athletes), [athletes])

  const { data, isLoading } = useQuery<Athlete[]>({
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
        <div
          className={css({
            display: "flex",
            flexDirection: "row",
          })}
        >
          <IonSearchbar
            className={css({ flex: "80" })}
            debounce={1000}
            onIonInput={(e) => setSearchText(e.target.value!)}
            showClearButton="never"
            showCancelButton="always"
            cancelButtonIcon={close}
            placeholder="Search athlete or team"
          />
          <IonButton
            className={css({
              ml: "4",
              mr: "4",
              height: "5",
              alignSelf: "center",
            })}
            id="create-modal"
            data-testid="create-modal-button"
            shape="round"
          >
            <IonIcon slot="icon-only" icon={add} />
          </IonButton>
        </div>

        {isLoading ? <Loading /> : null}

        {itemsInPairs.map(
          (athletePair: [Athlete, Athlete | null], index) => (
            <div className={css({ display: "flex", flexDirection: "row" })} key={index}>
              <div className={css({ flex: "50" })}>
                <AthleteCard
                  athleteInfo={athletePair[0]}
                  key={athletePair[0].id}
                  onAthleteDelete={(id) => deleteAthleteMutation.mutate(id)}
                  onAthleteEdit={(athlete) =>
                    updateAthleteMutation.mutate(athlete)
                  }
                />
              </div>
              <div className={css({ flex: "50" })}>
                {athletePair[1] ? (
                  <AthleteCard
                    athleteInfo={athletePair[1]}
                    key={athletePair[1].id}
                    onAthleteDelete={(id) => deleteAthleteMutation.mutate(id)}
                    onAthleteEdit={(athlete) =>
                      updateAthleteMutation.mutate(athlete)
                    }
                  />
                ) : null}
              </div>
            </div>
          )
        )}

        <IonModal trigger="create-modal" ref={createModal}>
          <Suspense fallback={<Loading />}>
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
