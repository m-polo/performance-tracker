import {
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonFab,
  IonFabButton,
  IonFabList,
  IonIcon,
  IonModal,
} from "@ionic/react";

import { build, eye, trash, create } from "ionicons/icons";
import { useState } from "react";
import AthleteCompleteInfoModal from "../AthleteCompleteInfoModal/AthleteCompleteInfoModal";
import AthleteDeletionModal from "../AthleteDeletionModal/AthleteDeletionModal";
import AthleteDetailsModal from "../AthleteDetailsModal/AthleteDetailsModal";
import { Athlete, AthleteBasicsDetails } from "../../interfaces";

type AthleteCardProps = {
  athleteInfo: Athlete;
  onAthleteDelete: (id: number) => void;
  onAthleteEdit: (formData: AthleteBasicsDetails) => void;
};

export default function AthleteCard({
  athleteInfo,
  onAthleteDelete,
  onAthleteEdit
}: AthleteCardProps) {
  const [isDeletionModalOpen, setIsDeletionModalOpen] =
    useState<boolean>(false);
  const [isAthleteCompleteInfoOpen, setIsAthleteCompleteInfoOpen] =
    useState<boolean>(false);
  const [isAthleteDetailsOpen, setIsAthleteDetailsOpen] =
    useState<boolean>(false);

  const { id, name, age, team }: Athlete = athleteInfo;

  return (
    <IonCard>
      <div>
        <IonCardHeader>
          <IonCardTitle>{name}</IonCardTitle>
          {age}
          <IonCardSubtitle>{team}</IonCardSubtitle>
        </IonCardHeader>
        <IonFab vertical="center" horizontal="end">
          <IonFabButton size="small">
            <IonIcon icon={build}></IonIcon>
          </IonFabButton>
          <IonFabList side="start">
            <IonFabButton onClick={() => setIsAthleteCompleteInfoOpen(true)}>
              <IonIcon icon={eye}></IonIcon>
            </IonFabButton>
            <IonFabButton
              onClick={() => {
                setIsAthleteDetailsOpen(true);
              }}
            >
              <IonIcon icon={create}></IonIcon>
            </IonFabButton>
            <IonFabButton onClick={() => setIsDeletionModalOpen(true)}>
              <IonIcon icon={trash}></IonIcon>
            </IonFabButton>
          </IonFabList>
        </IonFab>
      </div>

      <IonModal
        isOpen={isDeletionModalOpen}
        onDidDismiss={() => setIsDeletionModalOpen(false)}
      >
        <AthleteDeletionModal
          onDeletionCancelled={() => setIsDeletionModalOpen(false)}
          onDeletion={() => {
            onAthleteDelete(id!);
            setIsDeletionModalOpen(false);
          }}
        />
      </IonModal>

      <IonModal
        isOpen={isAthleteCompleteInfoOpen}
        onDidDismiss={() => setIsAthleteCompleteInfoOpen(false)}
      >
        <AthleteCompleteInfoModal athlete={athleteInfo} />
      </IonModal>

      <IonModal
        isOpen={isAthleteDetailsOpen}
        onDidDismiss={() => setIsAthleteDetailsOpen(false)}
      >
        <AthleteDetailsModal
          athlete={athleteInfo}
          onAthleteSubmit={onAthleteEdit}
        />
      </IonModal>
    </IonCard>
  );
}
