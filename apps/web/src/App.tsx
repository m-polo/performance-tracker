import {
  IonApp,
  IonContent,
  IonHeader,
  IonRouterOutlet,
  IonTitle,
  IonToolbar,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { Link, Redirect, Route } from "react-router-dom";
import AthletesDashboard from "./pages/AthletesDashboard/AthletesDashboard";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";
import "@ionic/react/css/palettes/dark.system.css";

/* Theme variables */
import { css } from "../styled-system/css";
import "./theme/panda.css";
import "./theme/variables.css";

setupIonicReact({ toastDuration: 1500 });

const queryClient: QueryClient = new QueryClient();
export const AuthContext = createContext<string>("");

export default function App() {
  const [token, setToken] = useState<string>("");
  const userName: string = "Manuel Polo";
  const email: string = "manuelpolo@gmail.com";
  const baseUrl: string = import.meta.env.VITE_BASE_URL;

  const { data } = useQuery<string>(
    {
      queryKey: ["token"],
      queryFn: () =>
        axios
          .get(`${baseUrl}/auth/token?name=${userName}&email=${email}`)
          .then((res) => res.data),
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
                <Route exact path="/dashboard" component={AthletesDashboard} />
                <Route render={() => <Redirect to="/dashboard" />} />
              </IonRouterOutlet>
            </IonContent>
          </IonReactRouter>
        </IonApp>
      </AuthContext.Provider>
    </QueryClientProvider>
  );
}
