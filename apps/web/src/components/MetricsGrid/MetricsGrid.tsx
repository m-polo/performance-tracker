import { IonCol, IonGrid, IonRow } from "@ionic/react";
import { ReactNode } from "react";
import { Metric } from "../../shared/interfaces";
import capitalizeText from "../../shared/utils";

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
      {metrics.map(({ id, metricType, value, unit }: Metric) => {
        return (
          <IonRow key={id}>
            <IonCol>{capitalizeText(metricType)}</IonCol>
            <IonCol>{value}</IonCol>
            <IonCol>{capitalizeText(unit)}</IonCol>
          </IonRow>
        );
      })}
    </IonGrid>
  );
}
