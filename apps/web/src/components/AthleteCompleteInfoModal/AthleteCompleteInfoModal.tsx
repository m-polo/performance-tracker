import {
  IonButton,
  IonCol,
  IonIcon,
  IonRow,
  IonSelect,
  IonSelectOption,
  useIonToast,
} from "@ionic/react";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { addCircle, checkmarkCircle, closeCircle } from "ionicons/icons";
import { useContext, useEffect, useRef, useState } from "react";
import { css } from "../../../styled-system/css";
import { AuthContext } from "../../App";
import { getAthleteById } from "../../services/athlete.service";
import {
  addNewMetric,
  getFilteredMetricsFromAthlete,
} from "../../services/metric.service";
import { Athlete, Metric, METRIC_TYPES } from "../../shared/interfaces";
import { errorToast, successToast } from "../../shared/toasts";
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
  const [present] = useIonToast();
  const [showForm, setShowForm] = useState<boolean>(false);
  const [athleteInfo, setAthleteInfo] = useState<Athlete>();
  const [athleteMetrics, setAthleteMetrics] = useState<Metric[]>();
  const [metricTypeFilter, setMetricTypeFilter] = useState<METRIC_TYPES>();
  const queryClient: QueryClient = useQueryClient();
  const token: string = useContext(AuthContext);
  const formRef = useRef<HTMLFormElement>();

  const athleteQuery = useQuery<Athlete>({
    queryKey: ["athleteCompleteInfo", athleteId],
    queryFn: () =>
      getAthleteById(athleteId)
        .then((res) => res.data)
        .catch(() => present(errorToast("Error getting athlete info"))),
  });

  const filterMetricsQuery = useQuery<Metric[]>({
    queryKey: ["filterAthleteMetrics", athleteId, metricTypeFilter],
    queryFn: () =>
      getFilteredMetricsFromAthlete(athleteId, metricTypeFilter)
        .then((res) => res.data)
        .catch(() => present(errorToast("Error filtering metrics"))),
  });

  const { mutate } = useMutation({
    mutationFn: async (newMetric: Metric) =>
      addNewMetric(newMetric, athleteId, token),
    onSuccess: () => {
      present(successToast("Metric added correctly"));
      queryClient.invalidateQueries({
        queryKey: ["filterAthleteMetrics"],
      });
      setShowForm(false);
    },
    onError: () => present(errorToast("Error adding metric")),
  });

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
            <IonRow className={css({ mb: "4", width: "100%" })}>
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
                  <IonCol size="2" className={css({ ml: "2" })}>
                    <IonButton
                      className={css({ h: "100%" })}
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
                  </IonCol>
                  <IonCol size="2">
                    <IonButton
                      className={css({ h: "100%", ml: "2" })}
                      onClick={() => setShowForm(false)}
                    >
                      <IonIcon icon={closeCircle}></IonIcon>Cancel
                    </IonButton>
                  </IonCol>
                </>
              ) : (
                <IonCol size="auto" className={css({ ml: "8" })}>
                  <IonButton
                    type="submit"
                    className={css({ h: "100%" })}
                    onClick={() => {
                      setMetricTypeFilter(undefined);
                      setShowForm(true);
                    }}
                  >
                    <IonIcon icon={addCircle}></IonIcon>Add new metric
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
