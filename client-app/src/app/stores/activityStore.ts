import { makeAutoObservable, runInAction } from "mobx";

import { Activity } from "./../models/activity";
import agent from "../api/agent";
import { v4 as uuid } from "uuid";

export default class ActivityStore {
  // activities: Activity[] = [];
  activityRegistry = new Map<string, Activity>();
  selectedActivity: Activity | undefined = undefined;
  editMode = false;
  isLoading = false;
  isInitialLoading = true;
  isSubmitting = false;

  constructor() {
    makeAutoObservable(this);
  }

  get activitiesByDate() {
    return Array.from(this.activityRegistry.values()).sort(
      (a, b) => Date.parse(a.date) - Date.parse(b.date)
    );
  }

  loadActivities = async () => {
    this.setIsInitialLoading(true);
    try {
      const activities = await agent.Activities.list();
      runInAction(() => {
        activities.forEach((activity) => {
          activity.date = activity.date.split("T")[0];
          this.activityRegistry.set(activity.id, activity);
        });
      });
    } catch (error) {
      console.log(error);
    } finally {
      this.setIsInitialLoading(false);
    }
  };

  setIsInitialLoading = (state: boolean) => (this.isInitialLoading = state);

  selectActivity = (id: string) => {
    this.selectedActivity = this.activityRegistry.get(id);
  };

  cancelSelectedActivity = () => (this.selectedActivity = undefined);

  openForm = (id?: string) => {
    id ? this.selectActivity(id) : this.cancelSelectedActivity();
    this.editMode = true;
  };

  closeForm = () => {
    this.editMode = false;
  };

  createActivity = async (activity: Activity) => {
    this.isLoading = true;
    activity.id = uuid();
    try {
      await agent.Activities.create(activity);
      runInAction(() => {
        this.activityRegistry.set(activity.id, activity);
        this.editMode = false;
        this.selectedActivity = activity;
      });
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  };

  updateActivity = async (activity: Activity) => {
    this.isLoading = true;
    try {
      await agent.Activities.update(activity);
      runInAction(() => {
        this.activityRegistry.set(activity.id, activity);
        // this.activities = this.activities.filter(
        //   (item) => item.id !== activity.id
        // );
        // this.activities.push(activity);
        this.editMode = false;
        this.selectedActivity = activity;
      });
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  };

  deleteActivity = async (id: string) => {
    this.isLoading = true;
    try {
      await agent.Activities.delete(id);
      runInAction(() => {
        this.activityRegistry.delete(id);
        if (this.selectedActivity?.id === id) {
          this.cancelSelectedActivity();
        }
      });
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  };
}
