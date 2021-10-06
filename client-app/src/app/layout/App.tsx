import { Route, Switch, useLocation } from "react-router";

import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import ActivityDetails from "./../../features/activities/details/ActivityDetails";
import ActivityForm from "../../features/activities/form/ActivityForm";
import HomePage from "./../../features/home/HomePage";
import NavBar from "./NavBar";
import NotFound from "./../../features/errors/NotFound";
import React from "react";
import ServerError from "../../features/errors/ServerError";
import TestErrors from "./../../features/errors/TestError";
import { ToastContainer } from "react-toastify";
import { observer } from "mobx-react-lite";

function App() {
  const location = useLocation();

  return (
    <div className="body">
      <ToastContainer position="bottom-right" hideProgressBar />
      <Route path="/" exact component={HomePage} />
      <Route
        path={"/(.+)"}
        render={() => (
          <>
            <header>
              <NavBar />
            </header>
            <Switch>
              <Route
                path="/activities"
                exact
                component={ActivityDashboard}
              ></Route>
              <Route path="/activities/:id" component={ActivityDetails}></Route>
              <Route
                key={location.key}
                path={["/createActivity", "/manage/:id"]}
                component={ActivityForm}
              />
              <Route path="/errors" component={TestErrors}></Route>
              <Route path="/server-error" component={ServerError}></Route>
              <Route component={NotFound} />
            </Switch>
          </>
        )}
      />
    </div>
  );
}

export default observer(App);
