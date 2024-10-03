import { IonButton, IonIcon, IonRow, useIonToast } from "@ionic/react";
import { useRef, useState } from "react";
import { Athlete, Metric } from "../../interfaces";
import MetricForm from "../MetricForm/MetricForm";
import MetricsGrid from "../MetricsGrid/MetricsGrid";
import { checkmarkCircle, closeCircle, addCircle } from "ionicons/icons";

type AthleteCompleteInfoModalProps = {
  athlete: Athlete;
  athletes: Athlete[];
};

export default function AthleteCompleteInfoModal({
  athlete,
}: AthleteCompleteInfoModalProps) {
  const [showForm, setShowForm] = useState<boolean>(false);
  const formRef = useRef<HTMLFormElement>();
  const [present] = useIonToast();
  const { name, team, age, metrics }: Athlete = athlete;

  function handleOnMetricCreate(metric: Metric) {
    if (metrics) {
      athlete.metrics?.push(metric);
    } else {
      athlete.metrics = [metric];
    }

    present({
      message: "Metric added correctly",
      duration: 1500,
      position: "top",
    });

    setShowForm(false);
  }

  return (
    <div className="ion-padding">
      <div>
        <h1>{name}</h1>
        <strong>{team}</strong>, <strong>{age} years</strong>
      </div>

      <div>
        {metrics ? (
          <MetricsGrid metrics={metrics}>
            <IonRow>
              {showForm ? (
                <>
                  <IonButton
                    onClick={() => {
                      formRef.current &&
                        formRef.current.dispatchEvent(
                          new Event("submit", {
                            cancelable: true,
                            bubbles: true,
                          })
                        );
                    }}
                  >
                    <IonIcon icon={checkmarkCircle}></IonIcon>Save
                  </IonButton>
                  <IonButton onClick={() => setShowForm(false)}>
                    <IonIcon icon={closeCircle}></IonIcon>Cancel
                  </IonButton>
                </>
              ) : (
                <IonButton type="submit" onClick={() => setShowForm(true)}>
                  <IonIcon icon={addCircle}></IonIcon>Add new metric
                </IonButton>
              )}
            </IonRow>
          </MetricsGrid>
        ) : null}
        {showForm ? (
          <MetricForm onMetricCreate={handleOnMetricCreate} formRef={formRef} />
        ) : null}
      </div>
    </div>
  );
}
