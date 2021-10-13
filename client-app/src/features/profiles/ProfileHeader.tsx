import { Button, Card, Col, Image, Row } from "react-bootstrap";

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
              <div className="h1 text-center">5</div> followers
            </div>
            <div>
              <div className="h1 text-center">6</div> following
            </div>
          </div>
          <div className="pt-3 text-center">
            <span className="text-success fw-bold">Following</span>
            <Button className="w-100 mt-2" variant="outline-danger">
              Unfollow
            </Button>
          </div>
        </Col>
      </Row>
    </Card>
  );
});
