import {
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonIcon,
  IonModal,
} from "@ionic/react";

import { create, eye, trash } from "ionicons/icons";
import { lazy, Suspense, useRef } from "react";
import { css } from "../../../styled-system/css";
import { Athlete, AthleteBasicsDetails } from "../../shared/interfaces";
import Loading from "../Loading/Loading";

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
    <IonCard
      className={css({
        m: "2",
        p: "4",
        h: "20",
        display: "flex",
        flexDirection: "row",
      })}
    >
      <IonCardHeader className={css({ flex: "75" })}>
        <IonCardTitle>{name}</IonCardTitle>
        <IonCardSubtitle>
          {team}, {age} years
        </IonCardSubtitle>
      </IonCardHeader>
      <div className={css({ flex: "25", alignContent: "center" })}>
        <IonButton
          id={`complete-info-modal-${id}`}
          data-testid="complete-info-modal-button"
        >
          <IonIcon slot="icon-only" icon={eye} />
        </IonButton>
        <IonButton
          className={css({ ml: "4", mr: "4" })}
          id={`details-modal-${id}`}
          data-testid="edit-modal-button"
        >
          <IonIcon slot="icon-only" icon={create} />
        </IonButton>
        <IonButton id={`delete-modal-${id}`} data-testid="delete-modal-button">
          <IonIcon slot="icon-only" icon={trash} />
        </IonButton>
      </div>

      <IonModal trigger={`delete-modal-${id}`} ref={deleteModal}>
        <Suspense fallback={<Loading />}>
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
        <Suspense fallback={<Loading />}>
          <AthleteCompleteInfoModal athleteId={id!} />
        </Suspense>
      </IonModal>

      <IonModal trigger={`details-modal-${id}`} ref={detailsModal}>
        <Suspense fallback={<Loading />}>
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
