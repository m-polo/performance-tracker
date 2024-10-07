import { IonButton, IonIcon } from "@ionic/react";
import { checkmarkCircle, closeCircle } from "ionicons/icons";

type AthleteDeletionModalProps = {
  onDeletion: () => void;
  onDeletionCancelled: () => void;
};

export default function AthleteDeletionModal({
  onDeletion,
  onDeletionCancelled,
}: AthleteDeletionModalProps) {
  return (
    <div className="ion-padding" data-testid="delete-modal">
      <h3>Are you sure you want to remove this athlete?</h3>
      <div>
        <IonButton size="small" fill="clear" onClick={onDeletion}>
          <IonIcon slot="start" icon={checkmarkCircle}></IonIcon>
          Yes, delete it
        </IonButton>

        <IonButton
          size="small"
          color="danger"
          fill="clear"
          onClick={onDeletionCancelled}
        >
          <IonIcon slot="start" icon={closeCircle}></IonIcon>
          No, keep it
        </IonButton>
      </div>
    </div>
  );
}
