import {
  IonCol,
  IonGrid,
  IonInput,
  IonRow,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";
import { Metric, METRIC_TYPES, UNITS } from "../../interfaces";
import { useForm } from "react-hook-form";

type MetricFormProps = {
  onMetricCreate: (metric: Metric, e: any) => void;
  formRef: any;
};

export default function MetricForm({
  onMetricCreate,
  formRef,
}: MetricFormProps) {
  const { handleSubmit, register } = useForm<Metric>();

  const units = Object.values(UNITS);
  const metricTypes = Object.values(METRIC_TYPES);

  return (
    <IonGrid>
      <form ref={formRef} onSubmit={handleSubmit(onMetricCreate)}>
        <IonRow>
          <IonCol>
            <IonSelect
              interface="popover"
              label="Metric type"
              labelPlacement="floating"
              fill="outline"
              {...register("metricType", {
                required: "Metric type must be added",
              })}
            >
              {metricTypes.map((metricType) => (
                <IonSelectOption value={metricType}>
                  {metricType.toLowerCase().replace("_", " ")}
                </IonSelectOption>
              ))}
            </IonSelect>
          </IonCol>
          <IonCol>
            <IonInput
              {...register("value", { required: "Value must be added" })}
              label="Value"
              labelPlacement="floating"
              fill="outline"
            />
          </IonCol>
          <IonCol>
            <IonSelect
              interface="popover"
              label="Unit"
              labelPlacement="floating"
              fill="outline"
              {...register("unit", { required: "Unit must be added" })}
            >
              {units.map((unit) => (
                <IonSelectOption value={unit}>
                  {unit.toLowerCase().replace("_", " ")}
                </IonSelectOption>
              ))}
            </IonSelect>
          </IonCol>
        </IonRow>
      </form>
    </IonGrid>
  );
}
