import { Col, Row } from "react-bootstrap";

import LoadingComponent from "../../app/layout/LoadingComponent";
import { PeopleFill } from "react-bootstrap-icons";
import ProfileCard from "./ProfileCard";
import React from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "./../../app/stores/store";

export default observer(function ProfileFollowings() {
  const { profileStore } = useStore();
  const { profile, followings, isLoading, activeTab } = profileStore;

  return (
    <>
      <h4>
        <PeopleFill /> People{" "}
        {activeTab === "followers"
          ? `following ${profile?.displayName}`
          : `${profile?.displayName} is following`}
      </h4>
      <Row xs={3}>
        {isLoading && <LoadingComponent />}
        {followings.map((profile) => (
          <Col key={profile.username}>
            <ProfileCard profile={profile} />
          </Col>
        ))}
      </Row>
    </>
  );
});
