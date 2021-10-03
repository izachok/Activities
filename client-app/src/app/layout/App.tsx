import React, { useEffect, useState } from "react";

import { Activity } from "./../models/activity";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import LoadingComponent from "./LoadingComponent";
import NavBar from "./NavBar";
import agent from "./../api/agent";
import { v4 as uuid } from "uuid";

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<
    Activity | undefined
  >(undefined);
  const [editMode, setEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    agent.Activities.list().then((response) => {
      const activities: Activity[] = [];
      response.forEach((activity) => {
        activity.date = activity.date.split("T")[0];
        activities.push(activity);
      });
      setActivities(activities);
      setIsLoading(false);
    });
  }, []);

  function handleSelectActivity(id: string) {
    setSelectedActivity(activities.find((item) => item.id === id));
  }

  function handleCancelSelectActivity() {
    setSelectedActivity(undefined);
  }

  function handleFormOpen(id?: string) {
    id ? handleSelectActivity(id) : handleCancelSelectActivity();
    setEditMode(true);
  }

  function handleFormClose() {
    setEditMode(false);
  }

  function handleCreateOrEditActivity(activity: Activity) {
    setIsSubmitting(true);
    if (activity.id) {
      agent.Activities.update(activity).then(() => {
        setActivities([
          ...activities.filter((item) => item.id !== activity.id),
          activity,
        ]);
        setSelectedActivity(activity);
        setIsSubmitting(false);
        setEditMode(false);
      });
    } else {
      activity.id = uuid();
      agent.Activities.create(activity).then(() => {
        setActivities([...activities, activity]);
      });
      setSelectedActivity(activity);
      setIsSubmitting(false);
      setEditMode(false);
    }
  }

  function handleDeleteActivity(id: string) {
    setIsSubmitting(true);
    agent.Activities.delete(id).then(() => {
      setActivities([...activities.filter((item) => item.id !== id)]);
      setIsSubmitting(false);
    });
  }

  if (isLoading) {
    return <LoadingComponent />;
  }

  return (
    <div className="body">
      <header>
        <NavBar openForm={handleFormOpen} />
      </header>
      <ActivityDashboard
        activities={activities}
        selectedActivity={selectedActivity}
        selectActivity={handleSelectActivity}
        cancelSelectActivity={handleCancelSelectActivity}
        editMode={editMode}
        openForm={handleFormOpen}
        closeForm={handleFormClose}
        createOrEdit={handleCreateOrEditActivity}
        deleteActivity={handleDeleteActivity}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}

export default App;
