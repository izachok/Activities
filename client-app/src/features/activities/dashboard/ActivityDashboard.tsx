import { Col, Container, ListGroup, Row } from "react-bootstrap";

import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";
import ActivityList from "./ActivityList";
import React from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "./../../../app/stores/store";

function ActivityDashboard() {
  const { activityStore } = useStore();
  const { selectedActivity, editMode } = activityStore;

  return (
    <Container className="py-4">
      <Row>
        <Col sm={8}>
          <ListGroup>
            <ActivityList />
          </ListGroup>
        </Col>
        <Col sm={4}>
          {selectedActivity && !editMode && <ActivityDetails />}
          {editMode && <ActivityForm />}
        </Col>
      </Row>
    </Container>
  );
}

export default observer(ActivityDashboard);
