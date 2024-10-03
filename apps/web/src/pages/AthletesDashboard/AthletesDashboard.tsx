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
import { add, close } from "ionicons/icons";
import { useEffect, useState } from "react";
import AthleteCard from "../../components/AthleteCard/AthleteCard";
import AthleteDetailsModal from "../../components/AthleteDetailsModal/AthleteDetailsModal";
import { Athlete, AthleteBasicsDetails } from "../../interfaces";
import { seedAthletes } from "../../seed";

export default function AthletesDashboard() {
  const [present] = useIonToast();
  const [athletes, setAthletes] = useState<Athlete[]>([]);
  const [filteredAthletes, setFilteredAthletes] = useState<Athlete[]>([]);
  const [searchInput, setSearchInput] = useState<string>("");
  const [isAthleteDetailsOpen, setIsAthleteDetailsOpen] =
    useState<boolean>(false);

  useEffect(() => {
    if (athletes.length === 0) {
      setAthletes(seedAthletes());
    }

    if (searchInput) {
      setFilteredAthletes(
        athletes.filter(
          (athlete) =>
            athlete.name.toLowerCase().includes(searchInput) ||
            athlete.team.toLowerCase().includes(searchInput)
        )
      );
    } else {
      setFilteredAthletes(athletes);
    }
  }, [athletes, searchInput]);

  function handleOnInput(event: Event) {
    let input = "";
    const target = event.target as HTMLIonSearchbarElement;
    if (target) input = target.value!.toLowerCase();

    setSearchInput(input);
  }

  function handleOnAthleteDelete(athleteDeletedId: number) {
    setAthletes(athletes.filter(({ id }) => id !== athleteDeletedId));

    present({
      message: "Athlete deleted correctly",
      duration: 1500,
      position: "top",
    });
  }

  function handleOnAthleteCreate(athlete: AthleteBasicsDetails) {
    setAthletes([...athletes, athlete]);

    present({
      message: "Athlete added correctly",
      duration: 1500,
      position: "top",
    });

    setIsAthleteDetailsOpen(false);
  }

  function handleOnAthleteEdit(athlete: AthleteBasicsDetails) {
    const athleteEdited: Athlete = athletes.find(
      ({ id }) => id === athlete.id
    )!;
    athleteEdited.age = athlete.age;
    athleteEdited.name = athlete.name;
    athleteEdited.team = athlete.team;

    setAthletes([...athletes]);

    present({
      message: "Athlete edited correctly",
      duration: 1500,
      position: "top",
    });

    setIsAthleteDetailsOpen(false);
  }

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <div>
          <IonSearchbar
            debounce={1000}
            onIonInput={(ev) => handleOnInput(ev)}
            showClearButton="never"
            showCancelButton="always"
            cancelButtonIcon={close}
            placeholder="Search athlete or team"
          />
          <IonFab slot="fixed" vertical="top" horizontal="end">
            <IonFabButton onClick={() => setIsAthleteDetailsOpen(true)}>
              <IonIcon icon={add}></IonIcon>
            </IonFabButton>
          </IonFab>
        </div>

        {filteredAthletes.map((athlete) => (
          <AthleteCard
            athleteInfo={athlete}
            key={athlete.id}
            onAthleteDelete={handleOnAthleteDelete}
            onAthleteEdit={handleOnAthleteEdit}
          />
        ))}

        <IonModal
          isOpen={isAthleteDetailsOpen}
          onDidDismiss={() => setIsAthleteDetailsOpen(false)}
        >
          <AthleteDetailsModal onAthleteSubmit={handleOnAthleteCreate} />
        </IonModal>
      </IonContent>
    </IonPage>
  );
}
