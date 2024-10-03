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
import { Link, Redirect, Route } from "react-router-dom";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/display.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/padding.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import "@ionic/react/css/palettes/dark.system.css";

/* Theme variables */
import AthletesDashboard from "./pages/AthletesDashboard/AthletesDashboard";
import "./theme/variables.css";

setupIonicReact();

export default function App() {
  return (
    <IonApp>
      <IonReactRouter>
        <IonHeader>
          <IonToolbar>
            <Link to="/dashboard" style={{ textDecoration: "none" }}>
              <IonTitle>Performance Tracker</IonTitle>
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
  );
}
