import { Route, Switch, useLocation } from "react-router";

import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import ActivityDetails from "./../../features/activities/details/ActivityDetails";
import ActivityForm from "../../features/activities/form/ActivityForm";
import HomePage from "./../../features/home/HomePage";
import NavBar from "./NavBar";
import React from "react";
import { observer } from "mobx-react-lite";

function App() {
  const location = useLocation();

  return (
    <div className="body">
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
            </Switch>
          </>
        )}
      />
    </div>
  );
}

export default observer(App);
