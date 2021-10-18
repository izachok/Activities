import { Card, Col, Nav, Row, Tab } from "react-bootstrap";

import { Profile } from "../../app/models/profile";
import ProfileAbout from "./ProfileAbout";
import ProfileActivities from "./ProfileActivities";
import ProfileFollowings from "./ProfileFollowings";
import ProfilePhotos from "./ProfilePhotos";
import React from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "./../../app/stores/store";

interface Props {
  profile: Profile;
}

export default observer(function ProfileContent({ profile }: Props) {
  const { profileStore } = useStore();

  return (
    <Card className="mt-3 p-3">
      <Tab.Container
        defaultActiveKey="about"
        onSelect={(eventKey) => profileStore.setActiveTab(eventKey)}
      >
        <Row>
          <Col sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey="about">
                <ProfileAbout profile={profile} />
              </Tab.Pane>
              <Tab.Pane eventKey="photos">
                <ProfilePhotos profile={profile} />
              </Tab.Pane>
              <Tab.Pane eventKey="events">
                <ProfileActivities />
              </Tab.Pane>
              <Tab.Pane eventKey="followers">
                <ProfileFollowings />
              </Tab.Pane>
              <Tab.Pane eventKey="following">
                <ProfileFollowings />
              </Tab.Pane>
            </Tab.Content>
          </Col>
          <Col sm={3}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="about">About</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="photos">Photos</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="events">Events</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="followers">Followers</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="following">Following</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
        </Row>
      </Tab.Container>
    </Card>
  );
});
