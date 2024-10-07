import { IonButton, IonCol, IonGrid, IonInput, IonRow } from "@ionic/react";
import { useForm } from "react-hook-form";
import { Athlete, AthleteBasicsDetails } from "../../shared/interfaces";

type AthleteDetailsModalProps = {
  athlete?: Athlete;
  onAthleteSubmit: (formData: AthleteBasicsDetails) => void;
};

export default function AthleteDetailsModal({
  athlete,
  onAthleteSubmit,
}: AthleteDetailsModalProps) {
  const { handleSubmit, register } = useForm<AthleteBasicsDetails>({
    defaultValues: {
      id: athlete?.id,
      name: athlete?.name,
      age: athlete?.age,
      team: athlete?.team,
    },
  });

  return (
    <form
      onSubmit={handleSubmit(onAthleteSubmit)}
      className="ion-padding"
      data-testid="athlete-details-modal"
    >
      <IonGrid>
        <IonRow className="ion-padding">
          <IonInput
            {...register("name")}
            labelPlacement="floating"
            label="Name"
            fill="outline"
            required
            maxlength={50}
            counter
          />
        </IonRow>
        <IonRow>
          <IonCol className="ion-padding">
            <IonInput
              {...register("age")}
              labelPlacement="floating"
              label="Age"
              fill="outline"
              required
              min={0}
              max={100}
              type="number"
            />
          </IonCol>
          <IonCol className="ion-padding">
            <IonInput
              {...register("team")}
              labelPlacement="floating"
              label="Team"
              fill="outline"
              required
              maxlength={50}
              counter
            />
          </IonCol>
        </IonRow>

        <IonRow className="ion-padding">
          <IonButton type="submit">Save</IonButton>
        </IonRow>
      </IonGrid>
    </form>
  );
}
