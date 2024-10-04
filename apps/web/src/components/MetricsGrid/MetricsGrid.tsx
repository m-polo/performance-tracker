import { IonCol, IonGrid, IonRow } from "@ionic/react";
import { ReactNode } from "react";
import { Metric } from "../../shared/interfaces";

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
