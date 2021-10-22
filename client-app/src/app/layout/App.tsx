import React, { useEffect } from "react";
import { Route, Switch, useLocation } from "react-router";

import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import ActivityDetails from "./../../features/activities/details/ActivityDetails";
import ActivityForm from "../../features/activities/form/ActivityForm";
import HomePage from "./../../features/home/HomePage";
import LoadingComponent from "./LoadingComponent";
import ModalContainer from "../common/modals/ModalContainer";
import NavBar from "./NavBar";
import NotFound from "./../../features/errors/NotFound";
import PrivateRoute from "./PrivateRoute";
import ProfilePage from "../../features/profiles/ProfilePage";
import ServerError from "../../features/errors/ServerError";
import TestErrors from "./../../features/errors/TestError";
import { ToastContainer } from "react-toastify";
import { observer } from "mobx-react-lite";
import { useStore } from "./../stores/store";

function App() {
  const location = useLocation();
  const { userStore, commonStore } = useStore();

  useEffect(() => {
    if (commonStore.token) {
      userStore.getUser().finally(() => commonStore.setAppLoaded());
    } else {
      commonStore.setAppLoaded();
    }
  }, [commonStore, userStore]);

  if (!commonStore.appLoaded)
    return <LoadingComponent content="Loading app..." />;

  return (
    <div className="body">
      <ToastContainer position="bottom-right" hideProgressBar />
      <ModalContainer />
      <Route path="/" exact component={HomePage} />
      <Route
        path={"/(.+)"}
        render={() => (
          <>
            <header>
              <NavBar />
            </header>
            <Switch>
              <PrivateRoute
                path="/activities"
                exact
                component={ActivityDashboard}
              />
              <PrivateRoute
                path="/activities/:id"
                component={ActivityDetails}
              />
              <PrivateRoute
                key={location.key}
                path={["/createActivity", "/manage/:id"]}
                component={ActivityForm}
              />
              <PrivateRoute
                path="/profiles/:username"
                component={ProfilePage}
              />
              {/* <PrivateRoute path="/errors" component={TestErrors} /> */}
              <Route path="/server-error" component={ServerError} />
              <Route component={NotFound} />
            </Switch>
          </>
        )}
      />
    </div>
  );
}

export default observer(App);
