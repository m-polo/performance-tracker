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
import { css } from "../../../styled-system/css";

type MetricFormProps = {
  onMetricCreate: (metric: Metric, e?: React.BaseSyntheticEvent) => void;
  formRef: any;
};

const errorClass = css({
  p: "1",
  color: "red",
  fontStyle: "italic",
  fontSize: "12",
});

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
        <IonRow className={css({ mt: 2 })}>
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
              <p className={errorClass}>{errors.metricType.message}</p>
            )}
          </IonCol>
          <IonCol className={css({ mr: "1", ml: "1" })}>
            <IonInput
              {...register("value", { required: "Value must be added" })}
              label="Value"
              labelPlacement="floating"
              fill="outline"
              type="number"
              data-testid="value-input"
            />
            {errors?.value && (
              <p className={errorClass}>{errors.value.message}</p>
            )}
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
            {errors?.unit && (
              <p className={errorClass}>{errors.unit.message}</p>
            )}
          </IonCol>
        </IonRow>
      </form>
    </IonGrid>
  );
}
