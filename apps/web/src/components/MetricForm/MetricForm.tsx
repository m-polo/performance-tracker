import {
  IonCol,
  IonGrid,
  IonInput,
  IonRow,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";
import { useForm } from "react-hook-form";
import { Metric, METRIC_TYPES, UNITS } from "../../shared/interfaces";

type MetricFormProps = {
  onMetricCreate: (metric: Metric, e: any) => void;
  formRef: any;
};

export default function MetricForm({
  onMetricCreate,
  formRef,
}: MetricFormProps) {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Metric>();

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
              {Object.values(METRIC_TYPES).map((metricType) => (
                <IonSelectOption value={metricType}>
                  {metricType.toLowerCase().replace("_", " ")}
                </IonSelectOption>
              ))}
            </IonSelect>
            {errors?.metricType && (
              <p role="alert">{errors.metricType.message}</p>
            )}
          </IonCol>
          <IonCol>
            <IonInput
              {...register("value", { required: "Value must be added" })}
              label="Value"
              labelPlacement="floating"
              fill="outline"
              type="number"
            />
            {errors?.value && <p role="alert">{errors.value.message}</p>}
          </IonCol>
          <IonCol>
            <IonSelect
              interface="popover"
              label="Unit"
              labelPlacement="floating"
              fill="outline"
              {...register("unit", { required: "Unit must be added" })}
            >
              {Object.values(UNITS).map((unit) => (
                <IonSelectOption value={unit}>
                  {unit.toLowerCase().replace("_", " ")}
                </IonSelectOption>
              ))}
            </IonSelect>
            {errors?.unit && <p role="alert">{errors.unit.message}</p>}
          </IonCol>
        </IonRow>
      </form>
    </IonGrid>
  );
}
