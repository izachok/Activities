import { Col, Container, Row } from "react-bootstrap";
import React, { useEffect } from "react";

import ActivityDetailedChat from "./ActivityDetailedChat";
import ActivityDetailedHeader from "./ActivityDetailedHeader";
import ActivityDetailedInfo from "./ActivityDetailedInfo";
import ActivityDetailedSidebar from "./ActivityDetailedSidebar";
import LoadingComponent from "./../../../app/layout/LoadingComponent";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router";
import { useStore } from "./../../../app/stores/store";

function ActivityDetails() {
  const { id } = useParams<{ id: string }>();
  const { activityStore } = useStore();
  const {
    selectedActivity,
    loadActivity,
    isInitialLoading,
    clearSelectedActivity,
  } = activityStore;

  useEffect(() => {
    if (id) loadActivity(id);
    return () => clearSelectedActivity();
  }, [clearSelectedActivity, id, loadActivity]);

  if (isInitialLoading || !selectedActivity)
    return <LoadingComponent content="Loading activity..." />;

  return (
    <Container className="py-4">
      <Row>
        <Col sm={8}>
          <ActivityDetailedHeader activity={selectedActivity} />
          <ActivityDetailedInfo activity={selectedActivity} />
          <ActivityDetailedChat activityId={selectedActivity.id} />
        </Col>
        <Col sm={4}>
          <ActivityDetailedSidebar activity={selectedActivity} />
        </Col>
      </Row>
    </Container>
    // <Card className="mb-3">
    //   <Card.Img
    //     variant="top"
    //     src={`/assets/categoryImages/${selectedActivity.category}.jpg`}
    //   />
    //   <Card.Body>
    //     <Card.Title>{selectedActivity.title}</Card.Title>
    //     <Card.Subtitle>{selectedActivity.date}</Card.Subtitle>
    //     <Card.Text>{selectedActivity.description}</Card.Text>
    //     <ButtonGroup className="container-fluid">
    //       <NavLink to={`/manage/${selectedActivity.id}`}>
    //         <Button variant="outline-primary">Edit</Button>
    //       </NavLink>
    //       <NavLink to="/activities">
    //         <Button variant="outline-secondary">Cancel</Button>
    //       </NavLink>
    //     </ButtonGroup>
    //   </Card.Body>
    // </Card>
  );
}

export default observer(ActivityDetails);
