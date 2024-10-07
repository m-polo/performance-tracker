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
import capitalizeText from "../../shared/utils";

type MetricFormProps = {
  onMetricCreate: (metric: Metric, e?: React.BaseSyntheticEvent) => void;
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
              data-testid="metric-type-select"
              {...register("metricType", {
                required: "Metric type must be added",
              })}
            >
              {Object.values(METRIC_TYPES).map((metricType, index) => (
                <IonSelectOption value={metricType} key={index}>
                  {capitalizeText(metricType)}
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
              data-testid="value-input"
            />
            {errors?.value && <p role="alert">{errors.value.message}</p>}
          </IonCol>
          <IonCol>
            <IonSelect
              interface="popover"
              label="Unit"
              labelPlacement="floating"
              fill="outline"
              data-testid="unit-select"
              {...register("unit", { required: "Unit must be added" })}
            >
              {Object.values(UNITS).map((unit, index) => (
                <IonSelectOption value={unit} key={index}>
                  {capitalizeText(unit)}
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
