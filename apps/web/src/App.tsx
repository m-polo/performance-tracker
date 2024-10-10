import {
  IonApp,
  IonContent,
  IonHeader,
  IonRouterOutlet,
  IonTitle,
  IonToolbar,
  setupIonicReact,
  useIonToast,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { AppType } from "@pertrack/api";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { hc } from "hono/client";
import { useEffect, useState } from "react";
import { Link, Redirect, Route } from "react-router-dom";
import { css } from "../styled-system/css";
import AthletesDashboard from "./pages/AthletesDashboard/AthletesDashboard";
import { getToken } from "./services/auth.service";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";
import "@ionic/react/css/palettes/dark.system.css";

/* Theme variables */

import { ApiClientContext, AuthContext } from "./shared/contexts";
import { errorToast } from "./shared/toasts";
import "./theme/panda.css";
import "./theme/variables.css";

setupIonicReact({ toastDuration: 1500 });

const queryClient: QueryClient = new QueryClient();
const apiClient = hc<AppType>(import.meta.env.VITE_BASE_URL);

export type ApiClientType = typeof apiClient;

export default function App() {
  const [present] = useIonToast();
  const [token, setToken] = useState<string>("");
  const name: string = "Manuel Polo";
  const email: string = "manuelpolo@gmail.com";

  const { data } = useQuery<string>(
    {
      queryKey: ["token"],
      queryFn: () =>
        getToken(apiClient, name, email)
          .then(async (res) => await res.text())
          .catch(() => {
            present(errorToast("Error getting athletes"));
            return "";
          }),
    },
    queryClient
  );

  useEffect(() => {
    if (data) {
      setToken(data);
    }
  }, [data]);

  return (
    <QueryClientProvider client={queryClient}>
      <ApiClientContext.Provider value={apiClient}>
        <AuthContext.Provider value={token}>
          <IonApp>
            <IonReactRouter>
              <IonHeader>
                <IonToolbar>
                  <Link to="/dashboard">
                    <IonTitle className={css({ ml: 4 })}>
                      Performance Tracker
                    </IonTitle>
                  </Link>
                </IonToolbar>
              </IonHeader>
              <IonContent>
                <IonRouterOutlet>
                  <Route
                    exact
                    path="/dashboard"
                    component={AthletesDashboard}
                  />
                  <Route render={() => <Redirect to="/dashboard" />} />
                </IonRouterOutlet>
              </IonContent>
            </IonReactRouter>
          </IonApp>
        </AuthContext.Provider>
      </ApiClientContext.Provider>
    </QueryClientProvider>
  );
}
