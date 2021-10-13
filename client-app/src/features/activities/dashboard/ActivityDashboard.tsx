import { Col, Container, ListGroup, Row } from "react-bootstrap";
import React, { useEffect } from "react";

import ActivitiesFilters from "./ActivitiesFilters";
import ActivityList from "./ActivityList";
import LoadingComponent from "./../../../app/layout/LoadingComponent";
import { observer } from "mobx-react-lite";
import { useStore } from "./../../../app/stores/store";

function ActivityDashboard() {
  const { activityStore } = useStore();
  const { loadActivities, activityRegistry } = activityStore;

  useEffect(() => {
    if (activityStore.isInitialLoading) loadActivities();
  }, [activityStore.isInitialLoading, loadActivities]);

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
          <ActivitiesFilters />
        </Col>
      </Row>
    </Container>
  );
}

export default observer(ActivityDashboard);
