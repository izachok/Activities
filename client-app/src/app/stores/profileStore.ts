import { Photo, Profile, UserActivity } from "../models/profile";
import { makeAutoObservable, reaction, runInAction } from "mobx";

import agent from "../api/agent";
import { store } from "./store";

export default class ProfileStore {
  profile: Profile | null = null;
  isLoadingProfile = false;
  isUploading = false;
  isLoading = false;
  followings: Profile[] = [];
  activeTab: string | null = null;
  activities: UserActivity[] = [];
  isLoadingActivities = false;

  constructor() {
    makeAutoObservable(this);

    reaction(
      () => this.activeTab,
      (tab) => {
        if (tab === "followers" || tab === "following") {
          this.loadFollowings(tab);
        } else {
          this.followings = [];
        }
      }
    );
  }

  setActiveTab = (tab: string | null) => {
    this.activeTab = tab;
  };

  get isCurrentUser() {
    if (store.userStore.user && this.profile) {
      return store.userStore.user.username === this.profile.username;
    }
    return false;
  }

  loadProfile = async (username: string) => {
    this.isLoadingProfile = true;
    try {
      const profile = await agent.Profiles.get(username);
      runInAction(() => {
        this.profile = profile;
      });
      return this.profile;
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => {
        this.isLoadingProfile = false;
      });
    }
  };

  uploadPhoto = async (file: Blob) => {
    this.isUploading = true;
    try {
      const response = await agent.Profiles.uploadPhoto(file);
      const photo = response.data;
      runInAction(() => {
        if (this.profile) {
          this.profile.photos?.push(photo);
          if (photo.isMain && store.userStore.user) {
            store.userStore.setImage(photo.url);
            this.profile.image = photo.url;
            store.activityStore.setIsInitialLoading(true);
          }
        }
      });
      //return this.profile;
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => {
        this.isUploading = false;
      });
    }
  };

  setMainPhoto = async (photo: Photo) => {
    this.isLoading = true;
    try {
      await agent.Profiles.setMainPhoto(photo.id);
      store.userStore.setImage(photo.url);
      store.activityStore.setIsInitialLoading(true);
      runInAction(() => {
        if (this.profile && this.profile.photos) {
          const currentMainPhoto = this.profile.photos.find((p) => p.isMain);
          if (currentMainPhoto) currentMainPhoto.isMain = false;
          const newMainPhoto = this.profile.photos.find(
            (p) => p.id === photo.id
          );
          if (newMainPhoto) newMainPhoto.isMain = true;
          this.profile.image = photo.url;
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

  deletePhoto = async (photo: Photo) => {
    this.isLoading = true;
    try {
      await agent.Profiles.deletePhoto(photo.id);
      runInAction(() => {
        if (this.profile && this.profile.photos) {
          this.profile.photos = this.profile?.photos?.filter(
            (p) => p.id !== photo.id
          );
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

  updateProfile = async (profile: Profile) => {
    this.isLoading = true;
    try {
      await agent.Profiles.updateProfile(profile);
      store.userStore.setDisplayName(profile.displayName);
      store.activityStore.setIsInitialLoading(true);

      runInAction(() => {
        if (this.profile) {
          this.profile.displayName = profile.displayName;
          this.profile.bio = profile.bio;
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

  updateFollowing = async (username: string, following: boolean) => {
    this.isLoading = true;
    try {
      await agent.Profiles.updateFollowing(username);
      store.activityStore.updateAttendeeFollowing(username);

      runInAction(() => {
        if (
          this.profile &&
          this.profile.username !== store.userStore.user?.username &&
          this.profile.username === username
        ) {
          following
            ? this.profile.followersCount++
            : this.profile.followersCount--;
          this.profile.isFollowing = !this.profile.isFollowing;
        }
        if (
          this.profile &&
          this.profile.username === store.userStore.user?.username
        ) {
          following
            ? this.profile.followingCount++
            : this.profile.followingCount--;
        }
        this.followings.forEach((profile) => {
          if (profile.username === username) {
            profile.isFollowing
              ? profile.followersCount--
              : profile.followersCount++;
            profile.isFollowing = !profile.isFollowing;
          }
        });
      });
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  };

  loadFollowings = async (predicate: string) => {
    this.isLoading = true;
    try {
      let followings: Profile[] = [];
      if (this.profile) {
        followings = await agent.Profiles.listFollowings(
          this.profile.username,
          predicate
        );
      }
      runInAction(() => {
        this.followings = followings;
      });
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  };

  loadActivities = async (predicate: string) => {
    this.isLoadingActivities = true;
    try {
      if (this.profile) {
        let activities = await agent.Profiles.listActivities(
          this.profile.username,
          predicate
        );
        runInAction(() => {
          this.activities = activities;
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => {
        this.isLoadingActivities = false;
      });
    }
  };
}
