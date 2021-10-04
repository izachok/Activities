import React, { useEffect } from "react";

import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import LoadingComponent from "./LoadingComponent";
import NavBar from "./NavBar";
import { observer } from "mobx-react-lite";
import { useStore } from "./../stores/store";

function App() {
  const { activityStore } = useStore();

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  if (activityStore.isInitialLoading) {
    return <LoadingComponent />;
  }

  return (
    <div className="body">
      <header>
        <NavBar />
      </header>
      <ActivityDashboard />
    </div>
  );
}

export default observer(App);
