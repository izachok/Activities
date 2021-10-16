import { Card, Col, Image, Row } from "react-bootstrap";

import FollowButton from "./FollowButton";
import { Profile } from "./../../app/models/profile";
import React from "react";
import { observer } from "mobx-react-lite";

interface Props {
  profile: Profile;
}

export default observer(function ProfileHeader({ profile }: Props) {
  return (
    <Card className="mt-3 p-3">
      <Row>
        <Col xs={9}>
          <Image
            src={profile.image || "/assets/user.png"}
            height="150"
            roundedCircle
            className="me-3"
          />
          <span className="h4">{profile.displayName}</span>
        </Col>
        <Col xs={3}>
          <div className="d-flex justify-content-between">
            <div>
              <div className="h1 text-center">{profile.followersCount}</div>{" "}
              followers
            </div>
            <div>
              <div className="h1 text-center">{profile.followingCount}</div>{" "}
              following
            </div>
          </div>
          <div className="pt-3 text-center">
            {profile.isFollowing && (
              <span className="text-success fw-bold">Following</span>
            )}
          </div>
          <FollowButton profile={profile} />
        </Col>
      </Row>
    </Card>
  );
});
