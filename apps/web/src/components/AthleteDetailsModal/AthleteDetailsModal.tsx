import { IonButton, IonCol, IonGrid, IonInput, IonRow } from "@ionic/react";
import { useForm } from "react-hook-form";
import { Athlete, AthleteBasicsDetails } from "../../interfaces";

type AthleteDetailsModalProps = {
  athlete?: Athlete;
  onAthleteSubmit: (formData: AthleteBasicsDetails) => void;
};

export default function AthleteDetailsModal({
  athlete,
  onAthleteSubmit: onAthleteCreate,
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
    <form onSubmit={handleSubmit(onAthleteCreate)} className="ion-padding">
      <IonGrid>
        <IonRow className="ion-padding">
          <IonInput
            {...register("name", { required: "Name must be added" })}
            labelPlacement="floating"
            label="Name"
            fill="outline"
          />
        </IonRow>
        <IonRow>
          <IonCol className="ion-padding">
            <IonInput
              {...register("age", { required: "Age must be added" })}
              labelPlacement="floating"
              label="Age"
              fill="outline"
            />
          </IonCol>
          <IonCol className="ion-padding">
            <IonInput
              {...register("team", { required: "Team must be added" })}
              labelPlacement="floating"
              label="Team"
              fill="outline"
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
