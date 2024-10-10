import {
  IonButton,
  IonCol,
  IonIcon,
  IonRow,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";
import { QueryClient, useQueryClient } from "@tanstack/react-query";
import { addCircle } from "ionicons/icons";
import { useContext, useEffect, useRef, useState } from "react";
import { css } from "../../../styled-system/css";
import { useGetAthleteInfo } from "../../hooks/athlete.hooks";
import { useAddMetric, useGetFilteredMetrics } from "../../hooks/metric.hooks";
import { ApiClientContext, AuthContext } from "../../shared/contexts";
import { Athlete, Metric, METRIC_TYPES } from "../../shared/interfaces";
import capitalizeText from "../../shared/utils";
import Loading from "../Loading/Loading";
import MetricForm from "../MetricForm/MetricForm";
import MetricsGrid from "../MetricsGrid/MetricsGrid";

type AthleteCompleteInfoModalProps = {
  athleteId: number;
};

export default function AthleteCompleteInfoModal({
  athleteId,
}: AthleteCompleteInfoModalProps) {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [athleteInfo, setAthleteInfo] = useState<Athlete>();
  const [athleteMetrics, setAthleteMetrics] = useState<Metric[]>();
  const [metricTypeFilter, setMetricTypeFilter] = useState<METRIC_TYPES>();

  const queryClient: QueryClient = useQueryClient();
  const formRef = useRef<HTMLFormElement>();

  const token: string = useContext(AuthContext);
  const apiClient = useContext(ApiClientContext);

  const athleteQuery = useGetAthleteInfo(apiClient, athleteId);
  const filterMetricsQuery = useGetFilteredMetrics(
    apiClient,
    athleteId,
    metricTypeFilter
  );
  const { mutate } = useAddMetric(
    apiClient,
    queryClient,
    athleteId,
    token,
    setShowForm
  );

  useEffect(() => {
    setAthleteInfo(athleteQuery?.data);
    setAthleteMetrics(athleteQuery?.data?.metrics);
  }, [athleteQuery.data]);

  useEffect(() => {
    setAthleteMetrics(filterMetricsQuery?.data);
  }, [filterMetricsQuery.data]);

  if (athleteQuery.isLoading) {
    return <Loading />;
  }

  return (
    <div className={css({ p: "10" })} data-testid="complete-info-modal">
      <div>
        <span className={css({ fontSize: "26", fontWeight: "bold" })}>
          {athleteInfo?.name}
        </span>
        <div>
          <i>{athleteInfo?.team}</i>, <i>{athleteInfo?.age} years</i>
        </div>
      </div>

      <div>
        {athleteMetrics ? (
          <MetricsGrid metrics={athleteMetrics}>
            <IonRow className={css({ mb: "4", w: "100%", h: "14" })}>
              <IonCol size="7">
                {showForm ? null : (
                  <IonSelect
                    interface="popover"
                    label="Filter by metric type"
                    labelPlacement="floating"
                    fill="outline"
                    onIonChange={(e) =>
                      setMetricTypeFilter(e.target.value! as METRIC_TYPES)
                    }
                  >
                    <IonSelectOption value={""}>All</IonSelectOption>
                    {Object.values(METRIC_TYPES).map((metricType, index) => (
                      <IonSelectOption value={metricType} key={index}>
                        {capitalizeText(metricType)}
                      </IonSelectOption>
                    ))}
                  </IonSelect>
                )}
              </IonCol>
              {showForm ? (
                <>
                  <IonCol size="2">
                    <IonButton
                      className={css({ h: "100%", w: "100%" })}
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
                      Save
                    </IonButton>
                  </IonCol>
                  <IonCol size="3">
                    <IonButton
                      className={css({
                        h: "100%",
                        pl: "2",
                        w: "100%",
                      })}
                      color={"danger"}
                      onClick={() => setShowForm(false)}
                    >
                      Cancel
                    </IonButton>
                  </IonCol>
                </>
              ) : (
                <IonCol size="5">
                  <IonButton
                    type="submit"
                    className={css({ h: "100%", w: "100%", pl: "4" })}
                    onClick={() => {
                      setMetricTypeFilter(undefined);
                      setShowForm(true);
                    }}
                  >
                    <IonIcon icon={addCircle} />
                    <span className={css({ ml: "2" })}>Add new metric</span>
                  </IonButton>
                </IonCol>
              )}
            </IonRow>
          </MetricsGrid>
        ) : null}
        {showForm ? (
          <MetricForm
            onMetricCreate={(metric: Metric) => mutate(metric)}
            formRef={formRef}
          />
        ) : null}
      </div>
    </div>
  );
}
