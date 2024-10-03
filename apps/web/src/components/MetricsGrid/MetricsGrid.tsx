import { IonButton, IonCol, IonGrid, IonIcon, IonRow } from "@ionic/react";
import { addCircle, checkmarkCircle, closeCircle } from "ionicons/icons";
import { Metric } from "../../interfaces";
import { ReactNode } from "react";

type MetricsGridProps = {
  metrics: Metric[];
  children: ReactNode;
};

export default function MetricsGrid({ children, metrics }: MetricsGridProps) {
  return (
    <IonGrid style={{ marginTop: "60px" }}>
      {children}
      <IonRow>
        <IonCol>
          <strong>Metric type</strong>
        </IonCol>
        <IonCol>
          <strong>Value</strong>
        </IonCol>
        <IonCol>
          <strong>Unit</strong>
        </IonCol>
      </IonRow>
      {metrics.map(({ metricType, value, unit }: Metric) => {
        return (
          <IonRow>
            <IonCol>{metricType.toLowerCase().replace("_", " ")}</IonCol>
            <IonCol>{value}</IonCol>
            <IonCol>{unit.toLowerCase().replace("_", " ")}</IonCol>
          </IonRow>
        );
      })}
    </IonGrid>
  );
}
