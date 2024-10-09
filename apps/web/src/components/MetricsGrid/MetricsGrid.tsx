import { IonCol, IonGrid, IonRow } from "@ionic/react";
import { ReactNode } from "react";
import { Metric } from "../../shared/interfaces";
import capitalizeText from "../../shared/utils";
import { css } from "../../../styled-system/css";

type MetricsGridProps = {
  metrics: Metric[];
  children: ReactNode;
};

export default function MetricsGrid({ children, metrics }: MetricsGridProps) {
  return (
    <IonGrid style={{ marginTop: "60px" }}>
      {children}

      <IonRow className={css({ mb: "2" })}>
        <IonCol className={css({ bg: "gray", p: "1" })}>
          <strong>Metric type</strong>
        </IonCol>
        <IonCol className={css({ p: "1", bg: "gray", ml: "1", mr: "1" })}>
          <strong>Value</strong>
        </IonCol>
        <IonCol className={css({ bg: "gray", p: "1" })}>
          <strong>Unit</strong>
        </IonCol>
      </IonRow>
      {metrics.map(({ id, metricType, value, unit }: Metric) => {
        return (
          <IonRow key={id} className={css({ mb: "1" })}>
            <IonCol className={css({ bg: "gray.500", p: "1" })}>
              {capitalizeText(metricType)}
            </IonCol>
            <IonCol
              className={css({ bg: "gray.500", p: "1", ml: "1", mr: "1" })}
            >
              {value}
            </IonCol>
            <IonCol className={css({ bg: "gray.500", p: "1" })}>
              {capitalizeText(unit)}
            </IonCol>
          </IonRow>
        );
      })}
    </IonGrid>
  );
}
