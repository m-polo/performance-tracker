import { IonButton, IonCol, IonGrid, IonInput, IonRow } from "@ionic/react";
import { useForm } from "react-hook-form";
import { css } from "../../../styled-system/css";
import { Athlete, AthleteBasicsDetails } from "../../shared/interfaces";
import "../../theme/panda.css";

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
      ...athlete,
    },
  });

  return (
    <div className={css({ p: "10" })}>
      <form
        onSubmit={handleSubmit(onAthleteSubmit)}
        data-testid="athlete-details-modal"
      >
        <IonGrid>
          <IonRow className={css({ mb: "2" })}>
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
          <IonRow className={css({ mb: "2" })}>
            <IonCol className={css({ mr: "2" })}>
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
            <IonCol className={css({ ml: "2" })}>
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

          <IonRow>
            <IonButton type="submit" className={css({ w: "100%", h: "15" })}>
              <strong>Save</strong>
            </IonButton>
          </IonRow>
        </IonGrid>
      </form>
    </div>
  );
}
