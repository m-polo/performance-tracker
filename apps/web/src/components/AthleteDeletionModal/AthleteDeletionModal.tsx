import { IonButton, IonIcon } from "@ionic/react";
import { checkmarkCircle, closeCircle } from "ionicons/icons";
import { css } from "../../../styled-system/css";

type AthleteDeletionModalProps = {
  onDeletion: () => void;
  onDeletionCancelled: () => void;
};

export default function AthleteDeletionModal({
  onDeletion,
  onDeletionCancelled,
}: AthleteDeletionModalProps) {
  return (
    <div className={css({ p: "5" })} data-testid="delete-modal">
      <strong>Are you sure you want to remove this athlete? This action can not be undone.</strong>
      <div className={css({ display: "flex", flexDirection: "row", justifyContent: "center" })}>
        <IonButton size="small" fill="clear" onClick={onDeletion}>
          <IonIcon slot="start" icon={checkmarkCircle} />
          <strong className={css({ ml: "1" })}>Yes, delete it</strong>
        </IonButton>

        <IonButton
          size="small"
          color="danger"
          fill="clear"
          onClick={onDeletionCancelled}
        >
          <IonIcon slot="start" icon={closeCircle} />
          <strong className={css({ ml: "1" })}>No, keep it</strong>
        </IonButton>
      </div>
    </div>
  );
}
