import React, { useEffect, useState } from "react";
import { Tab, Tabs } from "react-bootstrap";

import { CalendarFill } from "react-bootstrap-icons";
import ProfileActivitiesList from "./ProfileActivitiesList";
import { observer } from "mobx-react-lite";
import { useStore } from "./../../app/stores/store";

export default observer(function ProfileActivities() {
  const { profileStore } = useStore();

  const [key, setKey] = useState("future");

  useEffect(() => {
    profileStore.loadActivities(key);
  }, [key, profileStore]);

  return (
    <>
      <h4>
        <CalendarFill /> Activities
      </h4>
      <Tabs activeKey={key} onSelect={(k) => setKey(k!)} className="mb-3">
        <Tab eventKey="future" title="Future Events">
          <ProfileActivitiesList />
        </Tab>
        <Tab eventKey="past" title="Past Events">
          <ProfileActivitiesList />
        </Tab>
        <Tab eventKey="hosting" title="Hosting">
          <ProfileActivitiesList />
        </Tab>
      </Tabs>
    </>
  );
});
