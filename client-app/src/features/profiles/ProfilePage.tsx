import React, { useEffect } from "react";

import { Container } from "react-bootstrap";
import LoadingComponent from "../../app/layout/LoadingComponent";
import ProfileContent from "./ProfileContent";
import ProfileHeader from "./ProfileHeader";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router";
import { useStore } from "./../../app/stores/store";

export default observer(function ProfilePage() {
  const { username } = useParams<{ username: string }>();
  const { profileStore } = useStore();

  useEffect(() => {
    profileStore.loadProfile(username);
    return () => profileStore.setActiveTab(null);
  }, [profileStore, username]);

  if (profileStore.isLoadingProfile)
    return <LoadingComponent content="Loading profile..." />;

  return (
    <Container>
      {profileStore.profile && (
        <>
          <ProfileHeader profile={profileStore.profile} />
          <ProfileContent profile={profileStore.profile} />
        </>
      )}
    </Container>
  );
});
