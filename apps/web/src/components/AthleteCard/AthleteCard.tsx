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

import { build, create, eye, trash } from "ionicons/icons";
import { lazy, Suspense, useRef } from "react";
import { Athlete, AthleteBasicsDetails } from "../../shared/interfaces";

const AthleteCompleteInfoModal = lazy(
  () => import("../AthleteCompleteInfoModal/AthleteCompleteInfoModal")
);
const AthleteDeletionModal = lazy(
  () => import("../AthleteDeletionModal/AthleteDeletionModal")
);
const AthleteDetailsModal = lazy(
  () => import("../AthleteDetailsModal/AthleteDetailsModal")
);

type AthleteCardProps = {
  athleteInfo: Athlete;
  onAthleteDelete: (id: number) => void;
  onAthleteEdit: (formData: AthleteBasicsDetails) => void;
};

export default function AthleteCard({
  athleteInfo,
  onAthleteDelete,
  onAthleteEdit,
}: AthleteCardProps) {
  const deleteModal = useRef<HTMLIonModalElement>(null);
  const completeInfoModal = useRef<HTMLIonModalElement>(null);
  const detailsModal = useRef<HTMLIonModalElement>(null);

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
            <IonFabButton
              id={`complete-info-modal-${id}`}
              data-testid="complete-info-modal-button"
            >
              <IonIcon icon={eye}></IonIcon>
            </IonFabButton>
            <IonFabButton
              id={`details-modal-${id}`}
              data-testid="edit-modal-button"
            >
              <IonIcon icon={create}></IonIcon>
            </IonFabButton>
            <IonFabButton
              id={`delete-modal-${id}`}
              data-testid="delete-modal-button"
            >
              <IonIcon icon={trash}></IonIcon>
            </IonFabButton>
          </IonFabList>
        </IonFab>
      </div>

      <IonModal trigger={`delete-modal-${id}`} ref={deleteModal}>
        <Suspense>
          <AthleteDeletionModal
            onDeletionCancelled={() => deleteModal.current?.dismiss()}
            onDeletion={() => {
              onAthleteDelete(id!);
              deleteModal.current?.dismiss();
            }}
          />
        </Suspense>
      </IonModal>

      <IonModal trigger={`complete-info-modal-${id}`} ref={completeInfoModal}>
        <Suspense>
          <AthleteCompleteInfoModal athleteId={id!} />
        </Suspense>
      </IonModal>

      <IonModal trigger={`details-modal-${id}`} ref={detailsModal}>
        <Suspense>
          <AthleteDetailsModal
            athlete={athleteInfo}
            onAthleteSubmit={(data: AthleteBasicsDetails) => {
              onAthleteEdit(data);
              detailsModal.current?.dismiss();
            }}
          />
        </Suspense>
      </IonModal>
    </IonCard>
  );
}
