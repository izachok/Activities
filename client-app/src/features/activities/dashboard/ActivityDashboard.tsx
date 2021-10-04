import { Col, Container, ListGroup, Row } from "react-bootstrap";
import React, { useEffect } from "react";

import ActivityList from "./ActivityList";
import LoadingComponent from "./../../../app/layout/LoadingComponent";
import { observer } from "mobx-react-lite";
import { useStore } from "./../../../app/stores/store";

function ActivityDashboard() {
  const { activityStore } = useStore();
  const { loadActivities, activityRegistry } = activityStore;

  useEffect(() => {
    if (activityRegistry.size <= 1) loadActivities();
  }, [activityRegistry, loadActivities]);

  if (activityStore.isInitialLoading) {
    return <LoadingComponent />;
  }

  return (
    <Container className="py-4">
      <Row>
        <Col sm={8}>
          <ListGroup>
            <ActivityList />
          </ListGroup>
        </Col>
        <Col sm={4}>
          <h2>Activity filters</h2>
        </Col>
      </Row>
    </Container>
  );
}

export default observer(ActivityDashboard);
